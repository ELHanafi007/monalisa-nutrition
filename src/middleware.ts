import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedRoute = path.startsWith('/admin/dashboard');
  const isLoginPage = path === '/admin';

  // Check for the admin session cookie
  const isAdmin = request.cookies.get('admin_session')?.value === 'true';

  // 1. If trying to access dashboard without being logged in -> Redirect to login
  if (isProtectedRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // 2. If already logged in and trying to access login page -> Redirect to dashboard
  if (isLoginPage && isAdmin) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Only run middleware on admin routes for performance
export const config = {
  matcher: ['/admin/:path*'],
};
