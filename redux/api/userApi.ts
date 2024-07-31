import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  success: boolean;
  data: [];
};

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User, null>({
      query: () => "user/all-users",
    }),
    getUserById: builder.query<any, { id: string }>({
      query: ({ id }) => `user/${id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
