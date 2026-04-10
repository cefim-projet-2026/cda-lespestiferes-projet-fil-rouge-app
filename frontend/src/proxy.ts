import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = request.cookies.get("user_role")?.value;

  if (pathname.startsWith("/rp") && userRole && userRole !== "RP") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname.startsWith("/formateur") &&
    userRole &&
    userRole !== "FORMATEUR" &&
    userRole !== "RP"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname.startsWith("/eleve") &&
    userRole &&
    userRole !== "ELEVE" &&
    userRole !== "RP"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
