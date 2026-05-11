'use client';

import Link from 'next/link';

import { useMemberAuth } from '@/components/member-auth-provider';
import { MemberPriceDisplay } from '@/components/member-price-display';
import { formatKrw, getProductCommerce } from '@/lib/product-commerce';

type ProductPricingSummaryProps = {
  slug: string;
  compact?: boolean;
};

export function ProductPricingSummary({
  slug,
  compact = false,
}: ProductPricingSummaryProps) {
  const commerce = getProductCommerce(slug);
  const { isAuthenticated, loading } = useMemberAuth();

  if (!commerce) {
    return null;
  }

  const savings = commerce.generalPrice - commerce.memberPrice;
  const boxClassName = compact
    ? 'mt-6 rounded-[1.5rem] border border-blue-100 bg-[#f7fbff] p-5'
    : 'rounded-[2rem] border border-blue-100 bg-[#f7fbff] p-6';

  return (
    <div className={boxClassName}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
        Pricing
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-slate-500">일반가</p>
          <p className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-slate-950">
            {formatKrw(commerce.generalPrice)}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500">회원가</p>
          <div className="mt-2">
            <MemberPriceDisplay
              value={formatKrw(commerce.memberPrice)}
              className="font-display text-2xl font-bold tracking-[-0.04em] text-blue-700"
              overlayLabel="회원 전용가"
            />
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {loading
              ? '회원 상태를 확인하고 있습니다.'
              : isAuthenticated
                ? '회원 전용가가 적용되고 있습니다.'
                : `회원가입하면 ${formatKrw(savings)} 더 낮은 회원가를 확인할 수 있습니다.`}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">{commerce.unitLabel}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{commerce.priceNote}</p>
      {!loading && !isAuthenticated ? (
        compact ? (
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/member-login" className="text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800">
              로그인 후 회원가 보기
            </Link>
            <Link href="/member-signup" className="text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950">
              회원가입
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-3">
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
        )
      ) : null}
    </div>
  );
}
