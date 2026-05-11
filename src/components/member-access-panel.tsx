'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMemberAuth } from '@/components/member-auth-provider';

type MemberAccessPanelProps = {
  redirectTo?: string;
};

export function MemberAccessPanel({
  redirectTo = '/member-mall',
}: MemberAccessPanelProps) {
  const router = useRouter();
  const { isFirebaseConfigured, signUp } = useMemberAuth();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    rooms: '',
    interest: '',
    message: '',
  });

  async function handleSignupSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await signUp(signupForm);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? '회원가입에 실패했습니다.');
      return;
    }

    router.push(redirectTo);
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="rounded-full bg-[#f3f7ff] px-4 py-2 text-sm font-semibold text-blue-700">
        회원가입 완료 시 회원가가 자동 적용됩니다
      </div>

      {!isFirebaseConfigured ? (
        <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-800">
          현재는 Firebase 환경변수가 없어서 데모 모드로 동작합니다. 로컬에서는 회원가입만
          하면 즉시 자동으로 회원 세션이 열리고, 회원가가 바로 적용됩니다. 실제 Firebase 연결
          후에는 같은 화면이 Auth/Firestore로 전환됩니다.
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSignupSubmit} className="mt-6 grid gap-5">
          <div>
            <label htmlFor="signup-name" className="text-sm font-semibold text-slate-950">
              담당자명
            </label>
            <input
              id="signup-name"
              required
              value={signupForm.name}
              onChange={(event) =>
                setSignupForm((current) => ({ ...current, name: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-email" className="text-sm font-semibold text-slate-950">
                이메일
              </label>
              <input
                id="signup-email"
                type="email"
                required
                value={signupForm.email}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, email: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="text-sm font-semibold text-slate-950">
                비밀번호
              </label>
              <input
                id="signup-password"
                type="password"
                required
                minLength={8}
                value={signupForm.password}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, password: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-phone" className="text-sm font-semibold text-slate-950">
                연락처
              </label>
              <input
                id="signup-phone"
                required
                value={signupForm.phone}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, phone: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              />
            </div>
            <div>
              <label htmlFor="signup-company" className="text-sm font-semibold text-slate-950">
                사업장명
              </label>
              <input
                id="signup-company"
                required
                value={signupForm.company}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, company: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-rooms" className="text-sm font-semibold text-slate-950">
                객실 수 또는 규모
              </label>
              <input
                id="signup-rooms"
                value={signupForm.rooms}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, rooms: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              />
            </div>
            <div>
              <label htmlFor="signup-interest" className="text-sm font-semibold text-slate-950">
                관심 품목
              </label>
              <select
                id="signup-interest"
                value={signupForm.interest}
                onChange={(event) =>
                  setSignupForm((current) => ({ ...current, interest: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
              >
                <option value="">선택해 주세요</option>
                <option value="객실관리 시스템">객실관리 시스템</option>
                <option value="호텔락 시스템">호텔락 시스템 국내형·유럽형·QR·키리스</option>
                <option value="운영관리 프로그램">운영관리 프로그램</option>
                <option value="무인 키오스크">무인 키오스크 시스템</option>
                <option value="무인 관제 서비스">무인 관제 서비스</option>
                <option value="TV/B2B가전">TV/B2B가전</option>
                <option value="기타 자재">기타 자재</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="signup-message" className="text-sm font-semibold text-slate-950">
              요청 내용
            </label>
            <textarea
              id="signup-message"
              rows={4}
              value={signupForm.message}
              onChange={(event) =>
                setSignupForm((current) => ({ ...current, message: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? '처리 중...' : '회원가입 후 자동 적용'}
          </button>
        </form>
    </div>
  );
}
