import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "@/lib/data";
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

  const created = await createOrder(order);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();
  await updateOrderStatus(id, status);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await deleteOrder(id);
  return NextResponse.json({ ok: true });
}
