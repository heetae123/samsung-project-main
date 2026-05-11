'use client';

import { useState } from 'react';

type AdminLoginPanelProps = {
  usesDemoPassword: boolean;
};

export function AdminLoginPanel({ usesDemoPassword }: AdminLoginPanelProps) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setError(result.message ?? '로그인에 실패했습니다.');
        setSubmitting(false);
        return;
      }

      window.location.reload();
    } catch {
      setError('네트워크 문제로 로그인할 수 없습니다.');
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
          Admin
        </p>
        <h1 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
          관리자 페이지 로그인
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          회원몰 번들 상품 CRUD와 견적 문의 목록을 관리하는 전용 화면입니다.
        </p>

        {usesDemoPassword ? (
          <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
            현재 `ADMIN_DASHBOARD_PASSWORD` 환경변수가 없어서 데모 비밀번호
            `demo-admin` 으로 동작합니다. 배포 전에는 반드시 환경변수로 교체해야 합니다.
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <div>
            <label htmlFor="admin-password" className="text-sm font-semibold text-slate-950">
              관리자 비밀번호
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? '확인 중...' : '관리자 로그인'}
          </button>
        </form>
      </div>
    </section>
  );
}
