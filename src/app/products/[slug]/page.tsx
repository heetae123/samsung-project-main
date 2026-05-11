import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductPage } from '@/components/product-page';
import { getProductBySlug, products, siteConfig } from '@/lib/site';

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: '제품을 찾을 수 없습니다',
    };
  }

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | ${siteConfig.name}`,
      description: product.description,
      url: `${siteConfig.siteUrl}/products/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 1024,
          height: 1024,
          alt: product.imageAlt,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
