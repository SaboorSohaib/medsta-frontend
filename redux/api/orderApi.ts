import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
    credentials: "include",
  }),
  tagTypes: ["GetAllOrders"],

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ ...orderData }) => {
        return {
          url: "/create-order",
          method: "POST",
          body: { ...orderData },
        };
      },
    }),
    getAllOrders: builder.query<any, { size: number; page: number }>({
      query: ({ size, page }) =>
        `get-all-orders${size ? `?size=${size}` : ""}${
          page ? `&page=${page}` : ""
        }`,
      providesTags: ["GetAllOrders"],
    }),
    getOrderCountByEmail: builder.query<any, { email: string }>({
      query: (email) => `/getOrderByCountEmail/${email}`,
    }),
    getOrdersByEmail: builder.query<
      any,
      { email: string; size: number; page: number }
    >({
      query: ({ email, size, page }) =>
        `/getOrderByEmail/${email}${size ? `?size=${size}` : ""}${
          page ? `&page=${page}` : ""
        }`,
    }),
    getOrderCalculation: builder.query({
      query: () => "/getOrderCalculation",
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...orderData }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: { ...orderData },
        };
      },
      invalidatesTags: ["GetAllOrders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderCountByEmailQuery,
  useGetOrdersByEmailQuery,
  useGetAllOrdersQuery,
  useGetOrderCalculationQuery,
  useUpdateOrderMutation,
} = orderApi;
