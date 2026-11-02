export const DISCOUNT_CODE = "GETFITNOW";
export const DISCOUNT_PERCENT = 10;
export const DISCOUNT_LABEL = `${DISCOUNT_PERCENT}% off every package`;

/** Mongo seed id for Platinum — used for checkout deep links from the header promo. */
export const PLATINUM_PLAN_ID = "plan-3";
export const PLATINUM_FREE_TEE_LABEL = "Free workout t-shirt";

export function isPlatinumPlan(planId?: string, planName?: string): boolean {
  if (planId && planId === PLATINUM_PLAN_ID) return true;
  return /platinum/i.test(planName ?? "");
}

/** Header promo code: applied at checkout when the customer leaves the field empty. */
export function resolveCheckoutDiscountCode(code?: string): string {
  const trimmed = code?.trim();
  return trimmed ? trimmed : DISCOUNT_CODE;
}

export function checkoutUrlForPlan(planId: string, discountCode?: string): string {
  const code = encodeURIComponent(resolveCheckoutDiscountCode(discountCode));
  return `/checkout?plan=${encodeURIComponent(planId)}&code=${code}`;
}

export function applyPackageDiscount(price: string): string | null {
  const match = price.match(/\$([\d,]+(?:\.\d{2})?)/);
  if (!match) return null;

  const amount = parseFloat(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount)) return null;

  const discounted = amount * (1 - DISCOUNT_PERCENT / 100);
  if (Number.isInteger(discounted)) return `$${discounted}`;
  return `$${discounted.toFixed(2)}`;
}
