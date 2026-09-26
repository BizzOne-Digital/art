import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "ebfp_admin_token";
const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "elite-body-fitness-pros-admin-secret-2026"
);

export const ADMIN_USER = process.env.ADMIN_USER || "admin";
export const ADMIN_PASS = process.env.ADMIN_PASS || "elite2026";

export async function createToken(username: string): Promise<string> {
  return new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

export async function requireAuth(): Promise<boolean> {
  return isAuthenticated();
}
