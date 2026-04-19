import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Only run middleware on admin routes for performance
export const config = {
  matcher: ['/admin/:path*'],
};
