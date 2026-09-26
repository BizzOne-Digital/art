import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { createFaq, deleteFaq, getFaqs, updateFaq } from "@/lib/data";
import type { FAQ } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await getFaqs());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const faq: FAQ = {
    id: randomUUID(),
    question: body.question || "New question?",
    answer: body.answer || "",
    order: Number(body.order) || 99,
  };

  const created = await createFaq(faq);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const faq = (await req.json()) as FAQ;
  const updated = await updateFaq(faq);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await deleteFaq(id);
  return NextResponse.json({ ok: true });
}
