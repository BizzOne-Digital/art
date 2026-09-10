import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  updateProduct,
} from "@/lib/data";
import type { Product } from "@/lib/types";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "1";
  if (all) {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(await getAllProducts());
  }
  return NextResponse.json(await getProducts());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const product: Product = {
    id: randomUUID(),
    name: body.name || "New Product",
    description: body.description || "",
    category: body.category || "General",
    image: body.image || "",
    featured: !!body.featured,
    active: body.active !== false,
    externalUrl: body.externalUrl || "",
    ctaLabel: body.ctaLabel || "",
  };

  const created = await createProduct(product);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product = (await req.json()) as Product;
  const updated = await updateProduct(product);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
