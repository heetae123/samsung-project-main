import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionCookieName, hasAdminSession } from '@/lib/admin-auth';
import { createMemberMallDeal, getMemberMallDeals } from '@/lib/admin-store';
import type { MemberDealInput } from '@/lib/admin-types';

function getUnauthorizedResponse() {
  return NextResponse.json(
    {
      ok: false,
      message: '관리자 인증이 필요합니다.',
    },
    { status: 401 },
  );
}

function toMemberDealInput(payload: Partial<MemberDealInput>) {
  return {
    badge: String(payload.badge ?? ''),
    title: String(payload.title ?? ''),
    regularPrice: String(payload.regularPrice ?? ''),
    memberPrice: String(payload.memberPrice ?? ''),
    note: String(payload.note ?? ''),
    items: Array.isArray(payload.items)
      ? payload.items.map((item) => String(item))
      : [],
    sortOrder: Number(payload.sortOrder ?? 0),
  } satisfies MemberDealInput;
}

export async function GET(request: NextRequest) {
  if (!hasAdminSession(request.cookies.get(getAdminSessionCookieName())?.value)) {
    return getUnauthorizedResponse();
  }

  const deals = await getMemberMallDeals();
  return NextResponse.json({ ok: true, deals });
}

export async function POST(request: NextRequest) {
  if (!hasAdminSession(request.cookies.get(getAdminSessionCookieName())?.value)) {
    return getUnauthorizedResponse();
  }

  try {
    const payload = (await request.json()) as Partial<MemberDealInput>;
    const result = await createMemberMallDeal(toMemberDealInput(payload));
    revalidatePath('/');
    revalidatePath('/member-mall');

    return NextResponse.json({
      ok: true,
      deal: result.deal,
      storage: result.storage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : '회원몰 상품을 저장하지 못했습니다.',
      },
      { status: 400 },
    );
  }
}
