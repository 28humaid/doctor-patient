// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// const protectedPrefixes = ["/admin/medicine", "/admin/prescriptions", "/admin/case-study"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip protection for /admin itself (login page)
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // Only protect admin sub-routes
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    console.log("TOKEN NOT FOUND! REDIRECTING BACK TO /admin")
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    // Token is valid → continue
    return NextResponse.next();
  } catch (err) {
    // Invalid/expired token → redirect to login + clear cookie
    console.log("INVALID TOKEN! REDIRECTING BACK TO /admin")
    const response = NextResponse.redirect(new URL("/admin", request.url));
    response.cookies.delete("admin_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],   // protects /admin and everything under it — logic above skips /admin
};