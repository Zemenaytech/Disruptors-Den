import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware triggered for path:", pathname);
  console.log("Cookies:", request.cookies.getAll());

  if (pathname.startsWith("/admin") || pathname.startsWith("/signUp")) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log(session);

    if (!session) {
      const url = new URL("/signIn", request.url);
      url.searchParams.set("callbackUrl", request.url); // Save original page

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/signUp"],
};
