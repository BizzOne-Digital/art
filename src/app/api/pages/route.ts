import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSiteData, updateSiteData } from "@/lib/data";
import type { PageContent } from "@/lib/types";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json(data.pages);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = (await req.json()) as PageContent;
  const data = await updateSiteData((current) => {
    const idx = current.pages.findIndex((p) => p.slug === page.slug);
    if (idx === -1) {
      current.pages.push(page);
    } else {
      current.pages[idx] = page;
    }
    return current;
  });

  return NextResponse.json(data.pages.find((p) => p.slug === page.slug));
}
