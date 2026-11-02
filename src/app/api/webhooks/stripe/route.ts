import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createOrder } from "@/lib/data";
import { getStripe } from "@/lib/stripe";
import { DISCOUNT_CODE, PLATINUM_FREE_TEE_LABEL } from "@/lib/promotions";
import type Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured." },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  const payload = await req.text();

  try {
    event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("stripe webhook verify", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};
    const paid = ((session.amount_total ?? 0) / 100).toFixed(2);
    const notes: string[] = [`Paid $${paid} USD via Stripe.`];

    if (metadata.discountCode) {
      notes.push(`Discount code: ${metadata.discountCode}.`);
    } else {
      notes.push(`Discount code: ${DISCOUNT_CODE} (auto-applied).`);
    }

    if (metadata.freeTeeIncluded === "true") {
      notes.push(`${PLATINUM_FREE_TEE_LABEL} included with Platinum purchase.`);
    }

    await createOrder({
      id: randomUUID(),
      type: "package_purchase",
      name: metadata.customerName || session.customer_details?.name || "Customer",
      email:
        session.customer_details?.email ||
        session.customer_email ||
        metadata.customerEmail ||
        "",
      phone: metadata.customerPhone || "",
      message: notes.join(" "),
      productId: metadata.planId,
      productName: metadata.planName,
      stripeSessionId: session.id,
      paymentStatus: session.payment_status,
      amountTotalCents: session.amount_total ?? undefined,
      status: "new",
      createdAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ received: true });
}
