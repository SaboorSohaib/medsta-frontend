import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Category = {
  success: boolean;
  data: [];
};

type ListCategory<T> = {
  page?: number;
  totalItems?: number;
  size?: number;
  data?: T[];
};
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    credentials: "include",
  }),
  tagTypes: ["categories", "singleCategory"],
  endpoints: (builder) => ({
    getCategories: builder.query<
      ListCategory<Category>,
      { size?: number; page?: number }
    >({
      query: ({ size, page }) =>
        `/get-all-categories${size ? `?size=${size}` : ""}${
          page ? `&page=${page}` : ""
        }`,
      providesTags: ["categories"],
    }),
    getSingleCategory: builder.query({
      query: (id: string) => `/${id}`,
      providesTags: ["singleCategory"],
    }),
    getTopCategory: builder.query({
      query: () => `/get-top-categories`,
    }),
    createCategory: builder.mutation({
      query: ({ category_name, category_handle, category_photo }) => {
        return {
          url: "/create-category",
          method: "POST",
          body: {
            category_name,
            category_handle,
            category_photo,
          },
        };
      },
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...categorData }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: { ...categorData },
        };
      },
      invalidatesTags: ["singleCategory"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useGetTopCategoryQuery,
} = categoryApi;
