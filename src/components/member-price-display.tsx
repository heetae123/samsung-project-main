'use client';

import { useMemberAuth } from '@/components/member-auth-provider';

type MemberPriceDisplayProps = {
  value: string;
  className?: string;
  overlayLabel?: string;
};

export function MemberPriceDisplay({
  value,
  className = '',
  overlayLabel = '회원가입 후 확인',
}: MemberPriceDisplayProps) {
  const { isAuthenticated, loading } = useMemberAuth();

  if (loading) {
    return <span className={[className, 'inline-flex text-slate-300'].join(' ')}>회원가 확인 중</span>;
  }

  if (isAuthenticated) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className="relative inline-flex w-fit items-center">
      <span aria-hidden="true" className={[className, 'select-none blur-[10px] opacity-80'].join(' ')}>
        {value}
      </span>
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-blue-100 bg-white/95 px-3 py-1 text-[11px] font-semibold text-blue-700 shadow-sm">
        {overlayLabel}
      </span>
    </span>
  );
}
