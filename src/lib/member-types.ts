export type MemberProfile = {
  uid: string;
  email: string;
  name: string;
  phone: string;
  company: string;
  rooms?: string;
  interest?: string;
  priceTier: 'member';
  membershipStatus: 'active';
  createdAt: string;
  source: 'firebase' | 'demo';
};

export type MemberSignupPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  company: string;
  rooms?: string;
  interest?: string;
  message?: string;
};

export type MemberLoginPayload = {
  email: string;
  password: string;
};

export type QuoteRequestPayload = {
  productSlug: string;
  productTitle: string;
  priceTier: 'general' | 'member';
  name: string;
  email: string;
  phone: string;
  company: string;
  quantity: string;
  message?: string;
  memberId?: string;
};
