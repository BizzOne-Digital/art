"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { PricingPlan } from "@/lib/types";
import {
  CHECKOUT_TAX_LABEL,
  formatUsdFromCents,
} from "@/lib/checkout";
import { DISCOUNT_CODE, PLATINUM_FREE_TEE_LABEL } from "@/lib/promotions";
import {
  initializeCheckout,
  setCustomerField,
  setDiscountCode,
  submitCheckoutRequest,
} from "@/store/checkout/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type CheckoutFormProps = {
  plan: PricingPlan;
  initialDiscountCode?: string;
};

export function CheckoutForm({ plan, initialDiscountCode }: CheckoutFormProps) {
  const dispatch = useAppDispatch();
  const { customer, discountCode, totals, submitting, error } = useAppSelector(
    (state) => state.checkout
  );

  useEffect(() => {
    dispatch(
      initializeCheckout({ plan, discountCode: initialDiscountCode ?? "" })
    );
  }, [dispatch, plan, initialDiscountCode]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5 sm:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(submitCheckoutRequest());
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--neon)]">
          Your details
        </p>
        <h2 className="heading-md mt-2 text-white">Checkout</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Enter your information, review totals, then continue to secure payment
          with Stripe.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="text-[var(--muted)]">Full name</span>
            <input
              required
              value={customer.name}
              onChange={(e) =>
                dispatch(
                  setCustomerField({ field: "name", value: e.target.value })
                )
              }
              className="mt-2 w-full border border-[var(--line)] bg-[#05070c] px-3 py-2.5 text-white outline-none focus:border-[var(--neon)]"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--muted)]">Email</span>
            <input
              required
              type="email"
              value={customer.email}
              onChange={(e) =>
                dispatch(
                  setCustomerField({ field: "email", value: e.target.value })
                )
              }
              className="mt-2 w-full border border-[var(--line)] bg-[#05070c] px-3 py-2.5 text-white outline-none focus:border-[var(--neon)]"
              autoComplete="email"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--muted)]">Phone (optional)</span>
            <input
              value={customer.phone}
              onChange={(e) =>
                dispatch(
                  setCustomerField({ field: "phone", value: e.target.value })
                )
              }
              className="mt-2 w-full border border-[var(--line)] bg-[#05070c] px-3 py-2.5 text-white outline-none focus:border-[var(--neon)]"
              autoComplete="tel"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--muted)]">
              Discount code (header promo auto-applied)
            </span>
            <input
              value={discountCode}
              onChange={(e) => dispatch(setDiscountCode(e.target.value))}
              placeholder={DISCOUNT_CODE}
              className="mt-2 w-full border border-[var(--line)] bg-[#05070c] px-3 py-2.5 uppercase tracking-[0.12em] text-white outline-none focus:border-[var(--neon)]"
            />
          </label>
        </div>

        {error && (
          <p className="mt-4 border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !totals}
          className="glow-btn mt-6 w-full justify-center whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Redirecting to Stripe…" : "Pay now with Stripe"}
        </button>

        <p className="mt-4 text-center text-xs text-[var(--muted)]">
          <Link href="/pricing" className="text-[var(--neon)] underline">
            Choose a different package
          </Link>
        </p>
      </form>

      <aside className="border border-[var(--neon)] bg-[rgba(0,180,255,0.06)] p-5 sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--neon)]">
          Order summary
        </p>
        <h3 className="font-display mt-2 text-4xl tracking-[0.05em]">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{plan.description}</p>
        <ul className="mt-5 space-y-2 text-sm">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="text-[var(--neon)]">▸</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {totals ? (
          <dl className="mt-8 space-y-2 border-t border-[var(--line)] pt-5 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--muted)]">Package</dt>
              <dd>{formatUsdFromCents(totals.baseCents)}</dd>
            </div>
            {totals.discountCents > 0 && (
              <div className="flex justify-between gap-3 text-[var(--gold)]">
                <dt>
                  Discount ({totals.discountPercent}% · {totals.discountCodeApplied})
                </dt>
                <dd>-{formatUsdFromCents(totals.discountCents)}</dd>
              </div>
            )}
            {totals.freeTeeIncluded && (
              <div className="flex justify-between gap-3 text-[var(--gold)]">
                <dt>Platinum bonus</dt>
                <dd className="text-right">{PLATINUM_FREE_TEE_LABEL} included</dd>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--muted)]">Subtotal</dt>
              <dd>{formatUsdFromCents(totals.subtotalCents)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[var(--muted)]">{CHECKOUT_TAX_LABEL}</dt>
              <dd>{formatUsdFromCents(totals.taxCents)}</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-[var(--line)] pt-3 text-base font-semibold text-white">
              <dt>Total due</dt>
              <dd>{formatUsdFromCents(totals.totalCents)}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-8 text-sm text-red-200">
            This package price could not be calculated. Please contact support.
          </p>
        )}
      </aside>
    </div>
  );
}
