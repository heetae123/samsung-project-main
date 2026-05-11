import type { Metadata } from 'next';
import Link from 'next/link';
import { LayoutGrid, Lock, Monitor, MonitorSmartphone, ShieldCheck, TabletSmartphone, Wrench } from 'lucide-react';

import { JsonLd } from '@/components/json-ld';
import { MemberPriceDisplay } from '@/components/member-price-display';
import { MemberSessionBanner } from '@/components/member-session-banner';
import { ProductCard } from '@/components/product-card';
import { getMemberMallDeals } from '@/lib/admin-store';
import {
  memberBenefits,
  memberSignupSteps,
  products,
  siteConfig,
} from '@/lib/site';
import { systemLandings } from '@/lib/system-landings';

const categoryIcons: Record<string, any> = {
  'room-management': Monitor,
  'hotel-lock': Lock,
  'operation-management': MonitorSmartphone,
  kiosk: TabletSmartphone,
  'remote-monitoring': ShieldCheck,
  'misc-materials': Wrench,
};

const categoryTagMap: Record<string, string[]> = {
  'room-management': ['객실관리 시스템'],
  'hotel-lock': ['호텔락 시스템', 'QR·키리스 호텔락'],
  'operation-management': ['운영관리 프로그램'],
  'kiosk': ['무인 키오스크'],
  'remote-monitoring': ['무인 관제 서비스'],
  'misc-materials': ['기타 자재'],
};

export const metadata: Metadata = {
  title: '회원몰',
  description:
    '삼성시스텍 회원몰 페이지입니다. 회원 전용가, 번들 혜택, 우선 견적 대응, 설치사례 자료 접근 구조를 확인할 수 있습니다.',
  alternates: {
    canonical: '/member-mall',
  },
};

export const dynamic = 'force-dynamic';

export default async function MemberMallPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const memberDeals = await getMemberMallDeals();
  const resolvedSearchParams = await searchParams;
  const currentCategory = (resolvedSearchParams?.category as string) || 'all';
  const validTags = currentCategory !== 'all' ? categoryTagMap[currentCategory] : null;
  const filteredProducts = validTags 
    ? products.filter(p => validTags.includes(p.tag))
    : products;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: `${siteConfig.name} 회원몰`,
          url: `${siteConfig.siteUrl}/member-mall`,
          itemListElement: memberDeals.map((deal, index) => ({
            '@type': 'Offer',
            position: index + 1,
            name: deal.title,
            description: `${deal.regularPrice} / ${deal.memberPrice}`,
          })),
        }}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Member mall</p>
          <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
            모든 상품의 일반가와 회원가를 함께 보는 회원몰
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            비회원도 모든 상품의 일반가는 볼 수 있고, 회원가입을 마치면 같은 페이지에서 더
            낮은 회원가가 자동으로 적용됩니다. 구매는 온라인 결제 대신 견적 요청으로 진행합니다.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/member-signup"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
          >
            회원가입 신청
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:border-blue-700"
          >
            회원 전용 견적 문의
          </Link>
        </div>

        <div className="mt-10">
          <MemberSessionBanner />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Categories</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              원하시는 상품 카테고리를 빠르게 찾아보세요
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12">
            <Link
              href="/member-mall"
              scroll={false}
              className={`group flex flex-col items-center gap-4 transition-transform hover:-translate-y-1`}
            >
              <div className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border transition-all sm:h-20 sm:w-20 ${
                currentCategory === 'all'
                  ? 'border-blue-700 bg-blue-700 text-white shadow-md'
                  : 'border-slate-200 bg-white text-slate-600 group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white group-hover:shadow-md'
              }`}>
                <LayoutGrid className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <span className={`text-[15px] font-semibold ${
                currentCategory === 'all' ? 'text-blue-700' : 'text-slate-950'
              }`}>All Products</span>
            </Link>

            {systemLandings.map((landing) => {
              const Icon = categoryIcons[landing.slug] || Monitor;
              const isActive = currentCategory === landing.slug;
              return (
                <Link
                  key={landing.slug}
                  href={`/member-mall?category=${landing.slug}`}
                  scroll={false}
                  className={`group flex flex-col items-center gap-4 transition-transform hover:-translate-y-1`}
                >
                  <div className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border transition-all sm:h-20 sm:w-20 ${
                    isActive
                      ? 'border-blue-700 bg-blue-700 text-white shadow-md'
                      : 'border-slate-200 bg-white text-slate-600 group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white group-hover:shadow-md'
                  }`}>
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <span className={`text-[15px] font-semibold ${
                    isActive ? 'text-blue-700' : 'text-slate-950'
                  }`}>{landing.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-24 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">All products</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              회원몰에서도 모든 제품을 가격과 함께 비교할 수 있습니다
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))
            ) : (
              <div className="col-span-3 py-20 text-center text-slate-500">
                해당 카테고리에 등록된 제품이 없습니다.
              </div>
            )}
          </div>

          <div className="mt-20 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Bundle pricing</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              번들 발주 예시
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {memberDeals.map((deal) => (
              <article
                key={deal.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                  {deal.badge}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] text-slate-950">{deal.title}</h2>
                <p className="mt-5 text-sm text-slate-500">{deal.regularPrice}</p>
                <div className="mt-2">
                  <MemberPriceDisplay
                    value={deal.memberPrice}
                    className="font-display text-3xl font-bold tracking-[-0.06em] text-blue-700"
                    overlayLabel="회원 전용가"
                  />
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{deal.note}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {deal.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {memberBenefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-3xl font-bold tracking-[-0.05em] text-slate-950">{benefit.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Membership flow</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              회원가입 후 이용 흐름
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {memberSignupSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
              >
                <p className="font-display text-4xl font-bold tracking-[-0.08em] text-blue-700">{step.step}</p>
                <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-slate-950">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
