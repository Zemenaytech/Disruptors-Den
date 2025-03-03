import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /admin
  if (pathname.startsWith("/admin")) {
    // Get the session token from the request
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If the user is not authenticated, redirect to the login page
    if (!session) {
      const url = new URL("/signIn", request.url);
      // Add the original URL as a query parameter to redirect after login
      return NextResponse.redirect(url);
    }
  }

  // Continue with the request if the user is authenticated or the route is not protected
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all routes starting with /admin
    "/admin/:path*",
    // Exclude Next.js static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
