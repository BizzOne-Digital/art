import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import checkoutReducer from "./checkout/checkoutSlice";
import checkoutSaga from "./checkout/checkoutSaga";

export function makeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      checkout: checkoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });

  sagaMiddleware.run(checkoutSaga);

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
