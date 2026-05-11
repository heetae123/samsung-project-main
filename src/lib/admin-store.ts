import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

import { getAdminDb } from '@/lib/firebase-admin';
import type { QuoteRequestPayload } from '@/lib/member-types';
import { memberDeals } from '@/lib/site';
import type {
  MemberDealInput,
  MemberDealRecord,
  QuoteRequestRecord,
  QuoteRequestStatus,
} from '@/lib/admin-types';

type DemoStoreFile = {
  memberDeals: MemberDealRecord[];
  quotes: QuoteRequestRecord[];
};

const DEMO_STORE_PATH = path.join(process.cwd(), '.demo-data', 'admin-store.json');

function toMemberDealRecord(
  input: MemberDealInput,
  id: string = randomUUID(),
  updatedAt = new Date().toISOString(),
): MemberDealRecord {
  return {
    id,
    badge: input.badge.trim(),
    title: input.title.trim(),
    regularPrice: input.regularPrice.trim(),
    memberPrice: input.memberPrice.trim(),
    note: input.note.trim(),
    items: input.items.map((item) => item.trim()).filter(Boolean),
    sortOrder: input.sortOrder,
    updatedAt,
  };
}

function getDefaultMemberDealRecords() {
  const now = new Date().toISOString();

  return memberDeals.map((deal, index) => ({
    id: `member-deal-${index + 1}`,
    badge: deal.badge,
    title: deal.title,
    regularPrice: deal.regularPrice,
    memberPrice: deal.memberPrice,
    note: deal.note,
    items: deal.items,
    sortOrder: index,
    updatedAt: now,
  }));
}

async function ensureDemoStore() {
  await mkdir(path.dirname(DEMO_STORE_PATH), { recursive: true });

  try {
    const raw = await readFile(DEMO_STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Partial<DemoStoreFile>;

    return {
      memberDeals: Array.isArray(parsed.memberDeals)
        ? parsed.memberDeals
        : getDefaultMemberDealRecords(),
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
    } satisfies DemoStoreFile;
  } catch {
    const initialStore: DemoStoreFile = {
      memberDeals: getDefaultMemberDealRecords(),
      quotes: [],
    };

    await writeFile(DEMO_STORE_PATH, JSON.stringify(initialStore, null, 2), 'utf8');
    return initialStore;
  }
}

async function writeDemoStore(store: DemoStoreFile) {
  await mkdir(path.dirname(DEMO_STORE_PATH), { recursive: true });
  await writeFile(DEMO_STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

function sortDeals(items: MemberDealRecord[]) {
  return [...items].sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }

    return left.title.localeCompare(right.title, 'ko');
  });
}

function sortQuotes(items: QuoteRequestRecord[]) {
  return [...items].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

function validateMemberDealInput(input: MemberDealInput) {
  if (
    !input.badge.trim() ||
    !input.title.trim() ||
    !input.regularPrice.trim() ||
    !input.memberPrice.trim() ||
    !input.note.trim()
  ) {
    throw new Error('회원몰 상품의 필수 항목이 누락되었습니다.');
  }

  if (input.items.length === 0) {
    throw new Error('회원몰 상품 항목을 한 개 이상 입력해야 합니다.');
  }
}

async function ensureFirestoreDealsSeeded() {
  const db = getAdminDb();

  if (!db) {
    return null;
  }

  const collection = db.collection('memberMallDeals');
  const snapshot = await collection.orderBy('sortOrder').get();

  if (!snapshot.empty) {
    return snapshot.docs.map((document) => ({
      ...(document.data() as Omit<MemberDealRecord, 'id'>),
      id: document.id,
    }));
  }

  const defaults = getDefaultMemberDealRecords();
  const batch = db.batch();

  defaults.forEach((deal) => {
    batch.set(collection.doc(deal.id), deal);
  });

  await batch.commit();

  return defaults;
}

export async function getMemberMallDeals() {
  const db = getAdminDb();

  if (db) {
    try {
      const seeded = await ensureFirestoreDealsSeeded();

      if (seeded) {
        return sortDeals(seeded);
      }
    } catch (error) {
      console.error('member-mall-deals-firestore-fallback', error);
    }
  }

  const store = await ensureDemoStore();
  return sortDeals(store.memberDeals);
}

export async function createMemberMallDeal(input: MemberDealInput) {
  validateMemberDealInput(input);
  const record = toMemberDealRecord(input);
  const db = getAdminDb();

  if (db) {
    try {
      await db.collection('memberMallDeals').doc(record.id).set(record);
      return { deal: record, storage: 'firestore' as const };
    } catch (error) {
      console.error('member-mall-create-firestore-fallback', error);
    }
  }

  const store = await ensureDemoStore();
  const nextStore: DemoStoreFile = {
    ...store,
    memberDeals: sortDeals([...store.memberDeals, record]),
  };
  await writeDemoStore(nextStore);

  return { deal: record, storage: 'demo' as const };
}

export async function updateMemberMallDeal(id: string, input: MemberDealInput) {
  validateMemberDealInput(input);
  const db = getAdminDb();

  if (db) {
    try {
      const existing = await db.collection('memberMallDeals').doc(id).get();

      if (!existing.exists) {
        throw new Error('회원몰 상품을 찾을 수 없습니다.');
      }

      const nextRecord = toMemberDealRecord(
        input,
        id,
        new Date().toISOString(),
      );

      await db.collection('memberMallDeals').doc(id).set(nextRecord, { merge: true });
      return { deal: nextRecord, storage: 'firestore' as const };
    } catch (error) {
      if (error instanceof Error && error.message === '회원몰 상품을 찾을 수 없습니다.') {
        throw error;
      }

      console.error('member-mall-update-firestore-fallback', error);
    }
  }

  const store = await ensureDemoStore();
  const existing = store.memberDeals.find((deal) => deal.id === id);

  if (!existing) {
    throw new Error('회원몰 상품을 찾을 수 없습니다.');
  }

  const nextRecord = toMemberDealRecord(input, id, new Date().toISOString());
  const nextStore: DemoStoreFile = {
    ...store,
    memberDeals: sortDeals(
      store.memberDeals.map((deal) => (deal.id === id ? nextRecord : deal)),
    ),
  };
  await writeDemoStore(nextStore);

  return { deal: nextRecord, storage: 'demo' as const };
}

export async function deleteMemberMallDeal(id: string) {
  const db = getAdminDb();

  if (db) {
    try {
      await db.collection('memberMallDeals').doc(id).delete();
      return { ok: true, storage: 'firestore' as const };
    } catch (error) {
      console.error('member-mall-delete-firestore-fallback', error);
    }
  }

  const store = await ensureDemoStore();
  const nextStore: DemoStoreFile = {
    ...store,
    memberDeals: store.memberDeals.filter((deal) => deal.id !== id),
    quotes: store.quotes,
  };
  await writeDemoStore(nextStore);

  return { ok: true, storage: 'demo' as const };
}

function toQuoteRecord(
  payload: QuoteRequestPayload,
  storage: 'firestore' | 'demo',
): QuoteRequestRecord {
  return {
    id: randomUUID(),
    ...payload,
    message: payload.message?.trim() ?? '',
    createdAt: new Date().toISOString(),
    source: 'website',
    storage,
    status: 'requested',
    adminNote: '',
  };
}

export async function saveQuoteRequest(payload: QuoteRequestPayload) {
  const firestoreRecord = toQuoteRecord(payload, 'firestore');
  const db = getAdminDb();

  if (db) {
    try {
      await db.collection('quotes').doc(firestoreRecord.id).set(firestoreRecord);
      return {
        quote: firestoreRecord,
        storage: 'firestore' as const,
      };
    } catch (error) {
      console.error('quote-request-firestore-fallback', error);
    }
  }

  const demoRecord = {
    ...firestoreRecord,
    storage: 'demo' as const,
  };
  const store = await ensureDemoStore();
  const nextStore: DemoStoreFile = {
    ...store,
    quotes: sortQuotes([demoRecord, ...store.quotes]),
  };
  await writeDemoStore(nextStore);

  return {
    quote: demoRecord,
    storage: 'demo' as const,
  };
}

export async function getQuoteRequests() {
  const db = getAdminDb();

  if (db) {
    try {
      const snapshot = await db.collection('quotes').orderBy('createdAt', 'desc').get();

      return snapshot.docs.map((document) => ({
        ...(document.data() as Omit<QuoteRequestRecord, 'id'>),
        id: document.id,
      }));
    } catch (error) {
      console.error('quotes-firestore-fallback', error);
    }
  }

  const store = await ensureDemoStore();
  return sortQuotes(store.quotes);
}

export async function updateQuoteRequest(
  id: string,
  updates: {
    status: QuoteRequestStatus;
    adminNote?: string;
  },
) {
  const db = getAdminDb();

  if (db) {
    try {
      await db.collection('quotes').doc(id).set(
        {
          status: updates.status,
          adminNote: updates.adminNote ?? '',
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );

      const snapshot = await db.collection('quotes').doc(id).get();
      const data = snapshot.data();

      if (!data) {
        throw new Error('견적 문의를 찾을 수 없습니다.');
      }

      return {
        quote: {
          ...(data as Omit<QuoteRequestRecord, 'id'>),
          id: snapshot.id,
        },
        storage: 'firestore' as const,
      };
    } catch (error) {
      if (error instanceof Error && error.message === '견적 문의를 찾을 수 없습니다.') {
        throw error;
      }

      console.error('quote-update-firestore-fallback', error);
    }
  }

  const store = await ensureDemoStore();
  const existing = store.quotes.find((quote) => quote.id === id);

  if (!existing) {
    throw new Error('견적 문의를 찾을 수 없습니다.');
  }

  const nextQuote: QuoteRequestRecord = {
    ...existing,
    status: updates.status,
    adminNote: updates.adminNote ?? '',
  };
  const nextStore: DemoStoreFile = {
    ...store,
    quotes: sortQuotes(store.quotes.map((quote) => (quote.id === id ? nextQuote : quote))),
  };
  await writeDemoStore(nextStore);

  return {
    quote: nextQuote,
    storage: 'demo' as const,
  };
}

export async function getAdminStorageMode() {
  return getAdminDb() ? 'firestore' : 'demo';
}
