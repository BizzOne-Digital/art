import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  submitCheckoutFailure,
  submitCheckoutRequest,
  submitCheckoutSuccess,
  type CheckoutState,
} from "./checkoutSlice";

type RootStateWithCheckout = { checkout: CheckoutState };

type CreateSessionResponse = {
  url?: string;
  error?: string;
};

function* createCheckoutSessionWorker() {
  const checkout: CheckoutState = yield select(
    (state: RootStateWithCheckout) => state.checkout
  );

  if (!checkout.plan) {
    yield put(submitCheckoutFailure("Select a package before paying."));
    return;
  }

  const { name, email, phone } = checkout.customer;
  if (!name.trim() || !email.trim()) {
    yield put(submitCheckoutFailure("Name and email are required."));
    return;
  }

  try {
    const response: Response = yield call(fetch, "/api/checkout/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: checkout.plan.id,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        discountCode: checkout.discountCode.trim(),
      }),
    });

    const data: CreateSessionResponse = yield call([response, "json"]);

    if (!response.ok || !data.url) {
      yield put(
        submitCheckoutFailure(data.error || "Unable to start checkout.")
      );
      return;
    }

    yield put(submitCheckoutSuccess());
    window.location.href = data.url;
  } catch {
    yield put(
      submitCheckoutFailure("Network error. Please try again in a moment.")
    );
  }
}

export function* checkoutSaga() {
  yield takeLatest(submitCheckoutRequest.type, createCheckoutSessionWorker);
}

export default checkoutSaga;
