import { NextResponse } from 'next/server';

import { saveQuoteRequest } from '@/lib/admin-store';
import type { QuoteRequestPayload } from '@/lib/member-types';

function isValidQuotePayload(payload: Partial<QuoteRequestPayload>) {
  return Boolean(
    payload.productSlug &&
      payload.productTitle &&
      payload.priceTier &&
      payload.name &&
      payload.email &&
      payload.phone &&
      payload.company &&
      payload.quantity,
  );
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<QuoteRequestPayload>;

  if (!isValidQuotePayload(payload)) {
    return NextResponse.json(
      {
        ok: false,
        message: '필수 항목이 누락되었습니다.',
      },
      { status: 400 },
    );
  }

  const quoteDocument = {
    ...payload,
  };
  const result = await saveQuoteRequest(quoteDocument as QuoteRequestPayload);

  return NextResponse.json({
    ok: true,
    storage: result.storage,
  });
}
