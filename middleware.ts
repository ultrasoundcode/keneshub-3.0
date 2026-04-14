import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // ─── Subdomain Detection ───────────────────────────────────────────────────
  // Works for both admin.keneshub.kz (production) and localhost/admin (dev)
  const isAdminSubdomain = hostname.startsWith('admin.');

  // If accessing via admin subdomain, rewrite to /admin/* paths
  if (isAdminSubdomain && !pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone();
    url.pathname = `/admin${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // ─── Admin Route Protection ────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const adminSession = request.cookies.get('admin_session');

    // Allow login page access always
    if (isLoginPage) {
      // If already logged in, redirect to admin dashboard
      if (adminSession?.value === process.env.ADMIN_SESSION_SECRET) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Protect all other /admin routes
    if (!adminSession || adminSession.value !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
