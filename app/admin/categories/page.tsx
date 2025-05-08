"use client";
import React, { useState } from "react";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import CreateOrUpdateCategory from "@/app/customComponents/CreateOrUpdateCategory";
import { Button } from "@/components/ui/button";
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
import ItemCard from "@/app/customComponents/ItemCard";

const Categories = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const { data, isLoading } = useGetCategoriesQuery({ size: 10, page: page });
  const categoriesData = Array.isArray(data?.data) ? data.data : [];
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / size);
  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalItems);

  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };
  const router = useRouter();

  const categories = categoriesData.map((category: any) => ({
    id: category.id,
    category_name: category?.category_name,
    category_handle: category?.category_handle,
  }));
  return (
    <main className="h-full pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Categories</h1>
        <CreateOrUpdateCategory isEdit={false} categoryData={categoriesData} />
      </div>
      {categoriesData.length < 1 ? (
        <section className="flex justify-center items-center h-full">
          <p className="text-2xl">Categories not available</p>
        </section>
      ) : isLoading ? (
        <div className="flex justify-center h-full">
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
                  <TableHead>Handle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriesData.map((category: any, idx: number) => (
                  <TableRow
                    key={idx}
                    onClick={() => {
                      router.push(`/admin/categories/${category?.id}`);
                    }}
                    className="cursor-pointer"
                  >
                    <TableCell>{category?.id}</TableCell>

                    <TableCell className="flex items-center gap-x-2">
                      <Image
                        src={
                          category?.category_photo
                            ? category?.category_photo
                            : "https://ik.imagekit.io/gbfjo9pxy/images-placeholder_n0ugDVQMO.png?updatedAt=1725805976551"
                        }
                        width={50}
                        height={50}
                        className="rounded-lg"
                        alt="category image"
                      />
                      {category?.category_name}
                    </TableCell>
                    <TableCell>{category?.category_handle}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section className="flex flex-col items-center pt-10 gap-y-4 md:hidden">
            <ItemCard isCategories={true} categories={categories} />
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
          </section>
        </section>
      )}
    </main>
  );
};

export default Categories;
