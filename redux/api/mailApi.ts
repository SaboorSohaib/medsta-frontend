import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mailApi = createApi({
  reducerPath: "mailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/mail`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: ({ ...data }) => {
        return {
          url: "/contact",
          method: "POST",
          body: { ...data },
        };
      },
    }),
  }),
});

export const { useSubmitContactFormMutation } = mailApi;
