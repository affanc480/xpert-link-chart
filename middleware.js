import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_PAGES = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-otp"];

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/settings",
  "/dashboard/reports",
  "/dashboard/inventory",
  "/dashboard/account-entry",
  "/dashboard/chart-of-account-main",
  "/dashboard/chart-of-account-general",
  "/dashboard/setup",
];

async function verify(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isAuthPage = AUTH_PAGES.includes(pathname);

  if (isAuthPage) {
    if (token && (await verify(token))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const payload = await verify(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("token", "", { expires: new Date(0), path: "/" });
      return response;
    }

    // Admin-only area example — extend this list as needed.
    if (pathname.startsWith("/dashboard/admin") && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
  ],
};
