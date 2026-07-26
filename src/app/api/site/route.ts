import { NextResponse } from "next/server";
import { getPricing, getServices, getSiteData } from "@/lib/data";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json({
    settings: data.settings,
    pricing: await getPricing(),
    services: await getServices(),
  });
}
