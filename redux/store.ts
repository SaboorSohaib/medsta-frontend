import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    counterReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware, authApi.middleware]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
