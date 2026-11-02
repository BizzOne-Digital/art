import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getPricing } from "@/lib/data";
import {
  CHECKOUT_TAX_LABEL,
  computeCheckoutTotals,
  parsePriceToCents,
} from "@/lib/checkout";
import {
  PLATINUM_FREE_TEE_LABEL,
  resolveCheckoutDiscountCode,
} from "@/lib/promotions";
import { getAppBaseUrl, getStripe } from "@/lib/stripe";

type CreateSessionBody = {
  planId?: string;
  name?: string;
  email?: string;
  phone?: string;
  discountCode?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateSessionBody;
    const planId = body.planId?.trim();
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const discountCode = body.discountCode?.trim() ?? "";

    if (!planId || !name || !email) {
      return NextResponse.json(
        { error: "Package, name, and email are required." },
        { status: 400 }
      );
    }

    const plans = await getPricing();
    const plan = plans.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: "Package not found." }, { status: 404 });
    }

    const baseCents = parsePriceToCents(plan.price);
    if (baseCents == null) {
      return NextResponse.json(
        { error: "Invalid package price." },
        { status: 400 }
      );
    }

    const resolvedDiscountCode = resolveCheckoutDiscountCode(discountCode);

    const totals = computeCheckoutTotals(
      baseCents,
      resolvedDiscountCode,
      plan.id,
      plan.name
    );
    const stripe = getStripe();
    const baseUrl = getAppBaseUrl();

    const packageDescription = totals.freeTeeIncluded
      ? `${plan.description} Includes ${PLATINUM_FREE_TEE_LABEL}.`
      : plan.description;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: totals.subtotalCents,
          product_data: {
            name: plan.name,
            description: packageDescription,
          },
        },
      },
    ];

    if (totals.taxCents > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: totals.taxCents,
          product_data: {
            name: CHECKOUT_TAX_LABEL,
          },
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel?plan=${encodeURIComponent(plan.id)}`,
      metadata: {
        planId: plan.id,
        planName: plan.name,
        customerName: name,
        customerPhone: phone,
        discountCode: resolvedDiscountCode,
        discountPercent: String(totals.discountPercent),
        freeTeeIncluded: totals.freeTeeIncluded ? "true" : "false",
        taxRate: "8.75",
        subtotalCents: String(totals.subtotalCents),
        taxCents: String(totals.taxCents),
        totalCents: String(totals.totalCents),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("create-session", error);
    const message =
      error instanceof Error ? error.message : "Checkout could not be started.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
