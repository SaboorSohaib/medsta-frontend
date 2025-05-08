import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import adminReducer from "./slice/adminSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { productApi } from "./api/productApi";
import { productReviewApi } from "./api/productReviewApi";
import { blogApi } from "./api/blogApi";
import { addressApi } from "./api/addressApi";
import { orderApi } from "./api/orderApi";
import { mailApi } from "./api/mailApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    adminReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productReviewApi.reducerPath]: productReviewApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [mailApi.reducerPath]: mailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      userApi.middleware,
      authApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      productReviewApi.middleware,
      blogApi.middleware,
      addressApi.middleware,
      orderApi.middleware,
      mailApi.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
