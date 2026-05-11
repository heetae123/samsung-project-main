'use client';

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { getClientAuth, getClientDb, isFirebaseClientConfigured } from '@/lib/firebase-client';
import type {
  MemberLoginPayload,
  MemberProfile,
  MemberSignupPayload,
} from '@/lib/member-types';

const DEMO_AUTH_EVENT = 'samsungsystec-demo-auth-changed';
const DEMO_CURRENT_USER_KEY = 'samsungsystec-demo-current-user';
const DEMO_MEMBERS_KEY = 'samsungsystec-demo-members';

type StoredDemoMember = MemberProfile & {
  password: string;
};

type AuthResult = {
  ok: boolean;
  error?: string;
};

const PROTOTYPE_DEMO_MEMBER = {
  uid: 'demo-prototype-member',
  email: 'prototype@samsungsystec.kr',
  name: '프로토타입 회원',
  phone: '010-0000-0000',
  company: '삼성시스텍 프로토타입',
  rooms: '테스트 객실',
  interest: '회원몰',
  priceTier: 'member',
  membershipStatus: 'active',
  createdAt: '2026-05-09T00:00:00.000Z',
  source: 'demo',
  password: 'prototype-demo-access',
} satisfies StoredDemoMember;

type MemberAuthContextValue = {
  member: MemberProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isFirebaseConfigured: boolean;
  signUp: (payload: MemberSignupPayload) => Promise<AuthResult>;
  signIn: (payload: MemberLoginPayload) => Promise<AuthResult>;
  activatePrototypeMember: () => Promise<AuthResult>;
  signOutMember: () => Promise<void>;
};

const MemberAuthContext = createContext<MemberAuthContextValue | null>(null);

function emitDemoAuthChange() {
  window.dispatchEvent(new Event(DEMO_AUTH_EVENT));
}

function buildProfileFromUser(user: User, fallback?: Partial<MemberProfile>): MemberProfile {
  return {
    uid: user.uid,
    email: user.email ?? fallback?.email ?? '',
    name: fallback?.name ?? user.displayName ?? '회원',
    phone: fallback?.phone ?? '',
    company: fallback?.company ?? '',
    rooms: fallback?.rooms,
    interest: fallback?.interest,
    priceTier: 'member',
    membershipStatus: 'active',
    createdAt: fallback?.createdAt ?? new Date().toISOString(),
    source: 'firebase',
  };
}

function readDemoMembers() {
  if (typeof window === 'undefined') {
    return [] as StoredDemoMember[];
  }

  try {
    const raw = window.localStorage.getItem(DEMO_MEMBERS_KEY);
    return raw ? (JSON.parse(raw) as StoredDemoMember[]) : [];
  } catch {
    return [];
  }
}

function writeDemoMembers(members: StoredDemoMember[]) {
  window.localStorage.setItem(DEMO_MEMBERS_KEY, JSON.stringify(members));
}

function readDemoCurrentUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(DEMO_CURRENT_USER_KEY);
    return raw ? (JSON.parse(raw) as MemberProfile) : null;
  } catch {
    return null;
  }
}

function writeDemoCurrentUser(profile: MemberProfile | null) {
  if (profile) {
    window.localStorage.setItem(DEMO_CURRENT_USER_KEY, JSON.stringify(profile));
  } else {
    window.localStorage.removeItem(DEMO_CURRENT_USER_KEY);
  }
}

async function ensureFirebaseProfile(user: User) {
  const db = getClientDb();

  if (!db) {
    return buildProfileFromUser(user);
  }

  const ref = doc(db, 'users', user.uid);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    const data = snapshot.data() as Partial<MemberProfile>;
    return buildProfileFromUser(user, data);
  }

  const profile = buildProfileFromUser(user);
  await setDoc(ref, profile, { merge: true });
  return profile;
}

export function MemberAuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getClientAuth();

    if (!isFirebaseClientConfigured || !auth) {
      const syncDemoState = () => {
        setMember(readDemoCurrentUser());
        setLoading(false);
      };

      syncDemoState();
      window.addEventListener('storage', syncDemoState);
      window.addEventListener(DEMO_AUTH_EVENT, syncDemoState);

      return () => {
        window.removeEventListener('storage', syncDemoState);
        window.removeEventListener(DEMO_AUTH_EVENT, syncDemoState);
      };
    }

    setPersistence(auth, browserLocalPersistence).catch(() => undefined);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setMember(null);
        setLoading(false);
        return;
      }

      const profile = await ensureFirebaseProfile(user);
      setMember(profile);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo<MemberAuthContextValue>(
    () => ({
      member,
      loading,
      isAuthenticated: Boolean(member),
      isFirebaseConfigured: isFirebaseClientConfigured,
      async signUp(payload) {
        const {
          name,
          email,
          password,
          phone,
          company,
          rooms,
          interest,
        } = payload;

        if (!password || password.length < 8) {
          return { ok: false, error: '비밀번호는 8자 이상이어야 합니다.' };
        }

        const auth = getClientAuth();
        const db = getClientDb();

        if (isFirebaseClientConfigured && auth && db) {
          try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            const profile: MemberProfile = {
              uid: credential.user.uid,
              email,
              name,
              phone,
              company,
              rooms,
              interest,
              priceTier: 'member',
              membershipStatus: 'active',
              createdAt: new Date().toISOString(),
              source: 'firebase',
            };

            await setDoc(doc(db, 'users', credential.user.uid), profile, { merge: true });
            setMember(profile);
            return { ok: true };
          } catch (error) {
            const message = error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.';
            return { ok: false, error: message };
          }
        }

        const existingMembers = readDemoMembers();
        if (existingMembers.some((existingMember) => existingMember.email === email)) {
          return { ok: false, error: '이미 가입된 이메일입니다.' };
        }

        const profile: MemberProfile = {
          uid: `demo-${Date.now()}`,
          email,
          name,
          phone,
          company,
          rooms,
          interest,
          priceTier: 'member',
          membershipStatus: 'active',
          createdAt: new Date().toISOString(),
          source: 'demo',
        };

        existingMembers.push({
          ...profile,
          password,
        });
        writeDemoMembers(existingMembers);
        writeDemoCurrentUser(profile);
        emitDemoAuthChange();
        setMember(profile);
        return { ok: true };
      },
      async signIn(payload) {
        const auth = getClientAuth();

        if (isFirebaseClientConfigured && auth) {
          try {
            const credential = await signInWithEmailAndPassword(
              auth,
              payload.email,
              payload.password,
            );
            const profile = await ensureFirebaseProfile(credential.user);
            setMember(profile);
            return { ok: true };
          } catch (error) {
            const message = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
            return { ok: false, error: message };
          }
        }

        const existingMember = readDemoMembers().find(
          (storedMember) =>
            storedMember.email === payload.email && storedMember.password === payload.password,
        );

        if (!existingMember) {
          return { ok: false, error: '이메일 또는 비밀번호가 맞지 않습니다.' };
        }

        const { password, ...profile } = existingMember;
        void password;
        writeDemoCurrentUser(profile);
        emitDemoAuthChange();
        setMember(profile);
        return { ok: true };
      },
      async activatePrototypeMember() {
        const auth = getClientAuth();

        if (isFirebaseClientConfigured && auth) {
          return {
            ok: false,
            error: '현재는 Firebase 실환경에서 프로토타입 빠른 로그인을 지원하지 않습니다.',
          };
        }

        const existingMembers = readDemoMembers();
        const withoutPrototype = existingMembers.filter(
          (storedMember) => storedMember.email !== PROTOTYPE_DEMO_MEMBER.email,
        );

        withoutPrototype.push(PROTOTYPE_DEMO_MEMBER);
        writeDemoMembers(withoutPrototype);

        const { password, ...profile } = PROTOTYPE_DEMO_MEMBER;
        void password;
        writeDemoCurrentUser(profile);
        emitDemoAuthChange();
        setMember(profile);
        return { ok: true };
      },
      async signOutMember() {
        const auth = getClientAuth();

        if (isFirebaseClientConfigured && auth) {
          await signOut(auth);
          setMember(null);
          return;
        }

        writeDemoCurrentUser(null);
        emitDemoAuthChange();
        setMember(null);
      },
    }),
    [loading, member],
  );

  return <MemberAuthContext.Provider value={value}>{children}</MemberAuthContext.Provider>;
}

export function useMemberAuth() {
  const context = useContext(MemberAuthContext);

  if (!context) {
    throw new Error('useMemberAuth must be used within MemberAuthProvider.');
  }

  return context;
}
