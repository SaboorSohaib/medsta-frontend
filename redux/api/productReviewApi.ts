import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ProductReview = {
  success: boolean;
  data: [];
};

type ListProductReviews<T> = {
  page?: number;
  totalItems?: number;
  size?: number;
  data?: T[];
};

export const productReviewApi = createApi({
  reducerPath: "productReviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-review`,
    credentials: "include",
  }),
  tagTypes: [
    "Product Reviews",
    "Single Product Review",
    "Review By Product Id",
  ],
  endpoints: (builder) => ({
    getProductReview: builder.query<
      ListProductReviews<ProductReview>,
      { size?: number; page?: number }
    >({
      query: ({ size, page }) =>
        `/get-all-products-review${size ? `?size=${size}` : ""}${
          page ? `&page=${page}` : ""
        }`,
      providesTags: ["Product Reviews"],
    }),
    getReviewsByProductId: builder.query<
      ListProductReviews<ProductReview>,
      { id: string; size?: number; page?: number }
    >({
      query: ({ id, size, page }) =>
        `/${id}${size ? `?size=${size}` : ""}${page ? `&page=${page}` : ""}`,
      providesTags: ["Review By Product Id"],
    }),
    getSingleProductReview: builder.query({
      query: (id: string) => `/${id}`,
      providesTags: ["Single Product Review"],
    }),
    crateProductReview: builder.mutation({
      query: ({ ...ReviewData }) => {
        return {
          url: "create-product-review",
          method: "POST",
          body: {
            ...ReviewData,
          },
        };
      },
      invalidatesTags: ["Product Reviews", "Review By Product Id"],
    }),
  }),
});

export const {
  useGetProductReviewQuery,
  useGetSingleProductReviewQuery,
  useCrateProductReviewMutation,
  useGetReviewsByProductIdQuery,
} = productReviewApi;
