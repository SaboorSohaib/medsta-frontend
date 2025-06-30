import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({
        first_name,
        last_name,
        email,
        password,
        photo,
        phone_number,
      }) => {
        return {
          url: "/signup",
          method: "POST",
          body: {
            first_name,
            last_name,
            email,
            password,
            photo,
            phone_number,
          },
        };
      },
    }),
    signin: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: "/signin",
          method: "POST",
          body: { email, password },
        };
      },
    }),
    signout: builder.mutation({
      query: () => {
        return {
          url: "/signout",
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation } =
  authApi;
