import Image from 'next/image';

import { getProductCommerce } from '@/lib/product-commerce';
import type { ProductItem } from '@/lib/site';

type ProductVideoSectionProps = {
  product: ProductItem;
};

export function ProductVideoSection({ product }: ProductVideoSectionProps) {
  const commerce = getProductCommerce(product.slug);

  if (!commerce || commerce.videos.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Public videos</p>
          <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
            제품 사용과 운영 흐름을 누구나 볼 수 있는 공개 영상 영역
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            회원 여부와 상관없이 모든 방문자가 제품 사용법과 운영 흐름 영상을 볼 수 있도록
            구성했습니다. 현재는 영상 연결 구조까지 구현되어 있고, 실제 URL 입력 시 바로
            공개 재생됩니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {commerce.videos.map((video) => (
            <article
              key={video.id}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
            >
              {video.embedUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              ) : (
                <div className="border-b border-slate-100 bg-[#f3f7ff] p-4">
                  <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white">
                    <Image
                      src={video.posterImage}
                      alt={video.title}
                      width={1024}
                      height={768}
                      className="aspect-video object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    {video.duration}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Public
                  </p>
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                  {video.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {video.description}
                </p>
                <p className="mt-4 text-sm text-blue-700">{video.visibilityNote}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
