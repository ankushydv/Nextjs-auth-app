import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //   const path = request.nextUrl.pathname;
  const publicPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (token && publicPaths) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && !publicPaths) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/profile/:path*", "/signup"],
};
