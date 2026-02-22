// lib/auth.js
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';           // App Router → server components / route handlers
import { redirect } from 'next/navigation';

// Make sure this is set in .env.local (and .env.production)
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

/**
 * Verifies the admin JWT token from cookies
 * @returns {Promise<{ id?: string, email?: string, name?: string } | null>} decoded payload or null
 */
export async function verifyAdminToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // // Optional: you can add more checks (e.g. role, expiration already checked by jwt.verify)
    return {
      // id: decoded.id,        
      email: decoded.email,
      // name: decoded.name,
    };
  } catch (error) {
    console.error("Admin token verification failed:", error.message);
    return null;
  }
}
