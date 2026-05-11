import type { Metadata } from 'next';
import Link from 'next/link';

import { supportChannels } from '@/lib/site';

export const metadata: Metadata = {
  title: '고객지원',
  description:
    '삼성시스텍 고객지원 페이지입니다. 도입 상담, 설치 일정 협의, 운영 지원과 A/S, 회원 전용 견적 흐름을 확인할 수 있습니다.',
  alternates: {
    canonical: '/support',
  },
};

export default function SupportPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Support</p>
          <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
            도입 전후 흐름을 분리한 고객지원 페이지
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            도입 상담, 설치 일정 협의, 운영 중 대응, 회원 전용 견적처럼 실제 업무 흐름에 맞춰
            고객지원 항목을 분리했습니다.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          {supportChannels.map((channel) => (
            <article
              key={channel.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-3xl font-bold tracking-[-0.05em] text-slate-950">{channel.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{channel.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {channel.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <Link
                href={channel.href}
                className="mt-8 inline-flex text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
              >
                관련 페이지 이동
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Need help now</p>
        <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
          상담, 설치, 회원 전용 견적 중 필요한 흐름으로 바로 이동할 수 있습니다
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
          >
            도입 상담
          </Link>
          <Link
            href="/member-signup"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:border-blue-700"
          >
            회원가입 신청
          </Link>
        </div>
      </section>
    </>
  );
}
