import Image from 'next/image';
import Link from 'next/link';

import type { ProductItem } from '@/lib/site';
import { MemberPriceDisplay } from '@/components/member-price-display';

type MemberProductCardProps = {
  product: ProductItem;
};

// 임시 가격 데이터 (추후 DB나 site.ts에서 관리)
const mockPrices: Record<string, { regular: string; member: string }> = {
  'room-management-domestic': { regular: '₩ 180,000', member: '₩ 150,000' },
  'room-management-european': { regular: '₩ 220,000', member: '₩ 185,000' },
  'hotel-lock-domestic': { regular: '₩ 350,000', member: '₩ 290,000' },
  'hotel-lock-european': { regular: '₩ 420,000', member: '₩ 360,000' },
  'hotel-lock-qr-keyless': { regular: '₩ 380,000', member: '₩ 320,000' },
  'operation-management-program': { regular: '별도 문의', member: '회원가 별도 안내' },
  'kiosk-system': { regular: '₩ 4,500,000', member: '₩ 3,900,000' },
  'remote-monitoring-service': { regular: '월 ₩ 150,000', member: '월 ₩ 120,000' },
  'misc-materials': { regular: '₩ 50,000', member: '₩ 40,000' },
};

export function MemberProductCard({ product }: MemberProductCardProps) {
  const price = mockPrices[product.slug] || { regular: '₩ 0', member: '₩ 0' };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#f3f7ff]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">{product.tag}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-3 text-xl font-bold tracking-[-0.04em] text-slate-950 transition-colors group-hover:text-blue-700">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-400 line-through">{price.regular}</span>
              <MemberPriceDisplay
                value={price.member}
                className="text-2xl font-bold tracking-[-0.04em] text-blue-700"
                overlayLabel="회원 전용가"
              />
            </div>
            <Link
              href={`/contact?product=${encodeURIComponent(product.title)}`}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
            >
              견적 요청
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
