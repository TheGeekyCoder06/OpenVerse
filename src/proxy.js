// src/proxy.js (Next.js 16 replacement for middleware.js)
import { NextResponse } from "next/server";

export function proxy(req) {
  const userEmail = req.cookies.get("userEmail")?.value;

  const protectedRoutes = ["/profile", "/write"];

  // Protect these routes
  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!userEmail) {
      const loginUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// ✅ Equivalent of `export const config` for middleware
export const config = {
  matcher: ["/profile/:path*", "/write/:path*"],
};
