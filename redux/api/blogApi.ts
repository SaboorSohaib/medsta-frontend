import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Blog = {
  success: boolean;
  data: [];
};
type ListBlog<T> = {
  page?: number;
  totalItems?: number;
  size?: number;
  data?: T[];
};

export const blogApi = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`,
    credentials: "include",
  }),
  tagTypes: ["Blogs", "Single blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query<ListBlog<Blog>, { size?: number; page?: number }>({
      query: ({ size, page }) =>
        `/get-all-blogs${size ? `?size=${size}` : ""}${
          page ? `&page=${page}` : ""
        }`,
      providesTags: ["Blogs"],
    }),
    getSingleBlog: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Single blog"],
    }),
    createBlog: builder.mutation({
      query: ({ id, ...blogData }) => {
        return {
          url: `/create-blog`,
          method: "POST",
          body: {
            ...blogData,
          },
        };
      },
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...blogData }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: {
            ...blogData,
          },
        };
      },
      invalidatesTags: ["Single blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useGetSingleBlogQuery,
} = blogApi;
