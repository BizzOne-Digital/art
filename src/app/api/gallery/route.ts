import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { getGallery, updateSiteData } from "@/lib/data";
import type { GalleryItem } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await getGallery());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const item: GalleryItem = {
    id: randomUUID(),
    title: body.title || "Gallery Image",
    category: body.category || "Training",
    image: body.image || "",
  };

  await updateSiteData((data) => {
    data.gallery.push(item);
    return data;
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = (await req.json()) as GalleryItem;
  await updateSiteData((data) => {
    const idx = data.gallery.findIndex((g) => g.id === item.id);
    if (idx !== -1) data.gallery[idx] = item;
    return data;
  });

  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await updateSiteData((data) => {
    data.gallery = data.gallery.filter((g) => g.id !== id);
    return data;
  });

  return NextResponse.json({ ok: true });
}
