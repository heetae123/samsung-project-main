'use client';

import Link from 'next/link';

import { useMemberAuth } from '@/components/member-auth-provider';

export function MemberSessionBanner() {
  const { isAuthenticated, loading, member } = useMemberAuth();

  if (loading) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 text-sm text-slate-500">
        회원 상태를 확인하고 있습니다.
      </div>
    );
  }

  if (!isAuthenticated || !member) {
    return (
      <div className="rounded-[1.75rem] border border-blue-200 bg-[#f3f7ff] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Member pricing</p>
        <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-950">
          일반가는 모두 공개되고, 로그인만 해도 바로 회원가 상태를 확인할 수 있습니다
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          현재는 일반가 기준으로 보입니다. 프로토타입과 E2E 검증에서는 로그인 버튼만 눌러도
          즉시 회원가 기준으로 전환되고, 회원가입은 실제 전환 흐름 확인용으로 별도로 유지됩니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/member-login"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
          >
            로그인 후 회원가 보기
          </Link>
          <Link
            href="/member-signup"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
          >
            회원가입
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-blue-200 bg-[#f3f7ff] p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Member pricing active</p>
      <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-950">
        {member.name}님은 현재 회원가 기준으로 보고 있습니다
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        회원 전용가는 모든 상품에 공개되며, 일반가보다 더 낮은 기준으로 견적 요청을 보낼 수
        있습니다.
      </p>
    </div>
  );
}
