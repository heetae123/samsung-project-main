import type { Metadata } from 'next';

import { AdminDashboard } from '@/components/admin-dashboard';
import { AdminLoginPanel } from '@/components/admin-login-panel';
import {
  isAdminAuthenticated,
  isAdminPasswordUsingDemoDefault,
} from '@/lib/admin-auth';
import {
  getAdminStorageMode,
  getMemberMallDeals,
  getQuoteRequests,
} from '@/lib/admin-store';

export const metadata: Metadata = {
  title: '관리자',
  description: '회원몰 번들 상품과 견적 문의를 관리하는 관리자 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <AdminLoginPanel usesDemoPassword={isAdminPasswordUsingDemoDefault()} />
    );
  }

  const [initialDeals, initialQuotes, storageMode] = await Promise.all([
    getMemberMallDeals(),
    getQuoteRequests(),
    getAdminStorageMode(),
  ]);

  return (
    <AdminDashboard
      initialDeals={initialDeals}
      initialQuotes={initialQuotes}
      storageMode={storageMode}
    />
  );
}
