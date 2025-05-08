"use client";
import React, { useState } from "react";
import { useGetProductsQuery } from "@/redux/api/productApi";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

const AllProducts = ({
  title,
  subtitle,
  isHomePage,
}: {
  title?: string;
  subtitle?: string;
  isHomePage?: boolean;
}) => {
  const [page, setPage] = useState(1);
  const size = 8;
  const productPageSize = 20;
  const { data, isLoading } = useGetProductsQuery(
    isHomePage
      ? { size: size, page: page }
      : { size: productPageSize, page: page }
  );
  const productsData = data?.data || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / productPageSize);
  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * productPageSize, totalItems);
  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="flex flex-col items-center justify-center py-20 gap-10">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-bold text-center">{title}</p>
        <p className="text-gray-400 text-center">{subtitle}</p>
      </div>
      {productsData.length < 1 ? (
        <>
          <p>Products not available</p>
        </>
      ) : isLoading ? (
        <Spinner size="medium" />
      ) : (
        productsData?.length && (
          <>
            {isHomePage && (
              <div>
                <Link className="underline" href={"/product"}>
                  View All
                </Link>
              </div>
            )}
            {!isHomePage && (
              <div>
                <p>
                  Showing {startItem} - {endItem} items
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData?.map((product: any, index: number) => (
                <Link href={`/product/${product?.id}`} key={index}>
                  <div className="flex flex-col gap-y-2 items-center justify-evenly h-[300px] w-full p-5 overflow-hidden duration-500 shadow-lg bg-white">
                    <Image
                      src={product?.product_photo}
                      alt="product image"
                      width={50}
                      height={50}
                      className="rounded-full h-24 w-24 border border-black"
                    />
                    <div className="flex flex-col items-center w-full gap-y-2">
                      <p>{product?.product_title}</p>
                      <div className="flex items-center gap-x-2">
                        {product?.product_before_off_price ? (
                          <>
                            <p className="font-bold text-gray-400 line-through">
                              ${product?.product_before_off_price}/KG
                            </p>
                            <p className="text-xl font-bold">
                              ${product?.product_price}/KG
                            </p>
                          </>
                        ) : (
                          <p className="text-xl font-bold">
                            ${product?.product_price}/KG
                          </p>
                        )}
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={
                              star <= product?.rating
                                ? "text-orange-500"
                                : "text-gray-400"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {!isHomePage && (
              <Pagination>
                <PaginationContent>
                  <Button
                    className="bg-gray-100 hover:bg-gray-100 text-black"
                    disabled={page === 1}
                  >
                    <PaginationPrevious
                      className="cursor-pointer"
                      onClick={() => handlePageClick(page - 1)}
                      isActive={page >= 1}
                    />
                  </Button>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className={`cursor-pointer ${
                          page === index + 1 ? `is-active` : ""
                        }`}
                        isActive={page === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <Button
                    className="bg-gray-100 hover:bg-gray-100 text-black"
                    disabled={page === totalPages}
                  >
                    <PaginationNext
                      className="cursor-pointer"
                      onClick={() => handlePageClick(page + 1)}
                      isActive={page <= totalPages}
                    />
                  </Button>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )
      )}
    </main>
  );
};

export default AllProducts;
