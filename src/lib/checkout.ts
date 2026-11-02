import {
  DISCOUNT_CODE,
  DISCOUNT_PERCENT,
  isPlatinumPlan,
  resolveCheckoutDiscountCode,
} from "@/lib/promotions";

/** Sales tax rate applied at checkout (8.75%). */
export const CHECKOUT_TAX_RATE = 0.0875;
export const CHECKOUT_TAX_LABEL = "Sales tax (8.75%)";

export function parsePriceToCents(price: string): number | null {
  const match = price.match(/\$([\d,]+(?:\.\d{2})?)/);
  if (!match) return null;
  const amount = parseFloat(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return Math.round(amount * 100);
}

export function normalizeDiscountCode(code: string): string {
  return code.trim().toUpperCase();
}

export function isValidDiscountCode(code: string): boolean {
  return normalizeDiscountCode(code) === DISCOUNT_CODE;
}

export function getDiscountPercentForCode(code: string): number {
  return isValidDiscountCode(code) ? DISCOUNT_PERCENT : 0;
}

export type CheckoutTotals = {
  baseCents: number;
  discountCents: number;
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  discountPercent: number;
  discountCodeApplied: string;
  freeTeeIncluded: boolean;
};

export function computeCheckoutTotals(
  baseCents: number,
  discountCode?: string,
  planId?: string,
  planName?: string
): CheckoutTotals {
  const discountCodeApplied = resolveCheckoutDiscountCode(discountCode);
  const discountPercent = getDiscountPercentForCode(discountCodeApplied);
  const discountCents =
    discountPercent > 0
      ? Math.round(baseCents * (discountPercent / 100))
      : 0;
  const subtotalCents = baseCents - discountCents;
  const taxCents = Math.round(subtotalCents * CHECKOUT_TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  return {
    baseCents,
    discountCents,
    subtotalCents,
    taxCents,
    totalCents,
    discountPercent,
    discountCodeApplied,
    freeTeeIncluded: isPlatinumPlan(planId, planName),
  };
}

export function formatUsdFromCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
