"use client";
import HomePageBanner from "@/app/customComponents/HomePageBanner";
import Spinner from "@/components/ui/spinner";
import formatDate from "@/lib/formatDate";
import { useGetBlogsQuery, useGetSingleBlogQuery } from "@/redux/api/blogApi";
import { useGetTopCategoryQuery } from "@/redux/api/categoryApi";
import { ArrowRight, Clock3, Facebook } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const BlogDetails = () => {
  const param = useParams();
  const blogId = param?.id;
  const { data, isLoading } = useGetSingleBlogQuery(blogId);
  const { data: Blogs } = useGetBlogsQuery({
    size: 4,
  });
  const { data: categories } = useGetTopCategoryQuery(null);
  return (
    <main className="flex flex-col items-center">
      <section className="w-full">
        <HomePageBanner
          isHome={false}
          title="Blog Details"
          from="Home"
          to="Blog Details"
        />
      </section>
      <section className="flex flex-col items-center gap-y-4 justify-center w-full lg:flex-row lg:gap-x-4 py-20 px-10">
        {isLoading ? (
          <section className="h-[500px] flex justify-center">
            <Spinner size="medium" />
          </section>
        ) : (
          <>
            <section className="py-10 md:py-20 h-full w-1/2">
              <Image
                src={data?.data?.blog_photo}
                alt="blog photo"
                width={500}
                height={500}
                className="h-full w-full"
              />
              <article className="flex flex-col justify-between py-8 md:flex-row">
                <p className="text-gray-400">
                  Category: {data?.data?.category_id?.category_name}
                </p>
                <p className="flex gap-x-2 text-gray-400">
                  Date:
                  {formatDate(data?.data?.createdAt)}
                </p>
              </article>
              <article>
                <p className="text-3xl font-bold">{data?.data?.blog_title}</p>
                <p>{data?.data?.blog_description}</p>
              </article>
            </section>
            <section className="w-full lg:w-1/3 h-full pb-20 pl-20">
              <article>
                <h2 className="text-xl font-bold p-1 border-dashed border-b-2 border-orange-500 w-[150px]">
                  Blog Category
                </h2>
                <hr />
                <div className="p-5">
                  {categories?.data?.map((category: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-x-2 p-1 hover:text-orange-500 duration-300"
                    >
                      <ArrowRight />
                      <article className="flex justify-between  w-full">
                        <p className="capitalize">{category?.category_name}</p>
                        <p>{category?.product_count}</p>
                      </article>
                    </div>
                  ))}
                </div>
              </article>
              <article>
                <h2 className="text-xl font-bold p-1 border-dashed border-b-2 border-orange-500 w-[130px]">
                  Latiest Post
                </h2>
                <hr />
                <article className="p-5 flex flex-col gap-y-2">
                  {Blogs?.data?.map((blog: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-5 bg-white p-5 w-full"
                    >
                      <Image
                        src={blog?.blog_photo}
                        alt="blog photo"
                        width={100}
                        height={100}
                      />
                      <div className="flex flex-col justify-center gap-y-2">
                        <p className="text-lg font-medium">
                          {blog?.blog_title}
                        </p>
                        <p className="text-gray-400 text-sm text-nowrap">
                          {formatDate(blog?.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </article>
              </article>
              <article>
                <h2 className="text-xl font-bold p-1 border-dashed border-b-2 border-orange-500 w-[150px]">
                  Our Followers
                </h2>
                <hr />
                <article className="flex flex-col gap-y-2 p-5">
                  <div className="flex justify-between hover:text-orange-500 duration-300">
                    <p className="flex items-center gap-x-2">
                      <FaFacebook />
                      Facebook
                    </p>
                    <p>50520</p>
                  </div>
                  <div className="flex justify-between hover:text-orange-500 duration-300">
                    <p className="flex items-center gap-x-2">
                      <FaXTwitter />
                      Twitter
                    </p>
                    <p>30230</p>
                  </div>
                  <div className="flex justify-between hover:text-orange-500 duration-300">
                    <p className="flex items-center gap-x-2">
                      <FaInstagram />
                      Instagram
                    </p>
                    <p>60330</p>
                  </div>
                  <div className="flex justify-between hover:text-orange-500 duration-300">
                    <p className="flex items-center gap-x-2">
                      <FaTiktok />
                      Tiktok
                    </p>
                    <p>20322</p>
                  </div>
                  <div className="flex justify-between hover:text-orange-500 duration-300">
                    <p className="flex items-center gap-x-2">
                      <FaYoutube />
                      Youtube
                    </p>
                    <p>40033</p>
                  </div>
                </article>
              </article>
            </section>
          </>
        )}
      </section>
    </main>
  );
};

export default BlogDetails;
