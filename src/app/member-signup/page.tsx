import type { Metadata } from 'next';

import { MemberAccessPanel } from '@/components/member-access-panel';
import { memberBenefits, memberSignupSteps } from '@/lib/site';

export const metadata: Metadata = {
  title: '회원가입',
  description:
    '삼성시스텍 회원가입 페이지입니다. 누구나 가입할 수 있고, 가입 후 모든 상품의 회원가를 확인하고 견적 요청을 진행할 수 있습니다.',
  alternates: {
    canonical: '/member-signup',
  },
};

export default function MemberSignupPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Member signup</p>
            <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.08em] text-slate-950 sm:text-6xl">
              누구나 가입 가능한 회원가입
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              비회원도 모든 상품과 일반가를 볼 수 있지만, 회원가입 후에는 모든 상품에서 더
              낮은 회원가를 확인할 수 있습니다. 가입 즉시 회원가 기준 견적 요청도 가능합니다.
            </p>

            <div className="mt-8 space-y-4">
              {memberBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_14px_50px_rgba(15,23,42,0.04)]"
                >
                  <p className="text-lg font-bold tracking-[-0.03em] text-slate-950">{benefit.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <MemberAccessPanel redirectTo="/member-mall" />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Signup flow</p>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              신청 후 진행 순서
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {memberSignupSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
              >
                <p className="font-display text-4xl font-bold tracking-[-0.08em] text-blue-700">{step.step}</p>
                <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-slate-950">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
