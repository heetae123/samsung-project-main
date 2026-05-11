import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionCookieName, hasAdminSession } from '@/lib/admin-auth';
import { getQuoteRequests } from '@/lib/admin-store';

export async function GET(request: NextRequest) {
  if (!hasAdminSession(request.cookies.get(getAdminSessionCookieName())?.value)) {
    return NextResponse.json(
      {
        ok: false,
        message: '관리자 인증이 필요합니다.',
      },
      { status: 401 },
    );
  }

  const quotes = await getQuoteRequests();

  return NextResponse.json({
    ok: true,
    quotes,
  });
}
