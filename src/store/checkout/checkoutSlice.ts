import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PricingPlan } from "@/lib/types";
import {
  computeCheckoutTotals,
  parsePriceToCents,
  type CheckoutTotals,
} from "@/lib/checkout";
import { resolveCheckoutDiscountCode } from "@/lib/promotions";

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone: string;
};

export type CheckoutState = {
  plan: PricingPlan | null;
  customer: CheckoutCustomer;
  discountCode: string;
  totals: CheckoutTotals | null;
  submitting: boolean;
  error: string | null;
};

const initialCustomer: CheckoutCustomer = {
  name: "",
  email: "",
  phone: "",
};

const initialState: CheckoutState = {
  plan: null,
  customer: initialCustomer,
  discountCode: "",
  totals: null,
  submitting: false,
  error: null,
};

function buildTotals(plan: PricingPlan | null, discountCode: string) {
  if (!plan) return null;
  const baseCents = parsePriceToCents(plan.price);
  if (baseCents == null) return null;
  return computeCheckoutTotals(baseCents, discountCode, plan.id, plan.name);
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    initializeCheckout(
      state,
      action: PayloadAction<{ plan: PricingPlan; discountCode?: string }>
    ) {
      state.plan = action.payload.plan;
      state.discountCode = resolveCheckoutDiscountCode(
        action.payload.discountCode
      );
      state.error = null;
      state.totals = buildTotals(state.plan, state.discountCode);
    },
    setCustomerField(
      state,
      action: PayloadAction<{ field: keyof CheckoutCustomer; value: string }>
    ) {
      state.customer[action.payload.field] = action.payload.value;
    },
    setDiscountCode(state, action: PayloadAction<string>) {
      state.discountCode = action.payload;
      state.totals = buildTotals(state.plan, state.discountCode);
    },
    submitCheckoutRequest(state) {
      state.submitting = true;
      state.error = null;
    },
    submitCheckoutSuccess(state) {
      state.submitting = false;
    },
    submitCheckoutFailure(state, action: PayloadAction<string>) {
      state.submitting = false;
      state.error = action.payload;
    },
    resetCheckout() {
      return initialState;
    },
  },
});

export const {
  initializeCheckout,
  setCustomerField,
  setDiscountCode,
  submitCheckoutRequest,
  submitCheckoutSuccess,
  submitCheckoutFailure,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
