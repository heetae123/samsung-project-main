import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { JsonLd } from '@/components/json-ld';
import { ProductPricingSummary } from '@/components/product-pricing-summary';
import { ProductVideoSection } from '@/components/product-video-section';
import { QuoteRequestForm } from '@/components/quote-request-form';
import { getProductCommerce } from '@/lib/product-commerce';
import type { ProductItem } from '@/lib/site';
import { siteConfig } from '@/lib/site';

type ProductPageProps = {
  product: ProductItem;
};

export function ProductPage({ product }: ProductPageProps) {
  const commerce = getProductCommerce(product.slug);

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: product.title,
            serviceType: product.title,
            description: product.description,
            provider: {
              '@type': 'Organization',
              name: siteConfig.name,
              url: siteConfig.siteUrl,
            },
            areaServed: 'KR',
            url: `${siteConfig.siteUrl}/products/${product.slug}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            description: product.description,
            image: `${siteConfig.siteUrl}${product.image}`,
            brand: {
              '@type': 'Brand',
              name: siteConfig.name,
            },
            offers: commerce
              ? {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'KRW',
                  lowPrice: commerce.memberPrice,
                  highPrice: commerce.generalPrice,
                  offerCount: 2,
                }
              : undefined,
          },
        ]}
      />

      <section className="border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">{product.tag}</p>
            <h1 className="font-display mt-6 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
              {product.title}
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">{product.description}</p>
            <div className="mt-10">
              <ProductPricingSummary slug={product.slug} />
              <div className="mt-6">
                <Link
                  href="#quote-request"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 sm:w-auto sm:text-base"
                >
                  이 제품 견적 문의하기
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={1024}
              height={1024}
              priority
              className="rounded-[1.5rem] border border-slate-100 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Key features</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950">
              현장 적용을 기준으로 정리한 핵심 구성
            </h2>
            <ul className="mt-8 space-y-4 text-sm text-slate-700 sm:text-base">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-[#f3f7ff] p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Use cases</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950">
              이런 업장에 특히 적합합니다
            </h2>
            <ul className="mt-8 space-y-4 text-sm text-slate-700 sm:text-base">
              {product.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProductVideoSection product={product} />

      <QuoteRequestForm product={product} />

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Next step</p>
          <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
            우리 업장에 이 제품이 맞는지 바로 확인해보세요
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            현장 설비와 객실 타입, 출입 제어 범위, 운영 동선을 기준으로 일반가와 회원가 중 어떤 기준이 맞는지까지 함께 정리해드립니다.
          </p>
          <div className="mt-10">
            <Link
              href="/member-signup"
              className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 sm:text-base"
            >
              회원가입 후 회원가 자동 적용
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
