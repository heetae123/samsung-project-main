import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { JsonLd } from '@/components/json-ld';
import { SolutionScrollHero } from '@/components/solution-scroll-hero';
import type { SolutionLandingItem } from '@/lib/system-landings';
import { siteConfig } from '@/lib/site';

type SystemLandingPageProps = {
  landing: SolutionLandingItem;
};

export function SystemLandingPage({ landing }: SystemLandingPageProps) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: landing.title,
          serviceType: landing.title,
          description: landing.description,
          provider: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.siteUrl,
          },
          url: `${siteConfig.siteUrl}${landing.href}`,
          areaServed: 'KR',
        }}
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
            {landing.eyebrow}
          </p>
          <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
            {landing.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {landing.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {landing.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-blue-100 bg-[#f7fbff] px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SolutionScrollHero landing={landing} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
              Lineup
            </p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              {landing.title} 아래에서 실제 구성 타입을 바로 볼 수 있습니다
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              가격은 상세 제품 페이지에서만 확인하고, 이 페이지에서는 먼저 어떤 타입과 구성 흐름이
              맞는지부터 빠르게 비교할 수 있게 구성했습니다.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {landing.children.map((child) => (
              <article
                key={`${landing.slug}-${child.title}`}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]"
              >
                <div className="border-b border-slate-100 bg-[#f3f7ff] p-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white">
                    <Image
                      src={child.image}
                      alt={child.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-contain p-5 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex h-full flex-col p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    {child.tag}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                    {child.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {child.description}
                  </p>

                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    {child.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href={child.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
                    >
                      상세 제품 보기
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
