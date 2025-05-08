"use client";
import React, { useState } from "react";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { User } from "lucide-react";
import HomePageBanner from "../customComponents/HomePageBanner";
import Image from "next/image";
import formatDate from "@/lib/formatDate";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

const Blog = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const { data: blogs, isLoading } = useGetBlogsQuery({
    size: size,
    page: page,
  });
  const blogsData = blogs?.data || [];
  const totalItems = blogs?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / size);
  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="flex flex-col items-center">
      <section className="w-full">
        <HomePageBanner isHome={false} title="Blogs" from="Home" to="Blogs" />
      </section>
      {blogsData?.length < 1 ? (
        <section className="py-20">
          <p className="text-center">Blogs not available</p>
        </section>
      ) : isLoading ? (
        <section className="py-20">
          <Spinner size="medium" />
        </section>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[90%] lg:w-2/3 gap-5 py-20 px-10">
            {blogsData?.map((blog: any, index: number) => (
              <Link
                key={index}
                className="flex flex-col h-full items-center gap-x-5 bg-white shadow-lg border border-gray-200 hover:border-transparent duration-500 p-5 w-full"
                href={`blog/${blog?.id}`}
              >
                <Image
                  src={blog?.blog_photo}
                  alt="blog photo"
                  width={200}
                  height={200}
                />
                <div className="flex flex-col justify-center gap-y-4">
                  <p className="text-2xl font-bold">{blog?.blog_title}</p>
                  <p className="text-gray-400">{blog?.blog_description}</p>
                  <div className="flex gap-x-2">
                    <div className="flex gap-x-1">
                      <User />
                      <p>{blog?.blog_author}</p>
                    </div>
                    -<p>{formatDate(blog?.createdAt)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </section>
          <Pagination className="pb-20">
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
        </>
      )}
    </main>
  );
};

export default Blog;
