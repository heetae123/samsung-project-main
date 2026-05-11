import type { Metadata } from 'next';

import { MemberLoginGateway } from '@/components/member-login-gateway';

export const metadata: Metadata = {
  title: '로그인',
  description:
    '삼성시스텍 프로토타입 로그인 페이지입니다. 로컬 검증과 E2E 테스트를 위해 클릭 즉시 회원 세션을 열고 회원몰 상태를 확인할 수 있습니다.',
  alternates: {
    canonical: '/member-login',
  },
};

type MemberLoginPageProps = {
  searchParams?: Promise<{
    redirectTo?: string;
  }>;
};

export default async function MemberLoginPage({
  searchParams,
}: MemberLoginPageProps) {
  const resolvedSearchParams = await searchParams;

  return <MemberLoginGateway redirectTo={resolvedSearchParams?.redirectTo} />;
}
