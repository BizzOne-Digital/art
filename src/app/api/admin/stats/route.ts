import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSiteData } from "@/lib/data";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json({
    pages: data.pages.map((p) => ({
      slug: p.slug,
      name: p.name,
      sectionCount: p.sections.length,
    })),
    products: data.products.length,
    gallery: data.gallery.length,
    faqs: data.faqs.length,
    orders: data.orders.length,
    newOrders: data.orders.filter((o) => o.status === "new").length,
    authenticated: await isAuthenticated(),
  });
}
