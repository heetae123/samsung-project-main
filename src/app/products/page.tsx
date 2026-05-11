import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutGrid, Lock, Monitor, MonitorSmartphone, ShieldCheck, TabletSmartphone, Wrench } from 'lucide-react';

import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/site';
import { systemLandings } from '@/lib/system-landings';

const categoryIcons: Record<string, any> = {
  'room-management': Monitor,
  'hotel-lock': Lock,
  'operation-management': MonitorSmartphone,
  kiosk: TabletSmartphone,
  'remote-monitoring': ShieldCheck,
  'misc-materials': Wrench,
};

export const metadata: Metadata = {
  title: '제품·서비스',
  description:
    '삼성시스텍의 객실관리 시스템 국내형·유럽형, 호텔락 시스템 국내형·유럽형·QR·키리스, 운영관리 프로그램, 무인 키오스크, 무인 관제 서비스, 기타 자재를 페이지별로 확인할 수 있습니다.',
  alternates: {
    canonical: '/products',
  },
};

export default function ProductsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Products & Services</p>
          <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
            삼성시스텍 제품·서비스 구성
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            객실관리 시스템 국내형·유럽형을 포함해 호텔락 시스템 국내형·유럽형·QR·키리스,
            운영관리 프로그램, 무인 키오스크, 무인 관제 서비스, 기타 자재까지 제품별 상세
            페이지와 서비스 패키지 흐름으로 구성했습니다.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">
          <Link
            href="/products"
            className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-1"
          >
            <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-blue-700 bg-blue-700 text-white shadow-md transition-all sm:h-20 sm:w-20">
              <LayoutGrid className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <span className="text-[15px] font-semibold text-blue-700">All Products</span>
          </Link>

          {systemLandings.map((landing) => {
            const Icon = categoryIcons[landing.slug] || Monitor;
            return (
              <Link
                key={landing.slug}
                href={landing.href}
                className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-1"
              >
                <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white group-hover:shadow-md sm:h-20 sm:w-20">
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <span className="text-[15px] font-semibold text-slate-950">{landing.title}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">All Products</p>
              <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                전체 제품 라인업
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
