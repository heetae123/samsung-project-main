'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMemberAuth } from '@/components/member-auth-provider';

type MemberLoginGatewayProps = {
  redirectTo?: string;
};

export function MemberLoginGateway({
  redirectTo = '/member-mall',
}: MemberLoginGatewayProps) {
  const router = useRouter();
  const { activatePrototypeMember, isAuthenticated, loading, member } = useMemberAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isAuthenticated && member) {
      router.replace(redirectTo);
      return;
    }

    let cancelled = false;

    async function runPrototypeLogin() {
      const result = await activatePrototypeMember();

      if (cancelled) {
        return;
      }

      if (!result.ok) {
        setError(result.error ?? '프로토타입 로그인에 실패했습니다.');
        return;
      }

      router.replace(redirectTo);
    }

    void runPrototypeLogin();

    return () => {
      cancelled = true;
    };
  }, [activatePrototypeMember, isAuthenticated, loading, member, redirectTo, router]);

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Prototype login</p>
        <h1 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
          프로토타입 회원 세션을 여는 중입니다
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          E2E와 프로토타입 검증을 위해 로그인 버튼을 누르면 바로 회원 상태로 전환되도록 구성했습니다.
        </p>

        {error ? (
          <div className="mt-8 rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
            <p>{error}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/member-signup"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
              >
                회원가입으로 이동
              </Link>
              <Link
                href="/member-mall"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
              >
                회원몰 보기
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-[1.5rem] border border-blue-200 bg-[#f3f7ff] p-5 text-sm leading-7 text-slate-700">
            잠시 후 회원몰과 회원가 노출 화면으로 자동 이동합니다.
          </div>
        )}
      </div>
    </section>
  );
}
