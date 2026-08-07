import { NextResponse } from "next/server";
import { getPricing, getServices, getSettings } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    settings: await getSettings(),
    pricing: await getPricing(),
    services: await getServices(),
  });
}
