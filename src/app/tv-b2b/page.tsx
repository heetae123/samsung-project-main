import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, MonitorPlay, PackageCheck, Refrigerator, Tv } from 'lucide-react';

import { JsonLd } from '@/components/json-ld';
import { siteConfig, tvB2bCategories } from '@/lib/site';

const categoryIcons = [Tv, MonitorPlay, Refrigerator, PackageCheck];

export const metadata: Metadata = {
  title: 'TV/B2B가전',
  description:
    '삼성시스텍의 TV/B2B가전 페이지입니다. 객실 TV, 공용부 디스플레이, 객실 B2B가전, 시스템 연계 번들의 실제 구성 품목을 확인할 수 있습니다.',
  alternates: {
    canonical: '/tv-b2b',
  },
};

export default function TvB2bPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${siteConfig.name} TV/B2B가전`,
          url: `${siteConfig.siteUrl}/tv-b2b`,
          hasPart: tvB2bCategories.map((category) => ({
            '@type': 'CollectionPage',
            name: category.title,
            url: `${siteConfig.siteUrl}${category.href}`,
          })),
        }}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-blue-700">TV·B2B가전</p>
          <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.06em] text-slate-950 sm:text-6xl">
            삼성시스텍 기준으로 정리한 TV/B2B가전 구성
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            객실 TV, 로비와 공용부 디스플레이, 객실용 가전, 자동화 연계 번들을 삼성시스텍이
            실제로 제안할 법한 흐름으로 다시 정리했습니다. 카드를 클릭하면 해당 카테고리에서
            검토할 대표 품목까지 바로 확인할 수 있습니다.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/member-mall"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
          >
            회원몰 번들 보기
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:border-blue-700"
          >
            도입 상담 문의
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-blue-700">카테고리</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl">
              삼성시스텍 제안 구조가 보이도록 정리했습니다
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {tvB2bCategories.map((category, index) => {
              const Icon = categoryIcons[index] ?? Tv;

              return (
                <Link
                  key={category.slug}
                  href={category.href}
                  className="group block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)] transition-transform hover:-translate-y-1 hover:border-blue-200"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f7ff] text-blue-700">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-6 text-sm font-semibold tracking-[0.16em] text-blue-700">
                    {category.label}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950">
                    {category.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {category.description}
                  </p>

                  <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-[#f8fbff] p-5">
                    <p className="text-sm font-semibold text-slate-950">
                      대표 품목 {category.products.length}개
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {category.products.map((product) => (
                        <li key={product.name}>{product.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-950">
                    <span>상세 품목 보기</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {tvB2bCategories.map((category) => (
            <article
              key={category.slug}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]"
            >
              <p className="text-sm font-semibold tracking-[0.12em] text-blue-700">{category.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{category.supportNote}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
