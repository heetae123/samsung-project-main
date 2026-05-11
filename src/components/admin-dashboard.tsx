'use client';

import { useState } from 'react';
import { ArrowRight, LogOut, Plus, Save, Trash2 } from 'lucide-react';

import type {
  MemberDealRecord,
  QuoteRequestRecord,
  QuoteRequestStatus,
} from '@/lib/admin-types';

type AdminDashboardProps = {
  initialDeals: MemberDealRecord[];
  initialQuotes: QuoteRequestRecord[];
  storageMode: 'firestore' | 'demo';
};

type DealFormState = {
  badge: string;
  title: string;
  regularPrice: string;
  memberPrice: string;
  note: string;
  items: string;
  sortOrder: string;
};

const QUOTE_STATUS_LABELS: Record<QuoteRequestStatus, string> = {
  requested: '신규 요청',
  reviewing: '검토 중',
  quoted: '견적 발송',
  closed: '종료',
};

const emptyDealForm: DealFormState = {
  badge: '',
  title: '',
  regularPrice: '',
  memberPrice: '',
  note: '',
  items: '',
  sortOrder: '0',
};

function toDealFormState(deal: MemberDealRecord): DealFormState {
  return {
    badge: deal.badge,
    title: deal.title,
    regularPrice: deal.regularPrice,
    memberPrice: deal.memberPrice,
    note: deal.note,
    items: deal.items.join('\n'),
    sortOrder: String(deal.sortOrder),
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function AdminDashboard({
  initialDeals,
  initialQuotes,
  storageMode,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'deals' | 'quotes'>('deals');
  const [deals, setDeals] = useState(initialDeals);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [editingDealId, setEditingDealId] = useState<string | null>(null);
  const [dealForm, setDealForm] = useState<DealFormState>(emptyDealForm);
  const [selectedQuoteId, setSelectedQuoteId] = useState(initialQuotes[0]?.id ?? null);
  const [quoteStatus, setQuoteStatus] = useState<QuoteRequestStatus>(
    initialQuotes[0]?.status ?? 'requested',
  );
  const [quoteNote, setQuoteNote] = useState(initialQuotes[0]?.adminNote ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{
    tone: 'success' | 'error';
    message: string;
  } | null>(null);

  const selectedQuote = quotes.find((quote) => quote.id === selectedQuoteId) ?? null;

  function resetDealForm() {
    setEditingDealId(null);
    setDealForm(emptyDealForm);
  }

  function selectQuote(quote: QuoteRequestRecord) {
    setSelectedQuoteId(quote.id);
    setQuoteStatus(quote.status);
    setQuoteNote(quote.adminNote ?? '');
  }

  async function handleLogout() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    window.location.reload();
  }

  async function handleDealSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNotice(null);

    const payload = {
      badge: dealForm.badge,
      title: dealForm.title,
      regularPrice: dealForm.regularPrice,
      memberPrice: dealForm.memberPrice,
      note: dealForm.note,
      items: dealForm.items
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      sortOrder: Number(dealForm.sortOrder || '0'),
    };

    try {
      const response = await fetch(
        editingDealId
          ? `/api/admin/member-deals/${editingDealId}`
          : '/api/admin/member-deals',
        {
          method: editingDealId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        deal?: MemberDealRecord;
      };

      if (!response.ok || !result.ok || !result.deal) {
        setNotice({
          tone: 'error',
          message: result.message ?? '회원몰 상품을 저장하지 못했습니다.',
        });
        setSubmitting(false);
        return;
      }

      if (editingDealId) {
        setDeals((current) =>
          [...current.map((deal) => (deal.id === result.deal?.id ? result.deal : deal))].sort(
            (left, right) => left.sortOrder - right.sortOrder,
          ),
        );
      } else {
        setDeals((current) =>
          [...current, result.deal!].sort((left, right) => left.sortOrder - right.sortOrder),
        );
      }

      resetDealForm();
      setNotice({
        tone: 'success',
        message: editingDealId
          ? '회원몰 상품을 수정했습니다.'
          : '회원몰 상품을 추가했습니다.',
      });
    } catch {
      setNotice({
        tone: 'error',
        message: '네트워크 문제로 회원몰 상품을 저장하지 못했습니다.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteDeal(id: string) {
    setSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch(`/api/admin/member-deals/${id}`, {
        method: 'DELETE',
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setNotice({
          tone: 'error',
          message: result.message ?? '회원몰 상품을 삭제하지 못했습니다.',
        });
        setSubmitting(false);
        return;
      }

      setDeals((current) => current.filter((deal) => deal.id !== id));

      if (editingDealId === id) {
        resetDealForm();
      }

      setNotice({
        tone: 'success',
        message: '회원몰 상품을 삭제했습니다.',
      });
    } catch {
      setNotice({
        tone: 'error',
        message: '네트워크 문제로 회원몰 상품을 삭제하지 못했습니다.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleQuoteSave() {
    if (!selectedQuote) {
      return;
    }

    setSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch(`/api/admin/quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: quoteStatus,
          adminNote: quoteNote,
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        quote?: QuoteRequestRecord;
      };

      if (!response.ok || !result.ok || !result.quote) {
        setNotice({
          tone: 'error',
          message: result.message ?? '견적 문의를 수정하지 못했습니다.',
        });
        setSubmitting(false);
        return;
      }

      setQuotes((current) =>
        current.map((quote) => (quote.id === result.quote?.id ? result.quote : quote)),
      );
      selectQuote(result.quote);
      setNotice({
        tone: 'success',
        message: '견적 문의 상태를 저장했습니다.',
      });
    } catch {
      setNotice({
        tone: 'error',
        message: '네트워크 문제로 견적 상태를 저장하지 못했습니다.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
            Admin dashboard
          </p>
          <h1 className="font-display mt-5 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl">
            회원몰과 견적 문의 관리
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            회원몰 번들 카드 CRUD와 견적 문의 목록 조회, 상태 변경을 한 화면에서 처리합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            저장소: {storageMode === 'firestore' ? 'Firestore' : 'Demo file'}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
          >
            <LogOut className="h-4 w-4" />
            로그아웃
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-medium text-slate-500">회원몰 번들 수</p>
          <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-slate-950">{deals.length}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-medium text-slate-500">견적 문의 수</p>
          <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-slate-950">{quotes.length}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-medium text-slate-500">대기 문의</p>
          <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-slate-950">
            {quotes.filter((quote) => quote.status !== 'closed').length}
          </p>
        </div>
      </div>

      {notice ? (
        <div
          className={`mt-8 rounded-[1.5rem] border p-5 text-sm leading-7 ${
            notice.tone === 'success'
              ? 'border-blue-200 bg-[#f3f7ff] text-slate-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {notice.message}
        </div>
      ) : null}

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('deals')}
          className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'deals'
              ? 'bg-blue-700 text-white'
              : 'border border-slate-300 bg-white text-slate-950'
          }`}
        >
          회원몰 CRUD
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('quotes')}
          className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'quotes'
              ? 'bg-blue-700 text-white'
              : 'border border-slate-300 bg-white text-slate-950'
          }`}
        >
          견적 문의 보기
        </button>
      </div>

      {activeTab === 'deals' ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                  Member mall form
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] text-slate-950">
                  {editingDealId ? '회원몰 상품 수정' : '회원몰 상품 추가'}
                </h2>
              </div>
              <button
                type="button"
                onClick={resetDealForm}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
              >
                <Plus className="h-4 w-4" />
                새로 작성
              </button>
            </div>

            <form onSubmit={handleDealSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-950">배지</label>
                  <input
                    value={dealForm.badge}
                    onChange={(event) =>
                      setDealForm((current) => ({ ...current, badge: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-950">정렬 순서</label>
                  <input
                    type="number"
                    value={dealForm.sortOrder}
                    onChange={(event) =>
                      setDealForm((current) => ({ ...current, sortOrder: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-950">제목</label>
                <input
                  value={dealForm.title}
                  onChange={(event) =>
                    setDealForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-950">일반가 문구</label>
                  <input
                    value={dealForm.regularPrice}
                    onChange={(event) =>
                      setDealForm((current) => ({ ...current, regularPrice: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-950">회원가 문구</label>
                  <input
                    value={dealForm.memberPrice}
                    onChange={(event) =>
                      setDealForm((current) => ({ ...current, memberPrice: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-950">설명</label>
                <textarea
                  rows={4}
                  value={dealForm.note}
                  onChange={(event) =>
                    setDealForm((current) => ({ ...current, note: event.target.value }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-950">
                  구성 항목
                </label>
                <textarea
                  rows={5}
                  value={dealForm.items}
                  onChange={(event) =>
                    setDealForm((current) => ({ ...current, items: event.target.value }))
                  }
                  placeholder="줄바꿈으로 항목을 구분합니다."
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save className="h-4 w-4" />
                {submitting ? '저장 중...' : editingDealId ? '수정 저장' : '상품 추가'}
              </button>
            </form>
          </div>

          <div className="grid gap-6">
            {deals.map((deal) => (
              <article
                key={deal.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                      {deal.badge}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                      {deal.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-500">{deal.regularPrice}</p>
                    <p className="mt-1 text-lg font-bold text-blue-700">{deal.memberPrice}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{deal.note}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDealId(deal.id);
                        setDealForm(toDealFormState(deal));
                        setActiveTab('deals');
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDeal(deal.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:border-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                      삭제
                    </button>
                  </div>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  {deal.items.map((item) => (
                    <li key={`${deal.id}-${item}`}>• {item}</li>
                  ))}
                </ul>

                <div className="mt-4 text-xs text-slate-400">
                  정렬 순서 {deal.sortOrder} · 업데이트 {formatDate(deal.updatedAt)}
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                  Quote inbox
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] text-slate-950">
                  견적 문의 목록
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {quotes.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-slate-300 px-5 py-8 text-sm leading-7 text-slate-500">
                  아직 저장된 견적 문의가 없습니다.
                </div>
              ) : (
                quotes.map((quote) => (
                  <button
                    key={quote.id}
                    type="button"
                    onClick={() => selectQuote(quote)}
                    className={`rounded-[1.5rem] border px-5 py-4 text-left transition-colors ${
                      selectedQuoteId === quote.id
                        ? 'border-blue-300 bg-[#f3f7ff]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-950">{quote.name}</p>
                      <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                        {QUOTE_STATUS_LABELS[quote.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{quote.company}</p>
                    <p className="mt-2 text-sm text-slate-500">{quote.productTitle}</p>
                    <p className="mt-2 text-xs text-slate-400">{formatDate(quote.createdAt)}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            {selectedQuote ? (
              <>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                      Quote detail
                    </p>
                    <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] text-slate-950">
                      {selectedQuote.name} / {selectedQuote.company}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {selectedQuote.productTitle} · {selectedQuote.quantity}
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm leading-6 text-slate-700">
                    <p>접수: {formatDate(selectedQuote.createdAt)}</p>
                    <p>가격 기준: {selectedQuote.priceTier === 'member' ? '회원가' : '일반가'}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">이메일</p>
                    <p className="mt-2 text-sm text-slate-950">{selectedQuote.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500">연락처</p>
                    <p className="mt-2 text-sm text-slate-950">{selectedQuote.phone}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-[#f8fbff] p-5">
                  <p className="text-sm font-semibold text-slate-500">요청 내용</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {selectedQuote.message || '별도 요청 내용 없음'}
                  </p>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-[220px_1fr]">
                  <div>
                    <label className="text-sm font-semibold text-slate-950">진행 상태</label>
                    <select
                      value={quoteStatus}
                      onChange={(event) => setQuoteStatus(event.target.value as QuoteRequestStatus)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                    >
                      {Object.entries(QUOTE_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-950">관리자 메모</label>
                    <textarea
                      rows={5}
                      value={quoteNote}
                      onChange={(event) => setQuoteNote(event.target.value)}
                      placeholder="상담 메모, 발송 일정, 후속 액션을 남깁니다."
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-colors focus:border-blue-700"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleQuoteSave}
                  disabled={submitting}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Save className="h-4 w-4" />
                  {submitting ? '저장 중...' : '상태 저장'}
                </button>
              </>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 px-5 py-16 text-center text-sm leading-7 text-slate-500">
                왼쪽 목록에서 견적 문의를 선택하면 상세 내용을 볼 수 있습니다.
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-10 rounded-[1.5rem] border border-slate-200 bg-[#f8fbff] p-5 text-sm leading-7 text-slate-600">
        관리자 화면에서 수정한 회원몰 번들은 회원몰과 홈의 번들 카드에 바로 반영됩니다.
        견적 문의는 제품 상세 페이지의 문의 폼에서 자동으로 들어오며, 여기서 상태와 메모를 관리할 수 있습니다.
        <span className="ml-2 inline-flex items-center gap-1 font-semibold text-blue-700">
          <ArrowRight className="h-4 w-4" />
          Firestore가 없으면 `.demo-data/admin-store.json` fallback을 사용합니다.
        </span>
      </div>
    </section>
  );
}
