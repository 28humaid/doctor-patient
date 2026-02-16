// proxy.js 
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin") {
    const token = request.cookies.get("admin_token")?.value;

    if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.redirect(
          new URL("/admin/prescriptions", request.url)  
        );
      } catch (err) {
        const response = NextResponse.next();
        response.cookies.delete("admin_token");
        return response;
      }
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    console.log("No token → redirect to /admin");
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    console.log("Invalid token → redirect + clear cookie");
    const response = NextResponse.redirect(new URL("/admin", request.url));
    response.cookies.delete("admin_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};