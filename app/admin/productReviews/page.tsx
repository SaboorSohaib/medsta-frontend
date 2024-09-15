"use client";
import React, { useState } from "react";
import { useGetProductReviewQuery } from "@/redux/api/productReviewApi";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import ItemCard from "@/app/customComponents/ItemCard";

const ProductsReview = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const { data, isLoading } = useGetProductReviewQuery({
    size: size,
    page: page,
  });
  const productReviewData = data?.data || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / size);
  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalItems);
  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };
  const productsReview = productReviewData?.map((review: any) => ({
    id: review.id,
    reviewer_name: review.reviewer_name,
    reviewer_email: review.reviewer_email,
    product_title: review.product_id?.product_title,
  }));
  const router = useRouter();
  return (
    <main className="h-full">
      <h1 className="text-xl font-semibold">Product Reviews</h1>
      {isLoading ? (
        <div className="h-full flex justify-center">
          <Spinner size={"medium"} />
        </div>
      ) : (
        <section className="flex flex-col justify-between h-full">
          <section className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Reviewer Name</TableHead>
                  <TableHead>Reviewer Email</TableHead>
                  <TableHead>Product Title</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productReviewData.map((productReview: any, idx: number) => (
                  <TableRow key={idx} className="cursor-pointer">
                    <TableCell className="w-6">{productReview?.id}</TableCell>
                    <TableCell>{productReview?.reviewer_name}</TableCell>
                    <TableCell>{productReview?.reviewer_email}</TableCell>
                    <TableCell>
                      {productReview?.product_id?.product_title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section className="flex flex-col items-center pt-10 gap-y-4 md:hidden">
            <ItemCard isProductReview={true} productsReview={productsReview} />
          </section>
          <section className="flex justify-between items-center border-t pt-2 pb-20">
            <div className="w-full hidden md:block">
              <p>
                Showing items {startItem} to {endItem}
              </p>
            </div>
            <Pagination>
              <PaginationContent>
                <Button
                  className="bg-white text-black hover:bg-white"
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
                  className="bg-white text-black hover:bg-white"
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
          </section>
        </section>
      )}
    </main>
  );
};

export default ProductsReview;
