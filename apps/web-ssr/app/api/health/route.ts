import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET(): Response {
  return NextResponse.json({
    code: 0,
    data: { status: 'ok', timestamp: Date.now() },
    message: 'OK',
  });
}
