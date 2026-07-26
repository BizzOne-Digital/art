import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { getOrders, updateSiteData } from "@/lib/data";
import type { Order } from "@/lib/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getOrders());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const order: Order = {
    id: randomUUID(),
    type: body.type || "contact",
    name: body.name || "",
    email: body.email || "",
    phone: body.phone || "",
    message: body.message || "",
    productId: body.productId,
    productName: body.productName,
    service: body.service,
    preferredDate: body.preferredDate,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  await updateSiteData((data) => {
    data.orders.unshift(order);
    return data;
  });

  return NextResponse.json(order, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();
  await updateSiteData((data) => {
    const idx = data.orders.findIndex((o) => o.id === id);
    if (idx !== -1) data.orders[idx].status = status;
    return data;
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await updateSiteData((data) => {
    data.orders = data.orders.filter((o) => o.id !== id);
    return data;
  });

  return NextResponse.json({ ok: true });
}
