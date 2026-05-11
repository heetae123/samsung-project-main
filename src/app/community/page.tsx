import type { Metadata } from 'next';
import Link from 'next/link';

import { communityEntries } from '@/lib/site';

export const metadata: Metadata = {
  title: '커뮤니티',
  description:
    '삼성시스텍 커뮤니티 페이지입니다. 객실관리 시스템 선택 가이드, 설치 노트, 무인 운영 팁, 회원몰 혜택 소개 콘텐츠를 확인할 수 있습니다.',
  alternates: {
    canonical: '/community',
  },
};

export default function CommunityPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Community</p>
          <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
            검색 유입과 상담 전환을 위한 커뮤니티 콘텐츠
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            객실관리 시스템 선택 기준, 설치 체크포인트, 무인 운영 팁, 회원 혜택 소개처럼
            검색에서 바로 찾을 수 있는 콘텐츠 진입점을 카드 구조로 만들었습니다.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {communityEntries.map((entry) => (
              <article
                key={entry.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                  {entry.category}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] text-slate-950">{entry.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{entry.excerpt}</p>
                <Link
                  href={entry.href}
                  className="mt-8 inline-flex text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
                >
                  {entry.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Support flow</p>
        <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
          콘텐츠를 보고 바로 제품·서비스와 회원몰로 이어지게 설계했습니다
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
          >
            제품·서비스 보기
          </Link>
          <Link
            href="/member-mall"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:border-blue-700"
          >
            회원몰 보기
          </Link>
        </div>
      </section>
    </>
  );
}
