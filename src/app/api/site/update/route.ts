import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getPricing,
  getServices,
  getSettings,
  replacePricing,
  replaceServices,
  updateSettings,
} from "@/lib/data";
import type { PricingPlan, Service } from "@/lib/types";

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (body.settings) {
    await updateSettings(body.settings);
  }
  if (body.pricing) {
    await replacePricing(body.pricing as PricingPlan[]);
  }
  if (body.services) {
    await replaceServices(body.services as Service[]);
  }

  return NextResponse.json({
    settings: await getSettings(),
    pricing: await getPricing(),
    services: await getServices(),
  });
}
