import { computeCheckoutTotals, parsePriceToCents } from "../src/lib/checkout";
import {
  PLATINUM_PLAN_ID,
  resolveCheckoutDiscountCode,
} from "../src/lib/promotions";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

const eliteBase = parsePriceToCents("$199");
assert(eliteBase === 19900, "elite base cents");

const eliteTotals = computeCheckoutTotals(
  eliteBase!,
  resolveCheckoutDiscountCode(""),
  "plan-2",
  "Elite Package"
);
assert(eliteTotals.discountCents === 1990, "10% discount");
assert(eliteTotals.subtotalCents === 17910, "subtotal after discount");
assert(eliteTotals.taxCents === Math.round(17910 * 0.0875), "tax 8.75%");
assert(eliteTotals.discountCodeApplied === "GETFITNOW", "auto code");
assert(!eliteTotals.freeTeeIncluded, "elite no tee");

const platinumTotals = computeCheckoutTotals(
  parsePriceToCents("$299")!,
  resolveCheckoutDiscountCode("GETFITNOW"),
  PLATINUM_PLAN_ID,
  "Platinum Package"
);
assert(platinumTotals.freeTeeIncluded, "platinum free tee flag");

console.log("checkout math OK", {
  eliteTotal: eliteTotals.totalCents / 100,
  platinumTotal: platinumTotals.totalCents / 100,
});
