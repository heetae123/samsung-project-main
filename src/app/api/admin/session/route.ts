import { NextResponse } from 'next/server';

import {
  getAdminSessionCookieName,
  getAdminSessionValue,
  verifyAdminPassword,
} from '@/lib/admin-auth';

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    password?: string;
  };

  if (!payload.password || !verifyAdminPassword(payload.password)) {
    return NextResponse.json(
      {
        ok: false,
        message: '관리자 비밀번호가 올바르지 않습니다.',
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: getAdminSessionCookieName(),
    value: getAdminSessionValue(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: getAdminSessionCookieName(),
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
