import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionCookieName, hasAdminSession } from '@/lib/admin-auth';
import { updateQuoteRequest } from '@/lib/admin-store';
import type { QuoteRequestStatus } from '@/lib/admin-types';

type QuoteRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

const QUOTE_STATUSES: QuoteRequestStatus[] = [
  'requested',
  'reviewing',
  'quoted',
  'closed',
];

export async function PATCH(request: NextRequest, { params }: QuoteRouteProps) {
  if (!hasAdminSession(request.cookies.get(getAdminSessionCookieName())?.value)) {
    return NextResponse.json(
      {
        ok: false,
        message: '관리자 인증이 필요합니다.',
      },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const payload = (await request.json()) as {
      status?: QuoteRequestStatus;
      adminNote?: string;
    };

    if (!payload.status || !QUOTE_STATUSES.includes(payload.status)) {
      return NextResponse.json(
        {
          ok: false,
          message: '유효한 견적 상태를 선택해야 합니다.',
        },
        { status: 400 },
      );
    }

    const result = await updateQuoteRequest(id, {
      status: payload.status,
      adminNote: payload.adminNote ?? '',
    });

    return NextResponse.json({
      ok: true,
      quote: result.quote,
      storage: result.storage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : '견적 문의를 수정하지 못했습니다.',
      },
      { status: 400 },
    );
  }
}
