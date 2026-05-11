import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  Cloud,
  MonitorSmartphone,
  ShieldCheck,
} from 'lucide-react';

import { FaqList } from '@/components/faq-list';
import { JsonLd } from '@/components/json-ld';
import { MarqueeStrip } from '@/components/marquee-strip';
import { MemberPriceDisplay } from '@/components/member-price-display';
import { Reveal } from '@/components/reveal';
import {
  capabilities,
  faqItems,
  getProductBySlug,
  memberBenefits,
  partnerNames,
  processSteps,
  products,
  siteConfig,
} from '@/lib/site';
import type { MemberDealRecord } from '@/lib/admin-types';

const capabilityIcons = [MonitorSmartphone, ShieldCheck, Cloud];
const marqueeItems = [
  '객실관리 국내형',
  '객실관리 유럽형',
  '호텔락 국내형',
  '호텔락 유럽형',
  'QR·키리스 도어락',
  '운영관리 프로그램',
  '무인 키오스크',
  '무인 관제 서비스',
  '회원 전용가',
];

function requireProduct(slug: string) {
  const product = getProductBySlug(slug);

  if (!product) {
    throw new Error(`Missing product for slug: ${slug}`);
  }

  return product;
}

const domesticSystem = requireProduct('room-management-domestic');
const europeanSystem = requireProduct('room-management-european');
const hotelLockQrKeyless = requireProduct('hotel-lock-qr-keyless');
const operationManagementProgram = requireProduct('operation-management-program');
const kioskSystem = requireProduct('kiosk-system');
const remoteMonitoringService = requireProduct('remote-monitoring-service');
const storyChapters = [
  {
    step: '01',
    eyebrow: 'Room control',
    title: '객실의 기준은 국내형 또는 유럽형 객실관리 선택에서 시작됩니다',
    description:
      '객실 운영 방식과 인테리어 톤에 맞춰 기본 제어 구조를 먼저 정하면, 이후 출입 제어와 프런트 운영 흐름도 더 정확하게 연결됩니다.',
    image: europeanSystem.image,
    imageAlt: europeanSystem.imageAlt,
    points: ['국내형은 익숙한 운영 환경 중심', '유럽형은 카드홀더와 씬 스위치 중심'],
    href: '/solutions/room-management',
    hrefLabel: '객실관리 랜딩 보기',
  },
  {
    step: '02',
    eyebrow: 'Access + front desk',
    title: '출입, 예약, 프런트 운영은 호텔락과 운영관리 프로그램으로 이어집니다',
    description:
      '카드키, QR·키리스, 객실 상태, 예약 정보를 따로 보지 않고 실제 프런트 운영 장면 안에서 하나의 흐름으로 제안할 수 있습니다.',
    image: operationManagementProgram.image,
    imageAlt: operationManagementProgram.imageAlt,
    points: ['호텔락 3종과 객실 출입 흐름 연결', '예약·현황·프런트 화면을 하나의 운영 기준으로 통합'],
    href: '/solutions/operation-management',
    hrefLabel: '운영관리 랜딩 보기',
  },
  {
    step: '03',
    eyebrow: 'Unmanned expansion',
    title: '마지막으로 무인 키오스크와 원격 관제로 운영 시간을 확장합니다',
    description:
      '셀프 체크인, 결제, 원격 응대, 야간 지원까지 이어지면서 인력 부담을 줄이고 로비 운영의 밀도를 더 높일 수 있습니다.',
    image: kioskSystem.image,
    imageAlt: kioskSystem.imageAlt,
    points: ['무인 키오스크와 원격 관제 서비스 확장', 'TV/B2B가전과 회원몰 제안까지 후속 연결 가능'],
    href: '/solutions/kiosk',
    hrefLabel: '키오스크 랜딩 보기',
  },
];

type HomePageProps = {
  memberDeals: MemberDealRecord[];
};

export function HomePage({ memberDeals }: HomePageProps) {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.siteUrl,
            email: siteConfig.email,
            telephone: siteConfig.phone,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${siteConfig.name} 제품 라인업`,
            itemListElement: products.map((product, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: product.title,
              url: `${siteConfig.siteUrl}/products/${product.slug}`,
            })),
          },
        ]}
      />

      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#eef5ff]">
        <div className="absolute left-[-12rem] top-[-14rem] h-[30rem] w-[30rem] rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute bottom-[-18rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-sky-200/40 blur-3xl" />
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Samsung Systec
            </div>
            <h1 className="font-display mt-6 text-4xl font-bold leading-tight tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              호텔 객실 운영을 하나의 시스템으로 연결합니다
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              객실관리 시스템, 호텔락, 운영관리 프로그램, 무인 키오스크, 무인 관제 서비스를
              현장 구조에 맞춰 제안하는 삼성시스텍 호텔 자동화 플랫폼입니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
              >
                제품·서비스 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:border-blue-700"
              >
                도입 상담 요청
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['국내형·유럽형 객실관리', '호텔락·QR 키리스', '회원몰 전용가'].map((item) => (
                <div key={item} className="rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Reveal className="rounded-[1.25rem] border border-blue-100 bg-[#f8fbff] p-3">
            <MarqueeStrip items={marqueeItems} />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <Reveal className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            적용 가능 시설 유형
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-semibold tracking-[0.12em] text-slate-400">
            {partnerNames.map((partner) => (
              <span key={partner}>{partner}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Core lineup</p>
          <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
            현장에서 바로 설명 가능한 제품군 구조로 정리했습니다
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            객실관리 타입 선택, 호텔락 구조, 프런트 운영 프로그램, 로비 자동화, 원격 관제,
            설치 자재까지 연결되는 흐름을 기준으로 제품군을 구성했습니다.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index];

            return (
              <Reveal key={capability.title} delay={index * 90} className="h-full">
                <article className="motion-card-lift h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {capability.description}
                  </p>
                  <Link
                    href={capability.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
                  >
                    자세히 보기
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="motion-card-lift rounded-[2rem] border border-blue-900 bg-[#0b1732] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                Room management systems
              </p>
              <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em]">
                국내형과 유럽형, 두 가지 객실관리 시스템 타입을 한눈에 비교할 수 있습니다
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                국내형은 익숙한 운영 방식과 제어 흐름에, 유럽형은 카드홀더와 씬 스위치 중심의
                객실 경험에 초점을 둡니다. 현장 인테리어와 운영 목적에 따라 다른 제안을 할 수
                있습니다.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-slate-200 sm:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-300" />
                  국내형 객실 제어 패널과 상태 연동 구성
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-300" />
                  유럽형 카드홀더 및 씬 스위치 기반 절전 설계
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-300" />
                  호텔락과 프런트 운영 흐름까지 고려한 확장 구조
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} variant="right">
            <div className="motion-card-lift motion-media-shell rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <Image
                src={europeanSystem.image}
                alt={europeanSystem.imageAlt}
                width={1024}
                height={1024}
                className="motion-media-image rounded-[1.5rem] border border-slate-100 object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Reveal delay={80} variant="left">
            <div className="motion-card-lift motion-media-shell rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <Image
                src={kioskSystem.image}
                alt={kioskSystem.imageAlt}
                width={1024}
                height={1024}
                className="motion-media-image rounded-[1.5rem] border border-slate-100 object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="motion-card-lift rounded-[2rem] border border-slate-200 bg-[#f3f7ff] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Lock + operations</p>
              <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950">
                호텔락, 운영관리 프로그램, 키오스크를 하나의 운영 동선으로 묶을 수 있습니다
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                출입 제어와 프런트 소프트웨어, 셀프 체크인 장비를 분리해서 보지 않고 실제 로비
                동선과 객실 접근 흐름이 이어지도록 설계하는 방식입니다. 무인 운영과 프런트 효율
                개선을 동시에 고려할 수 있습니다.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-slate-700 sm:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  호텔락 권한 발급과 객실 출입 흐름 정리
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  운영관리 프로그램으로 객실 현황과 프런트 업무 통합
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  무인 키오스크와 무인 관제 서비스까지 연결되는 운영 인프라 설계
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="h-full">
            <article className="motion-card-lift h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                Operations software
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                {operationManagementProgram.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {operationManagementProgram.summary}
              </p>
            </article>
          </Reveal>

          <Reveal className="h-full" delay={90}>
            <article className="motion-card-lift h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Hotel lock</p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                {hotelLockQrKeyless.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {hotelLockQrKeyless.summary}
              </p>
            </article>
          </Reveal>

          <Reveal className="h-full" delay={180}>
            <article className="motion-card-lift h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Remote monitoring</p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                {remoteMonitoringService.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {remoteMonitoringService.summary}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Reveal>
            <div className="motion-card-lift motion-sheen rounded-[2rem] border border-slate-200 bg-[#0f1f3d] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                <BadgePercent className="h-4 w-4" />
                Member mall
              </p>
              <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em]">
                회원가입 후 회원몰에서 더 낮은 기준으로 비교할 수 있게 구성했습니다
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                회원 전용가, 묶음 발주 혜택, 우선 견적 대응, 설치사례 자료 접근 구조를 회원몰
                페이지와 회원가입 페이지로 분리해 두었습니다.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-slate-200 sm:text-base">
                {memberBenefits.map((benefit) => (
                  <li key={benefit.title} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-300" />
                    <span>{benefit.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/member-mall"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  회원몰 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/member-signup"
                  className="inline-flex items-center justify-center rounded-full border border-blue-300 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-slate-950"
                >
                  회원가입 신청
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            {memberDeals.slice(0, 2).map((deal, index) => (
              <Reveal key={deal.id} delay={index * 90} className="h-full">
                <article className="motion-card-lift h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    {deal.badge}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">{deal.title}</h3>
                  <p className="mt-5 text-sm text-slate-500">{deal.regularPrice}</p>
                  <div className="mt-2">
                    <MemberPriceDisplay
                      value={deal.memberPrice}
                      className="font-display text-3xl font-bold tracking-[-0.06em] text-blue-700"
                      overlayLabel="회원 전용가"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{deal.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Story flow</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              호텔 자동화가 실제로 구축되는 순서대로 자연스럽게 보여드립니다
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              홈에서는 제품명을 반복 나열하지 않고, 상담 현장에서 설명하는 흐름처럼 무엇을 먼저
              정하고 다음에 무엇이 연결되는지 기준으로 읽히게 구성했습니다.
            </p>
          </Reveal>

          <div className="mt-14 space-y-2">
            {storyChapters.map((chapter, index) => (
              <Reveal key={chapter.step} delay={index * 90}>
                <article className="group grid gap-8 border-t border-slate-200 py-10 first:border-t-0 first:pt-0 lg:grid-cols-[0.96fr_1.04fr] lg:gap-12 lg:py-14">
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-start gap-4">
                      <p className="font-display text-5xl font-bold tracking-[-0.08em] text-blue-100 sm:text-6xl">
                        {chapter.step}
                      </p>
                      <div className="pt-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                          {chapter.eyebrow}
                        </p>
                        <h3 className="mt-3 text-3xl font-bold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                          {chapter.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                      {chapter.description}
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-700 sm:text-base">
                      {chapter.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={chapter.href}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
                    >
                      {chapter.hrefLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="relative overflow-hidden rounded-[2.25rem] border border-white bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                      <div className="absolute inset-x-10 top-0 h-24 bg-gradient-to-b from-blue-100/70 to-transparent" />
                      <div className="relative aspect-[1.18/1] rounded-[1.8rem] bg-[radial-gradient(circle_at_top,rgba(232,242,255,1)_0%,rgba(247,251,255,1)_56%,rgba(255,255,255,1)_100%)]">
                        <Image
                          src={chapter.image}
                          alt={chapter.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 720px"
                          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
            >
              전체 제품 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/member-mall"
              className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:border-blue-700"
            >
              회원몰 보기
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Process</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              현장 진단부터 설치와 운영 지원까지 한 흐름으로 진행합니다
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 90} className="h-full">
                <article className="motion-card-lift h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
                  <p className="font-display text-4xl font-bold tracking-[-0.08em] text-blue-700">
                    {step.step}
                  </p>
                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-slate-950">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">FAQ</p>
          <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
            제품 도입 전에 가장 많이 확인하는 질문
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            국내형·유럽형 차이, 호텔락 구조 구분, 운영관리 프로그램 역할, 키오스크 단독 도입,
            TV/B2B가전 구성, 무인 관제 범위, 회원몰 혜택을 기준으로 먼저 정리했습니다.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <FaqList items={faqItems} defaultOpenFirst />
        </Reveal>

        <div className="mt-8 text-center">
          <Link href="/faq" className="text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700">
            전체 FAQ 페이지 보기
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#0b1732]">
        <Reveal className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">Start now</p>
          <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl">
            삼성시스텍 제품군과 회원몰 구조로 호텔 자동화 구성을 정리해보세요
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            객실관리 시스템 타입 선택부터 호텔락 3종, 운영관리 프로그램, 무인 키오스크,
            TV/B2B가전, 무인 관제 서비스, 기타 자재, 회원 전용가까지 현장 기준으로 묶어서
            제안할 수 있습니다.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 sm:text-base"
            >
              무료 도입 상담 신청
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/member-signup"
              className="inline-flex items-center justify-center rounded-full border border-blue-300 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-slate-950 sm:text-base"
            >
              회원가입 신청
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
