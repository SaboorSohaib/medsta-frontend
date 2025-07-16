"use client";
import React from "react";
import CreateOrUpdateCategory from "../../../customComponents/CreateOrUpdateCategory";
import { useParams } from "next/navigation";
import { useGetSingleCategoryQuery } from "@/redux/api/categoryApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ItemCard from "@/app/customComponents/ItemCard";
import Link from "next/link";

const SingleProduct = () => {
  const param = useParams();
  const id = param?.id;
  const { isLoading, data } = useGetSingleCategoryQuery(id as any);
  return (
    <main>
      <section className="flex flex-col gap-y-4 lg:flex-row lg:justify-between items-start">
        <Card className={cn("max-w-max")}>
          <Link className="px-2 py-4" href={"/admin/categories"}>
            Back
          </Link>
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col rounded-md border p-4">
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Id:</p>
                <p className="overflow-hidden">{data?.data?.id}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Title:</p>
                <p>{data?.data?.category_name}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Handle:</p>
                <p>{data?.data?.category_handle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <CreateOrUpdateCategory isEdit={true} categoryData={data?.data} />
      </section>
    </main>
  );
};

export default SingleProduct;
