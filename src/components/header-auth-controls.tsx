'use client';

import Link from 'next/link';

import { useMemberAuth } from '@/components/member-auth-provider';

type HeaderAuthControlsProps = {
  mobile?: boolean;
};

export function HeaderAuthControls({ mobile = false }: HeaderAuthControlsProps) {
  const { isAuthenticated, loading, member, signOutMember } = useMemberAuth();

  if (loading) {
    return (
      <div className={mobile ? 'mt-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-500' : 'text-sm text-slate-500'}>
        회원 상태 확인 중
      </div>
    );
  }

  if (!isAuthenticated || !member) {
    if (mobile) {
      return (
        <div className="mt-2 grid gap-2">
          <Link
            href="/member-login"
            className="rounded-2xl bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white"
          >
            로그인
          </Link>
          <Link
            href="/member-signup"
            className="rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-950"
          >
            회원가입
          </Link>
        </div>
      );
    }

    return (
      <div className="hidden items-center gap-3 lg:flex">
        <Link
          href="/member-login"
          className="inline-flex items-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
        >
          로그인
        </Link>
        <Link
          href="/member-signup"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
        >
          회원가입
        </Link>
      </div>
    );
  }

  if (mobile) {
    return (
      <div className="mt-2 grid gap-2">
        <div className="rounded-2xl border border-blue-200 bg-[#f3f7ff] px-4 py-3 text-sm font-semibold text-blue-700">
          {member.name}님 회원가 이용 중
        </div>
        <Link
          href="/member-mall"
          className="rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-950"
        >
          회원몰 보기
        </Link>
        <button
          type="button"
          onClick={() => {
            void signOutMember();
          }}
          className="rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-950"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-3 lg:flex">
      <div className="rounded-full border border-blue-200 bg-[#f3f7ff] px-4 py-2 text-sm font-semibold text-blue-700">
        {member.name}님 회원가 이용 중
      </div>
      <Link
        href="/member-mall"
        className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
      >
        회원몰
      </Link>
      <button
        type="button"
        onClick={() => {
          void signOutMember();
        }}
        className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
      >
        로그아웃
      </button>
    </div>
  );
}
