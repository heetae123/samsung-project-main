import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  MonitorPlay,
  PackageCheck,
  Refrigerator,
  Tv,
  type LucideIcon,
} from 'lucide-react';

import { JsonLd } from '@/components/json-ld';
import { getTvB2bCategoryBySlug, siteConfig, tvB2bCategories } from '@/lib/site';

type TvB2bDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryIcons: Record<string, LucideIcon> = {
  'guest-room-tv': Tv,
  'common-area-display': MonitorPlay,
  'guest-room-appliances': Refrigerator,
  'bundle-packages': PackageCheck,
};

export function generateStaticParams() {
  return tvB2bCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: TvB2bDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getTvB2bCategoryBySlug(slug);

  if (!category) {
    return {
      title: '카테고리를 찾을 수 없습니다',
    };
  }

  return {
    title: `${category.title} 상세 품목`,
    description: `삼성시스텍 기준 ${category.title} 카테고리에서 검토할 수 있는 대표 품목과 구성 요소를 확인할 수 있습니다.`,
    alternates: {
      canonical: `/tv-b2b/${category.slug}`,
    },
  };
}

export default async function TvB2bDetailPage({ params }: TvB2bDetailPageProps) {
  const { slug } = await params;
  const category = getTvB2bCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const Icon = categoryIcons[category.slug] ?? Tv;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${siteConfig.name} ${category.title}`,
          itemListElement: category.products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: product.name,
          })),
        }}
      />

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/tv-b2b"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            TV/B2B가전 목록으로
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-blue-700">{category.label}</p>
              <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.06em] text-slate-950 sm:text-6xl">
                {category.title}
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                {category.description}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  이 카테고리 상담 문의
                </Link>
                <Link
                  href="/member-mall"
                  className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:border-blue-700"
                >
                  회원몰 번들 보기
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-[#f8fbff] p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-blue-700 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
                <Icon className="h-8 w-8" />
              </div>
              <p className="mt-6 text-sm font-semibold tracking-[0.16em] text-blue-700">검토 포인트</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-6 rounded-[1.5rem] border border-blue-100 bg-white p-5 text-sm leading-7 text-slate-600">
                {category.supportNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-blue-700">대표 품목</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl">
              이 카테고리에서 바로 확인할 수 있는 제품들
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {category.products.map((product) => (
              <article
                key={product.name}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-2xl font-bold tracking-[-0.03em] text-slate-950">{product.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{product.summary}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.16em] text-blue-700">도입 연결</p>
        <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl">
          이 카테고리 품목을 기준으로 바로 견적 상담을 진행할 수 있습니다
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          객실 수량, 로비 구성, 장기투숙 여부, 번들 발주 여부를 남기면 TV/B2B가전 카테고리
          기준으로 적합한 조합을 빠르게 정리해드립니다.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
          >
            도입 상담 문의
          </Link>
          <Link
            href="/tv-b2b"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:border-blue-700"
          >
            다른 카테고리 보기
          </Link>
        </div>
      </section>
    </>
  );
}
