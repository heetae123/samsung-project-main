import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { installationCases } from '@/lib/site';

export const metadata: Metadata = {
  title: '설치사례',
  description:
    '삼성시스텍 설치사례 페이지입니다. 비즈니스호텔, 리조트, 무인 숙소에 적용한 객실관리 시스템, 호텔락 3종, 운영관리 프로그램, 무인 키오스크, 무인 관제 사례를 확인할 수 있습니다.',
  alternates: {
    canonical: '/installations',
  },
};

export default function InstallationsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">References</p>
          <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
            설치사례로 보는 현장 적용 방식
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            객실 수와 운영 방식, 인테리어 방향이 다른 현장에 어떤 제품 조합이 들어갔는지
            사례 중심으로 정리했습니다.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {installationCases.map((installationCase) => (
              <article
                key={installationCase.title}
                className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] lg:grid-cols-[0.95fr_1.05fr] lg:p-8"
              >
                <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-[#f3f7ff] p-4">
                  <Image
                    src={installationCase.image}
                    alt={installationCase.imageAlt}
                    width={1024}
                    height={1024}
                    className="rounded-[1.25rem] object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    {installationCase.propertyType} · {installationCase.location}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] text-slate-950">
                    {installationCase.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {installationCase.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {installationCase.systems.map((system) => (
                      <span
                        key={system}
                        className="rounded-full border border-blue-200 bg-[#f3f7ff] px-4 py-2 text-sm font-semibold text-blue-700"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    {installationCase.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Project inquiry</p>
        <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
          우리 현장과 비슷한 구성이 필요한지 바로 확인할 수 있습니다
        </h2>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
          >
            설치 상담 문의
          </Link>
        </div>
      </section>
    </>
  );
}
