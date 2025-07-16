import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/address`,
    credentials: "include",
  }),
  tagTypes: ["Single Address"],

  endpoints: (builder) => ({
    getUserAddress: builder.query<any, { id: string }>({
      query: (id) => `/user-address/${id}`,
      providesTags: ["Single Address"],
    }),
    createAddress: builder.mutation({
      query: ({ ...addressData }) => {
        return {
          url: "/create-address",
          method: "POST",
          body: { ...addressData },
        };
      },
      invalidatesTags: ["Single Address"],
    }),
    updateUserAddress: builder.mutation({
      query: ({ id, ...addressData }) => {
        return {
          url: `${id}`,
          method: "PUT",
          body: { ...addressData },
        };
      },
    }),
  }),
});

export const {
  useGetUserAddressQuery,
  useUpdateUserAddressMutation,
  useCreateAddressMutation,
} = addressApi;
