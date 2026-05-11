import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, PhoneCall } from 'lucide-react';

import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: '도입 문의',
  description:
    '삼성시스텍 도입 문의 페이지. 객실관리 타입, 호텔락 구조, 운영관리 프로그램, 무인 키오스크, 무인 관제, TV/B2B가전, 기타 자재, 회원몰 연계 범위를 기준으로 적합한 구성을 상담할 수 있습니다.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Contact</p>
        <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
          무료 도입 상담
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          객실 타입과 도어 환경, 프런트 운영 동선, 무인 운영 범위를 기준으로 어떤 제품 조합이
          맞는지 빠르게 정리해드립니다. TV/B2B가전과 회원몰 연계 혜택까지 포함한 실제 견적과
          설치 가능 범위는 상담 단계에서 확정합니다.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <a
            href={`tel:${siteConfig.phone.replace(/-/g, '')}`}
            className="rounded-[1.75rem] border border-slate-200 bg-[#f3f7ff] p-6 transition-colors hover:border-blue-300"
          >
            <PhoneCall className="h-6 w-6 text-blue-700" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Phone</p>
            <p className="mt-2 text-2xl font-bold tracking-[-0.04em] text-slate-950">{siteConfig.phone}</p>
            <p className="mt-3 text-sm text-slate-600">평일 09:00 - 18:00 상담 가능</p>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-[1.75rem] border border-slate-200 bg-[#f3f7ff] p-6 transition-colors hover:border-blue-300"
          >
            <Mail className="h-6 w-6 text-blue-700" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Email</p>
            <p className="mt-2 text-xl font-bold tracking-[-0.04em] text-slate-950">{siteConfig.email}</p>
            <p className="mt-3 text-sm text-slate-600">도입 문의 내용을 메일로 남길 수 있습니다.</p>
          </a>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Consultation scope</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>객실관리 시스템 국내형·유럽형 선택 기준 점검</li>
            <li>호텔락 3종과 운영관리 프로그램, 키오스크, 무인 관제 연동 범위 확인</li>
            <li>TV/B2B가전, 기타 자재, 설치 일정, 유지보수 범위 제안</li>
            <li>회원몰 연계 가능 품목과 회원 전용 견적 구조 안내</li>
          </ul>
          <div className="mt-6">
            <Link
              href="/products"
              className="text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
            >
              제품 페이지 다시 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
