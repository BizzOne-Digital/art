import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { getFaqs, updateSiteData } from "@/lib/data";
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

  await updateSiteData((data) => {
    data.faqs.push(faq);
    return data;
  });

  return NextResponse.json(faq, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const faq = (await req.json()) as FAQ;
  await updateSiteData((data) => {
    const idx = data.faqs.findIndex((f) => f.id === faq.id);
    if (idx !== -1) data.faqs[idx] = faq;
    return data;
  });

  return NextResponse.json(faq);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await updateSiteData((data) => {
    data.faqs = data.faqs.filter((f) => f.id !== id);
    return data;
  });

  return NextResponse.json({ ok: true });
}
