import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
const protectedUserPrefix = "/dashboard";
const protectedAdminPrefix = "/admin";
const publicRoutes = ["/login", "/onboarding", "/"];
const successGateRoutes = ["/onboarding/success"];
// const logoutRoute = "/logout";

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedUserRoute = path.startsWith(protectedUserPrefix);
  const isProtectedAdminRoute = path.startsWith(protectedAdminPrefix);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Read cookies from the request (middleware cannot use next/headers cookies())
  const token = req.cookies.get("accessToken")?.value;
  const isAdmin = req.cookies.get("isAdmin")?.value === "true";
  const success = req.cookies.get("ldriSuccess")?.value === "true";

  // Check for Logout
  // if (path === logoutRoute) {
  //   console.log("logging out");
  //   const response = NextResponse.redirect(new URL("/", req.nextUrl));
  //   response.cookies.delete({ name: "accessToken", path: "/" });
  //   response.cookies.delete({ name: "isAdmin", path: "/" });
  //   response.cookies.delete({ name: "ldriSuccess", path: "/" });
  //   return response;
  // }

  // 4. Redirect logged in users to dashboard or admin, otherwise redirect to login
  if ((isProtectedUserRoute || isProtectedAdminRoute) && token) {
    if (isAdmin && !path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    if (!isAdmin && !path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  } else if ((isProtectedUserRoute || isProtectedAdminRoute) && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  } else if (isPublicRoute && token) {
    // Redirect logged in users from public routes to their respective dashboards
    return NextResponse.redirect(
      new URL(isAdmin ? "/admin" : "/dashboard", req.nextUrl),
    );
  }

  // 5. Make sure success page is only accessible if success cookie is set
  if (successGateRoutes.includes(path) && !success) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 6. Allow public routes to be accessed without authentication
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/",
    "/login",
    "/onboarding",
    "/onboarding/success",
    "/dashboard/:path*",
    "/admin/:path*",
    // "/logout",
  ],
};
