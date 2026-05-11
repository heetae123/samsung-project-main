import type { QuoteRequestPayload } from '@/lib/member-types';
import type { MemberDealItem } from '@/lib/site';

export type MemberDealRecord = MemberDealItem & {
  id: string;
  sortOrder: number;
  updatedAt: string;
};

export type QuoteRequestStatus = 'requested' | 'reviewing' | 'quoted' | 'closed';

export type QuoteRequestRecord = QuoteRequestPayload & {
  id: string;
  createdAt: string;
  source: 'website';
  storage: 'firestore' | 'demo';
  status: QuoteRequestStatus;
  adminNote?: string;
};

export type MemberDealInput = {
  badge: string;
  title: string;
  regularPrice: string;
  memberPrice: string;
  note: string;
  items: string[];
  sortOrder: number;
};
