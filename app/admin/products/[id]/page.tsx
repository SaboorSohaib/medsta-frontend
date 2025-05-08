"use client";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import React from "react";
import { useParams } from "next/navigation";
import CreateProducts from "../../../customComponents/CreateOrUpdateProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SingleProduct = () => {
  const param = useParams();
  const id = param?.id;
  const { isLoading, data } = useGetSingleProductQuery(id);
  return (
    <main>
      <section className="flex flex-col gap-y-4 lg:flex-row lg:justify-between items-start">
        <Card className={cn("max-w-max")}>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-col rounded-md border p-4">
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Id:</p>
                <p>{data?.data?.id}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Title:</p>
                <p>{data?.data?.product_title}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Description:</p>
                <p>{data?.data?.product_description}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Price:</p>
                <p>${data?.data?.product_price}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Type:</p>
                <p>{data?.data?.product_type}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Category:</p>
                <p>{data?.data?.category?.category_name}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Manufacturing:</p>
                <p>{data?.data?.manufacturing}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="text-lg font-bold">Handle:</p>
                <p>{data?.data?.product_handle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <CreateProducts isEdit={true} productData={data?.data} />
      </section>
    </main>
  );
};

export default SingleProduct;
