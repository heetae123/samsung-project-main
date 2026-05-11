import type { Metadata } from 'next';

import { HomePage } from '@/components/home-page';
import { getMemberMallDeals } from '@/lib/admin-store';

export const metadata: Metadata = {
  title: '호텔 자동화·TV/B2B가전·회원몰',
  description:
    '삼성시스텍의 객실관리 시스템 국내형·유럽형, 호텔락 시스템 국내형·유럽형·QR·키리스, 운영관리 프로그램, 무인 키오스크, TV/B2B가전, 설치사례, 고객지원, 회원몰을 한 번에 확인할 수 있습니다.',
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  const memberDeals = await getMemberMallDeals();

  return <HomePage memberDeals={memberDeals} />;
}
