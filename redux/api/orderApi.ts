import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/order',
    credentials: 'include',
  }),
  tagTypes: ['GetAllOrders'],

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ ...orderData }) => {
        return {
          url: '/create-order',
          method: 'POST',
          body: { ...orderData },
        };
      },
    }),
    getAllOrders: builder.query<any, { size: number; page: number }>({
      query: ({ size, page }) =>
        `get-all-orders${size ? `?size=${size}` : ''}${
          page ? `&page=${page}` : ''
        }`,
      providesTags: ['GetAllOrders'],
    }),
    getOrderCountByEmail: builder.query<any, { email: string }>({
      query: (email) => `/getOrderByCountEmail/${email}`,
    }),
    getOrdersByEmail: builder.query<
      any,
      { email: string; size: number; page: number }
    >({
      query: ({ email, size, page }) =>
        `/getOrderByEmail/${email}${size ? `?size=${size}` : ''}${
          page ? `&page=${page}` : ''
        }`,
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...orderData }) => {
        return {
          url: `/${id}`,
          method: 'PUT',
          body: { ...orderData },
        };
      },
      invalidatesTags: ['GetAllOrders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderCountByEmailQuery,
  useGetOrdersByEmailQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} = orderApi;
