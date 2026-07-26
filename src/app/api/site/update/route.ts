import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateSiteData } from "@/lib/data";
import type { PricingPlan, Service } from "@/lib/types";

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const data = await updateSiteData((current) => {
    if (body.settings) current.settings = { ...current.settings, ...body.settings };
    if (body.pricing) current.pricing = body.pricing as PricingPlan[];
    if (body.services) current.services = body.services as Service[];
    return current;
  });

  return NextResponse.json({
    settings: data.settings,
    pricing: data.pricing,
    services: data.services,
  });
}
