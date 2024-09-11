"use client";
import React, { useState } from "react";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import Link from "next/link";
import CreateOrUpdateProducts from "../../customComponents/CreateOrUpdateProducts";

const Products = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const { data, isLoading } = useGetProductsQuery({ size: size, page: page });
  const productsData = data?.data || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / size);
  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalItems);
  const router = useRouter();

  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };
  const products = productsData.map((product: any) => ({
    id: product.id,
    product_title: product.product_title,
    product_handle: product?.product_handle,
    product_price: product?.product_price,
    product_type: product?.product_type,
    manufacturing: product.manufacturing,
  }));
  return (
    <main className="h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Prodcuts</h1>
        <CreateOrUpdateProducts isEdit={false} />
      </div>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Product Type</TableHead>
                  <TableHead>Manufacturing</TableHead>
                  {/* <TableHead>status</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsData.map((product: any, idx: number) => (
                  <TableRow
                    key={idx}
                    onClick={() => {
                      router.push(`/admin/products/${product?.id}`);
                    }}
                    className="cursor-pointer"
                  >
                    <TableCell className="w-6">{product?.id}</TableCell>
                    <TableCell className="flex gap-x-2 items-center">
                      <Image
                        src={
                          product?.product_photo
                            ? product?.product_photo
                            : "https://ik.imagekit.io/gbfjo9pxy/images-placeholder_n0ugDVQMO.png?updatedAt=1725805976551"
                        }
                        alt="product photo"
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      {product?.product_title}
                    </TableCell>
                    <TableCell>${product?.product_price}</TableCell>
                    <TableCell>{product?.product_type}</TableCell>
                    <TableCell>{product?.manufacturing}</TableCell>
                    {/* <TableCell>{product?.product_status}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section className="flex flex-col items-center pt-10 gap-y-4 md:hidden">
            <ItemCard isProduct={true} products={products} />
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

export default Products;
