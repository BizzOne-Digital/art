import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { getAllProducts, getProducts, updateSiteData } from "@/lib/data";
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
  };

  await updateSiteData((data) => {
    data.products.push(product);
    return data;
  });

  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product = (await req.json()) as Product;
  await updateSiteData((data) => {
    const idx = data.products.findIndex((p) => p.id === product.id);
    if (idx !== -1) data.products[idx] = product;
    return data;
  });

  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await updateSiteData((data) => {
    data.products = data.products.filter((p) => p.id !== id);
    return data;
  });

  return NextResponse.json({ ok: true });
}
