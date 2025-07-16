"use client";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";
import formatDate from "@/lib/formatDate";

const Blogs = () => {
  const size = 10;
  const { data, isLoading } = useGetBlogsQuery({ size: size });
  const blogData = data?.data || [];
  const firstBlog = data?.data?.slice(0, 1) || [];
  const secondAndThirdBlog = data?.data?.slice(1, 3);

  return (
    <main className="flex flex-col items-center py-20 gap-10">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-bold text-center">Special News</p>
        <p className="text-gray-400 text-center">
          The latest foodmaker collaboration with Ring food
        </p>
      </div>
      {blogData?.length < 1 ? (
        <>
          <p>Blogs not available</p>
        </>
      ) : isLoading ? (
        <Spinner size="medium" />
      ) : (
        data?.data?.length && (
          <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-10 p-10">
            <div className="w-full">
              {firstBlog?.map((blog: any, index: number) => (
                <article key={index} className="shadow-xl">
                  <Image
                    src={blog?.blog_photo}
                    alt="blog photo"
                    width={600}
                    height={600}
                  />
                  <div className="flex flex-col gap-y-4 bg-blue-900 text-white p-5">
                    <p className="text-2xl font-bold">{blog?.blog_title}</p>
                    <p>{blog?.blog_description}</p>
                    <div className="flex items-center gap-x-4">
                      <Button
                        type="button"
                        className="bg-white text-blue-900 rounded-full hover:bg-white"
                      >
                        Read More
                      </Button>
                      <p>Date: {formatDate(blog?.createdAt)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="flex flex-col gap-y-10 w-full">
              {secondAndThirdBlog?.map((blog: any, index: number) => (
                <article
                  key={index}
                  className="flex flex-col gap-x-5 p-4 items-center sm:flex-row bg-white h-full shadow-lg"
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
                </article>
              ))}
            </div>
          </div>
        )
      )}
    </main>
  );
};

export default Blogs;
