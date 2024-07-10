import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedPaths = ['/profile','/calendar','/charts','/forms','/login','/pages','/tables','/allmyprojects','/buyerDashboard','/publisherDashboard'];
  const authPaths = ['/signin', '/signup'];


  const token = request.cookies.get('login_access_token');

    if (protectedPaths.includes(path) && !token) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (authPaths.includes(path) && token) {
      return NextResponse.redirect(new URL('/buyerDashboard', request.nextUrl));
    }


  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile','/signin', '/signup','/auth','/calendar','/charts','/forms','/login','/pages','/tables','/allmyprojects','/buyerDashboard','/publisherDashboard']
};
