import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPages, savePage } from "@/lib/data";
import type { PageContent } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await getPages());
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = (await req.json()) as PageContent;
  const saved = await savePage(page);
  return NextResponse.json(saved);
}
