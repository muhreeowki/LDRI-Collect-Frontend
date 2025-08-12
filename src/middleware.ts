import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedUserRoutes = ['/dashboard', '/delegates'];
const protectedAdminRoutes = ['/admin'];
const logicRoutes = ['/onboarding/success'];
const publicRoutes = ['/login', '/onboarding', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  console.log(path);
  const isProtectedUserRoute = protectedUserRoutes.includes(path);
  const isProtectedAdminRoute = protectedAdminRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const token = (await cookies()).get('accessToken')?.value;
  const isAdmin = (await cookies()).get('isAdmin')?.value === 'true';
  const success = (await cookies()).get('ldriSuccess')?.value === 'true';

  // 4. Redirect logged in users to dashboard or admin, otherwise redirect to login
  if ((isProtectedUserRoute || isProtectedAdminRoute) && token) {
    if (isAdmin && !req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    } else if (!isAdmin && !req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  } else if ((isProtectedUserRoute || isProtectedAdminRoute) && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  } else if (isPublicRoute && token) {
    // Redirect logged in users from public routes to their respective dashboards
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    } else {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }
  // 5. Make sure success page is only accessible if success cookie is set
  if (logicRoutes.includes(path) && !success) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  // 6. Allow public routes to be accessed without authentication
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/', '/login', '/onboarding', '/dashboard/:path*', '/admin/:path*'],
};
