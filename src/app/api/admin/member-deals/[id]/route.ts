import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionCookieName, hasAdminSession } from '@/lib/admin-auth';
import {
  deleteMemberMallDeal,
  updateMemberMallDeal,
} from '@/lib/admin-store';
import type { MemberDealInput } from '@/lib/admin-types';

type MemberDealRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

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

export async function PUT(request: NextRequest, { params }: MemberDealRouteProps) {
  if (!hasAdminSession(request.cookies.get(getAdminSessionCookieName())?.value)) {
    return getUnauthorizedResponse();
  }

  try {
    const { id } = await params;
    const payload = (await request.json()) as Partial<MemberDealInput>;
    const result = await updateMemberMallDeal(id, toMemberDealInput(payload));
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
            : '회원몰 상품을 수정하지 못했습니다.',
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: MemberDealRouteProps,
) {
  if (!hasAdminSession(request.cookies.get(getAdminSessionCookieName())?.value)) {
    return getUnauthorizedResponse();
  }

  const { id } = await params;
  const result = await deleteMemberMallDeal(id);
  revalidatePath('/');
  revalidatePath('/member-mall');

  return NextResponse.json({
    ok: true,
    storage: result.storage,
  });
}
