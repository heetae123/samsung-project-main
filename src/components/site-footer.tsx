import Link from 'next/link';

import { navItems, siteConfig } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold tracking-[-0.06em] text-slate-950">
            {siteConfig.name}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            객실관리 시스템 국내형·유럽형, 호텔락 시스템 국내형·유럽형·QR·키리스, 운영관리
            프로그램, 무인 키오스크, 무인 관제 서비스, 기타 자재와 TV/B2B가전, 회원몰 구조까지
            호텔 자동화 라인업을 소개합니다.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Navigation</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Contact</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            <a href={`tel:${siteConfig.phone.replace(/-/g, '')}`} className="text-lg font-bold text-slate-950">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-slate-950">
              {siteConfig.email}
            </a>
            <p>평일 09:00 - 18:00</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/member-mall" className="transition-colors hover:text-slate-950">
              회원몰
            </Link>
            <Link href="/member-signup" className="transition-colors hover:text-slate-950">
              회원가입
            </Link>
            <Link href="/support" className="transition-colors hover:text-slate-950">
              고객지원
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
