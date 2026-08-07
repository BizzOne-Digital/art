import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGallery,
  updateGalleryItem,
} from "@/lib/data";
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

  const created = await createGalleryItem(item);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = (await req.json()) as GalleryItem;
  const updated = await updateGalleryItem(item);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await deleteGalleryItem(id);
  return NextResponse.json({ ok: true });
}
