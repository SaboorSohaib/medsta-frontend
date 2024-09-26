"use client";
import React, { useState } from "react";
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
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import CreateOrUpdateBlog from "../../customComponents/CreateOrUpdateBlog";
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

const Blogs = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const { data, isLoading } = useGetBlogsQuery({ size: size, page: page });
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / size);
  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalItems);
  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };
  const blogs = data?.data?.map((blog: any) => ({
    id: blog.id,
    blog_title: blog.blog_title,
    blog_author: blog.blog_author,
    category: blog.category_id?.category_name,
  }));
  const router = useRouter();
  return (
    <main className="h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Blogs</h1>
        <CreateOrUpdateBlog isEdit={false} />
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
                  <TableHead className="w-6">Id</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((blog: any, idx: number) => (
                  <TableRow key={idx} className="cursor-pointer">
                    <TableCell>{blog?.id}</TableCell>
                    <TableCell>{blog?.blog_title}</TableCell>
                    <TableCell>{blog?.blog_description}</TableCell>
                    <TableCell>{blog?.blog_author}</TableCell>
                    <TableCell>{blog?.category_id?.category_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section className="flex flex-col items-center pt-10 gap-y-4 md:hidden">
            <ItemCard isBlog={true} blogs={blogs} />
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

export default Blogs;
