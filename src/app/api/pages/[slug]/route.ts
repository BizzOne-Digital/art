import { NextRequest, NextResponse } from "next/server";
import { getPage } from "@/lib/data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(page);
}
