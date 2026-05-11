'use client';

import { useState } from 'react';

import { useMemberAuth } from '@/components/member-auth-provider';
import { getProductCommerce } from '@/lib/product-commerce';
import type { ProductItem } from '@/lib/site';

type QuoteRequestFormProps = {
  product: ProductItem;
};

type QuoteStatus = {
  ok: boolean;
  message: string;
};

export function QuoteRequestForm({ product }: QuoteRequestFormProps) {
  const commerce = getProductCommerce(product.slug);
  const { isAuthenticated, member } = useMemberAuth();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<QuoteStatus | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: String(formData.get('name') ?? ''),
          email: String(formData.get('email') ?? ''),
          phone: String(formData.get('phone') ?? ''),
          company: String(formData.get('company') ?? ''),
          quantity: String(formData.get('quantity') ?? ''),
          message: String(formData.get('message') ?? ''),
          memberId: member?.uid,
          priceTier: isAuthenticated ? 'member' : 'general',
          productSlug: product.slug,
          productTitle: product.title,
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        storage?: 'firestore' | 'demo';
      };

      setSubmitting(false);

      if (!response.ok || !result.ok) {
        setStatus({
          ok: false,
          message: result.message ?? '견적 요청을 저장하지 못했습니다.',
        });
        return;
      }

      setStatus({
        ok: true,
        message:
          result.storage === 'firestore'
            ? '견적 요청이 저장되었습니다. Firebase Console에서 바로 확인할 수 있습니다.'
            : '견적 요청이 데모 모드로 접수되었습니다. Firebase 연결 후 Firestore 저장으로 전환됩니다.',
      });
      formElement.reset();
    } catch {
      setSubmitting(false);
      setStatus({
        ok: false,
        message: '네트워크 문제로 견적 요청을 저장하지 못했습니다.',
      });
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-[#0f1f3d] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">Quote request</p>
          <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em]">
            온라인 결제 대신 견적 요청으로 진행합니다
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            일반 방문자는 일반가 기준으로, 회원가입을 완료한 고객은 회원가 기준으로 견적
            요청이 접수됩니다. 최종 금액은 현장 조건과 수량을 확인한 뒤 확정합니다.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-blue-300/30 bg-white/5 p-5">
            <p className="text-sm font-semibold text-blue-200">
              {isAuthenticated ? '회원가 기준 요청 중' : '일반가 기준 요청'}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">{commerce?.quoteLead}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          {status ? (
            <div
              className={`mb-6 rounded-[1.5rem] border p-5 text-sm leading-7 ${
                status.ok
                  ? 'border-blue-200 bg-[#f3f7ff] text-slate-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <form key={member?.uid ?? 'guest'} onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${product.slug}-quote-name`} className="text-sm font-semibold text-slate-950">
                  담당자명
                </label>
                <input
                  id={`${product.slug}-quote-name`}
                  name="name"
                  required
                  defaultValue={member?.name ?? ''}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                />
              </div>
              <div>
                <label htmlFor={`${product.slug}-quote-company`} className="text-sm font-semibold text-slate-950">
                  사업장명
                </label>
                <input
                  id={`${product.slug}-quote-company`}
                  name="company"
                  required
                  defaultValue={member?.company ?? ''}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${product.slug}-quote-email`} className="text-sm font-semibold text-slate-950">
                  이메일
                </label>
                <input
                  id={`${product.slug}-quote-email`}
                  name="email"
                  type="email"
                  required
                  defaultValue={member?.email ?? ''}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                />
              </div>
              <div>
                <label htmlFor={`${product.slug}-quote-phone`} className="text-sm font-semibold text-slate-950">
                  연락처
                </label>
                <input
                  id={`${product.slug}-quote-phone`}
                  name="phone"
                  required
                  defaultValue={member?.phone ?? ''}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${product.slug}-quote-quantity`} className="text-sm font-semibold text-slate-950">
                수량 또는 도입 규모
              </label>
              <input
                id={`${product.slug}-quote-quantity`}
                name="quantity"
                required
                placeholder="예: 20실, 키오스크 2대, 관제 3개 지점"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              />
            </div>

            <div>
              <label htmlFor={`${product.slug}-quote-message`} className="text-sm font-semibold text-slate-950">
                요청 내용
              </label>
              <textarea
                id={`${product.slug}-quote-message`}
                name="message"
                rows={5}
                placeholder="설치 일정, 현장 조건, 필요 기능을 남겨주세요."
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? '저장 중...' : '견적 요청 보내기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
