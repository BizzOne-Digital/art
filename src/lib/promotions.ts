export const DISCOUNT_CODE = "GETFITNOW";
export const DISCOUNT_PERCENT = 10;
export const DISCOUNT_LABEL = `${DISCOUNT_PERCENT}% off every package`;

export function applyPackageDiscount(price: string): string | null {
  const match = price.match(/\$([\d,]+(?:\.\d{2})?)/);
  if (!match) return null;

  const amount = parseFloat(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount)) return null;

  const discounted = amount * (1 - DISCOUNT_PERCENT / 100);
  if (Number.isInteger(discounted)) return `$${discounted}`;
  return `$${discounted.toFixed(2)}`;
}
