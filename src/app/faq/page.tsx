import type { Metadata } from 'next';

import { FaqList } from '@/components/faq-list';
import { JsonLd } from '@/components/json-ld';
import { faqItems, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: '자주 묻는 질문',
  description:
    '삼성시스텍 제품 도입 전에 자주 받는 질문을 모았습니다. 국내형·유럽형 차이, 호텔락 구조 구분, 운영관리 프로그램, 키오스크 도입, TV/B2B가전, 무인 관제, 회원몰 혜택 범위를 확인할 수 있습니다.',
  alternates: {
    canonical: '/faq',
  },
};

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
          publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.siteUrl,
          },
        }}
      />

      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">FAQ</p>
        <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
          도입 전에 가장 많이 받는 질문
        </h1>
        <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
          객실관리 타입 선택, 호텔락 구조 구분, 운영관리 프로그램 역할, 키오스크 구성,
          TV/B2B가전 상담, 무인 관제 서비스 범위, 회원몰 혜택, 기타 자재 공급 여부를 중심으로
          먼저 정리했습니다.
        </p>
      </div>

      <div className="mt-12">
        <FaqList items={faqItems} defaultOpenFirst />
      </div>
    </section>
  );
}
