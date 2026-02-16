// app/api/auth/me/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ loggedIn: true });
  } catch (err) {
    return NextResponse.json({ loggedIn: false });
  }
}