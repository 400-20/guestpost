import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // List of paths that need a logged-in user
  const protectedPaths = ['/profile','/calendar','/charts','/forms','/login','/pages','/tables'];
  const token = request.cookies.get('login_access_token');
  
  // Check if the path is one of the protected ones and there is no token
  if (protectedPaths.includes(path) && !token) {
    // Redirect to login if trying to access a protected path without a token
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }
  
  // Allow Next.js to continue processing this request
  return NextResponse.next();
}

// Apply middleware to these paths, including the public ones for uniformity, but with no action on login and signup
export const config = {
  matcher: ['/', '/profile','/signin', '/signup','/auth','/calendar','/charts','/forms','/login','/pages','/tables']
};
