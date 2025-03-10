import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session token
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protect /admin/* pages and /api/admin/*
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!session) {
      const url = new URL("/signIn", request.url);
      url.searchParams.set("callbackUrl", request.url); // Redirect back after login
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Middleware will run on /admin/* (client pages) and /api/admin/* (API routes)
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
