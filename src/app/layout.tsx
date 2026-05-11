import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import type { ReactNode } from 'react';

import { MemberAuthProvider } from '@/components/member-auth-provider';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site';

import './globals.css';

const bodyFont = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | 호텔 자동화·TV/B2B가전·회원몰`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    '삼성시스텍',
    '객실관리 시스템',
    '객실관리 시스템 국내형',
    '객실관리 시스템 유럽형',
    '호텔락 시스템 국내형',
    '호텔락 시스템 유럽형',
    'QR 키리스 호텔락',
    '운영관리 프로그램',
    '무인 키오스크',
    '무인 관제 서비스',
    '기타 자재',
    'TV B2B가전',
    '설치사례',
    '회원몰',
    '회원가입',
    '고객지원',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.siteUrl,
    title: `${siteConfig.name} | 호텔 자동화·TV/B2B가전·회원몰`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'ko_KR',
    images: [
      {
        url: '/room-management-domestic.png',
        width: 1024,
        height: 1024,
        alt: '삼성시스텍 객실관리 시스템 국내형',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | 호텔 자동화·TV/B2B가전·회원몰`,
    description: siteConfig.description,
    images: ['/room-management-domestic.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={bodyFont.variable}>
        <MemberAuthProvider>
          <div className="min-h-screen">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </MemberAuthProvider>
      </body>
    </html>
  );
}
