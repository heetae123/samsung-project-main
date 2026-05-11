import Link from 'next/link';
import { Menu } from 'lucide-react';

import { HeaderAuthControls } from '@/components/header-auth-controls';
import { navItems, siteConfig } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[rgba(244,248,255,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold tracking-[-0.06em] text-slate-950">
            {siteConfig.name}
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
            {siteConfig.domainLabel}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>

        <HeaderAuthControls />

        <details className="group relative lg:hidden">
          <summary className="flex list-none cursor-pointer items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950">
            <Menu className="mr-2 h-4 w-4" />
            메뉴
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
              <HeaderAuthControls mobile />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
