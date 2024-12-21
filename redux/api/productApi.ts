import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Product = {
  success: boolean;
  data: [];
};

type ListProducts<T> = {
  page?: number;
  totalItems?: number;
  size?: number;
  data?: T[];
};
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/product',
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ListProducts<Product>,
      { size?: number; page?: number }
    >({
      query: ({ size, page }) =>
        `/get-all-products${size ? `?size=${size}` : ''}${
          page ? `&page=${page}` : ''
        }`,
      providesTags: ['Products'],
    }),
    searchProduct: builder.query({
      query: (query: string) => `/search?query=${query}`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `/${id}`,
    }),
    createProduct: builder.mutation({
      query: ({
        product_title,
        product_price,
        product_photo,
        product_type,
        product_description,
        manufacturing,
        product_handle,
        product_status,
        life,
        in_stock,
        product_before_off_price,
        product_rating,
        category_id,
      }) => {
        return {
          url: '/create-product',
          method: 'POST',
          body: {
            product_title,
            product_price,
            product_photo,
            product_type,
            product_description,
            manufacturing,
            product_handle,
            product_status,
            life,
            in_stock,
            product_before_off_price,
            product_rating,
            category_id,
          },
        };
      },
      invalidatesTags: ['Products'],
    }),
    UpdateProduct: builder.mutation({
      query: ({ id, ...productData }) => {
        return {
          url: `/${id}`,
          method: 'PUT',
          body: {
            ...productData,
          },
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useSearchProductQuery,
} = productApi;
