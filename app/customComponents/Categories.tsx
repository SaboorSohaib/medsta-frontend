"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";

const Categories = () => {
  const size = 10;
  const { data, isLoading } = useGetCategoriesQuery({ size: size });
  const catargoryData = data?.data || [];
  return (
    <main className="flex flex-col items-center py-20 gap-10">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-bold">what do you looking for?</p>
        <p className="text-gray-400 text-center">
          We offer you more and more about it
        </p>
      </div>
      {catargoryData?.length < 1 ? (
        <>
          <p>Categories not available</p>
        </>
      ) : isLoading ? (
        <Spinner size="medium" />
      ) : (
        catargoryData?.length && (
          <Carousel className=" md:w-[600px] lg:w-[1000px]">
            <CarouselPrevious className="border border-orange-500 text-orange-500 hover:text-orange-500" />
            <CarouselContent className="flex flex-col gap-y-4 h-[300px] overflow-y-scroll no-scrollbar pl-5 md:flex-row md:h-full md:gap-x-4 md:overflow-visible">
              {data?.data?.map((category: any, index: number) => (
                <div key={index}>
                  <CarouselItem className="flex flex-col gap-y-2 items-center justify-center h-[120px] w-[120px] p-0 overflow-hidden border border-gray-200 hover:border-black active:bg-orange-500 active:text-white active:border-transparent duration-500">
                    <Image
                      src={category?.category_photo}
                      alt="category image"
                      width={50}
                      height={50}
                      className="rounded-full h-12 w-12"
                    />
                    <p>{category?.category_name}</p>
                  </CarouselItem>
                </div>
              ))}
            </CarouselContent>
            <CarouselNext className="border border-orange-500 text-orange-500 hover:text-orange-500" />
          </Carousel>
        )
      )}
    </main>
  );
};

export default Categories;
