import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

import type { ProductItem } from '@/lib/site';

type ProductCardProps = {
  product: ProductItem;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="motion-card-lift group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <div className="border-b border-slate-100 bg-[#f3f7ff] p-4">
        <div className="motion-media-shell overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={1024}
            height={1024}
            className="motion-media-image aspect-[4/3] object-cover"
          />
        </div>
      </div>

      <div className="flex h-full flex-col p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">{product.tag}</p>
        <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">{product.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{product.summary}</p>

        <ul className="mt-6 space-y-3 text-sm text-slate-700">
          {product.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
          >
            자세히 보기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
