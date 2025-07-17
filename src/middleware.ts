import { PUBLIC_ROUTES, ROUTES } from "@/config/routes.config";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("_ac_jwt")?.value;

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isAuthenticated = !!token;

  if (isAuthenticated && isPublic) {
    // If logged in and on login/register, redirect to dashboard
    return NextResponse.redirect(new URL(ROUTES.HOME_ROUTE, req.url));
  }

  if (!isAuthenticated && !isPublic) {
    // If not logged in and trying to access private routes, redirect to login
    return NextResponse.redirect(new URL(ROUTES.LOGIN_ROUTE, req.url));
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
