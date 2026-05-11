import type { MetadataRoute } from 'next';

import { products, siteConfig, tvB2bCategories } from '@/lib/site';
import { systemLandings } from '@/lib/system-landings';

const lastModified = new Date('2026-05-09');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/products`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.siteUrl}/tv-b2b`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.siteUrl}/installations`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.siteUrl}/community`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.siteUrl}/support`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.siteUrl}/member-mall`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.siteUrl}/member-signup`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.siteUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.siteUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.siteUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const tvB2bRoutes = tvB2bCategories.map((category) => ({
    url: `${siteConfig.siteUrl}${category.href}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const solutionRoutes = systemLandings.map((landing) => ({
    url: `${siteConfig.siteUrl}${landing.href}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.82,
  }));

  return [...staticRoutes, ...solutionRoutes, ...productRoutes, ...tvB2bRoutes];
}
