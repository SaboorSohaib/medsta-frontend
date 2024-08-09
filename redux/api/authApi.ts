import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/',
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
        role,
      }) => {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: {
            first_name,
            last_name,
            email,
            password,
            photo,
            phone_number,
            role,
          },
        };
      },
    }),
    signin: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: 'auth/signin',
          method: 'POST',
          body: { email, password },
        };
      },
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
