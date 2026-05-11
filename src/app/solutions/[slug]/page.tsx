import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SystemLandingPage } from '@/components/system-landing-page';
import { getSystemLandingBySlug, systemLandings } from '@/lib/system-landings';
import { siteConfig } from '@/lib/site';

type SolutionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return systemLandings.map((landing) => ({
    slug: landing.slug,
  }));
}

export async function generateMetadata({
  params,
}: SolutionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = getSystemLandingBySlug(slug);

  if (!landing) {
    return {
      title: '페이지를 찾을 수 없습니다',
    };
  }

  return {
    title: `${landing.title} | ${siteConfig.name}`,
    description: landing.description,
    alternates: {
      canonical: landing.href,
    },
    openGraph: {
      title: `${landing.title} | ${siteConfig.name}`,
      description: landing.description,
      url: `${siteConfig.siteUrl}${landing.href}`,
      images: [
        {
          url: landing.primaryImage,
          width: 1024,
          height: 1024,
          alt: landing.primaryImageAlt,
        },
      ],
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: SolutionDetailPageProps) {
  const { slug } = await params;
  const landing = getSystemLandingBySlug(slug);

  if (!landing) {
    notFound();
  }

  return <SystemLandingPage landing={landing} />;
}
