// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });

  // Clear the cookie
  response.cookies.delete("admin_token", {
    path: "/",
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}