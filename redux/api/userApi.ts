import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  success: boolean;
  data: [];
};

type ListUsers<T> = {
  page?: number;
  totalItems?: number;
  size?: number;
  data?: T[];
};

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<ListUsers<User>, { size?: number; page?: number }>({
      query: ({ size, page }) =>
        `/get-all-users${size ? `?size=${size}` : ""}${
          page ? `&page=${page}` : ""
        }`,
    }),
    getUserById: builder.query<any, { id: string }>({
      query: ({ id }) => `/${id}`,
    }),
    getCurrentUser: builder.query({
      query: () => "/me",
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: { ...userData },
        };
      },
    }),
    updateUserPassword: builder.mutation({
      query: ({ id, ...passwordData }) => {
        return {
          url: `/update-password/${id}`,
          method: "PUT",
          body: { ...passwordData },
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} = userApi;
