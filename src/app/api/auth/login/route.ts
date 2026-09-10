import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_PASS,
  ADMIN_USER,
  createToken,
  setAuthCookie,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body as {
    username?: string;
    password?: string;
  };

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = await createToken(username);
    await setAuthCookie(token);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
