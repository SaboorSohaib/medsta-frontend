/* eslint-disable react/no-unescaped-entities */
"use Client";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ImageUploadComponent from "@/components/ui/ImageUploadComponent";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { log } from "console";

const CreateOrUpdateProducts = ({
  isEdit,
  productData,
}: {
  isEdit: boolean;
  productData?: any;
}) => {
  // Define Zod schema for form validation
  const productSchema = z.object({
    product_price: z.string().min(1, "Product price is required"),
    product_title: z
      .string()
      .min(1, "Product title is required")
      .max(20, "Product title cannot exceed 20 characters"),
    product_description: z
      .string()
      .min(1, "Product description is required")
      .max(50, "Product description cannot exceed 50 characters"),
    product_type: z
      .string()
      .min(1, "Product type is required")
      .max(20, "Product type cannot exceed 20 characters"),
    // product_photo: z.string().nonempty("Product photo is required"),
    product_handle: z
      .string()
      .min(1, "Product handle is required")
      .max(20, "Product handle cannot exceed 20 characters"),
    category_id: z.object(
      { label: z.string(), value: z.string() },
      { message: "Category is required" }
    ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_price: isEdit ? productData?.product_price : "",
      product_title: isEdit ? productData?.product_title : "",
      product_description: isEdit ? productData?.product_description : "",
      product_type: isEdit ? productData?.product_type : "",
      product_photo: isEdit ? productData?.product_photo : "",
      product_handle: isEdit ? productData?.product_handle : "",
      product_status: isEdit ? productData?.product_status : "",
      category_id: isEdit ? productData?.category?.id : "",
    },
  });

  const productStatus =
    watch("product_status") ?? (isEdit ? productData?.product_status : false);
  const { toast } = useToast();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data } = useGetCategoriesQuery({});
  const onSubmit = async (data: any) => {
    const ProductData = {
      product_price: Number(data.product_price),
      product_title: data.product_title,
      product_description: data.product_description,
      product_type: data.product_type,
      product_photo: "https://ik.imagekit.io/gbfjo9pxy/customer_4nma_rYDU.jpg",
      product_handle: data.product_handle,
      product_status: productStatus,
      category_id: data?.category_id?.value,
    };
    try {
      if (!isEdit) {
        const createdProduct = await createProduct(ProductData).unwrap();
        if (createdProduct.success) {
          reset();
          toast({
            variant: "success",
            title: "Success",
            description: "Product created successfully",
          });
        }
        return createdProduct;
      } else {
        const updatedProduct = await updateProduct({
          id: productData?.id,
          ...ProductData,
        }).unwrap();
        if (updatedProduct.success) {
          toast({
            variant: "success",
            title: "Success",
            description: "Product updated successfully",
          });
        }
        return updatedProduct;
      }
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error?.data?.message,
      });
    }
  };

  const categories =
    data?.data?.map((category: any) => {
      return { label: category?.category_name, value: category?.id };
    }) || [];

  const handleUploadSuccess = (url: string) => {
    setValue("product_photo", url, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-[60px] text-xl font-semibold"
          variant={`${isEdit ? "default" : "outline"}`}
        >{`${isEdit ? "Update Product" : "Create Product"}`}</Button>
      </DialogTrigger>
      <DialogContent className="w-[330px] md:w-[900px]">
        <DialogHeader>
          <DialogTitle>{`${
            isEdit ? "Update Product" : "Create Product"
          }`}</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col items-center gap-y-2">
              <ImageUploadComponent
                image={productData?.product_photo}
                onUploadSuccess={handleUploadSuccess}
              />
              {errors?.product_photo?.message && (
                <p className=" text-red-700 mt-1">
                  {errors.product_photo.message as any}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-2 pt-5">
              <div className="flex flex-col items-start gap-y-2 w-full">
                <Label htmlFor="product title" className="text-right">
                  Product Title
                </Label>
                <Input
                  id="product title"
                  type="text"
                  className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                    errors.product_title && "border border-red-500"
                  }`}
                  defaultValue={isEdit ? productData?.product_title : ""}
                  {...register("product_title")}
                />
                {errors?.product_title?.message && (
                  <p className=" text-red-700 mt-1">
                    {errors.product_title.message as any}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-y-2 w-full">
                <Label htmlFor="product price" className="text-right">
                  Product Price
                </Label>
                <Input
                  id="product price"
                  className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                    errors.product_price && "border border-red-500"
                  }`}
                  defaultValue={isEdit ? productData?.product_price : ""}
                  type="number"
                  {...register("product_price")}
                />
                {errors?.product_price?.message && (
                  <p className=" text-red-700 mt-1">
                    {errors.product_price.message as any}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-2">
              <div className="flex flex-col items-start gap-y-2 w-full">
                <Label htmlFor="product type" className="text-right">
                  Product Type
                </Label>
                <Input
                  id="product type"
                  className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                    errors.product_type && "border border-red-500"
                  }`}
                  defaultValue={isEdit ? productData?.product_type : ""}
                  {...register("product_type")}
                />
                {errors?.product_type?.message && (
                  <p className=" text-red-700 mt-1">
                    {errors.product_type.message as any}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-y-2 w-full">
                <Label htmlFor="product handle" className="text-right">
                  Product Handle
                </Label>
                <Input
                  id="product handle"
                  className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                    errors.product_handle && "border border-red-500"
                  }`}
                  defaultValue={isEdit ? productData?.product_handle : ""}
                  {...register("product_handle")}
                />
                {errors?.product_handle?.message && (
                  <p className=" text-red-700 mt-1">
                    {errors.product_handle.message as any}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start gap-y-2 w-full">
              <Label htmlFor="product status" className="text-right">
                Product Status
              </Label>
              <Controller
                name="product_status"
                control={control}
                defaultValue={isEdit ? productData?.product_status : false}
                render={({ field: { ref, name, value } }) => (
                  <div
                    id="product_status"
                    className="cursor-pointer flex items-center"
                    onClick={() => setValue("product_status", !value)}
                  >
                    <Input type="hidden" value={value} ref={ref} name={name} />
                    {value ? (
                      <FaToggleOn size={25} className="text-green-500" />
                    ) : (
                      <FaToggleOff size={25} className="text-gray-400" />
                    )}
                    <span className="ml-2">{value ? "Disable" : "Enable"}</span>
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col items-start gap-y-2 w-full">
              <Label htmlFor="product description" className="text-right">
                Product Description
              </Label>
              <Textarea
                id="product description"
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors.product_description && "border border-red-500"
                }`}
                defaultValue={isEdit ? productData?.product_description : ""}
                {...register("product_description")}
              />
              {errors?.product_description?.message && (
                <p className=" text-red-700 mt-1">
                  {errors.product_description.message as any}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-2">
              <div className="flex flex-col items-start gap-y-[6px] w-full">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <div className="w-full">
                  <Controller
                    control={control}
                    name="category_id"
                    defaultValue={
                      isEdit && productData?.category_id
                        ? {
                            label: `${productData?.category?.category_name}`,
                            value: `${productData?.category?.id}`,
                          }
                        : ""
                    }
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        id="category_id"
                        styles={{
                          placeholder: (base) => ({
                            ...base,
                            color: "#ccc",
                            fontSize: "14px",
                          }),
                          control: (base, state) => ({
                            ...base,
                            border: state.isFocused
                              ? "1px solid #ccc"
                              : "1px solid #ccc",
                            boxShadow: state.isFocused ? "0 0 0 1px #ccc" : "0",
                            "&:hover": {
                              border: state.isFocused
                                ? "1px solid #ccc"
                                : "1px solid #ccc",
                            },
                            fontSize: "15px",
                            height: "43px",
                            fontWeight: "500",
                            borderRadius: "6px",
                          }),
                          option: (base, { isFocused, isSelected }) => ({
                            ...base,
                            backgroundColor: isSelected
                              ? "rgb(0,150,149)"
                              : isFocused
                              ? " rgb(209 250 229)"
                              : "transparent",
                            cursor: "pointer",
                          }),
                          menu: (base) => ({
                            ...base,
                            fontSize: "15px",
                            fontWeight: "500",
                          }),
                          indicatorSeparator: (base) => ({
                            ...base,
                            display: "none",
                          }),
                        }}
                        {...field}
                        isSearchable={false}
                        placeholder="Category"
                        options={categories}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                  {errors?.category_id?.message && (
                    <p className=" text-red-700 mt-1">
                      {errors.category_id.message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4 flex flex-col w-full justify-end gap-y-2">
            <DialogTrigger asChild>
              <Button type="button" onClick={() => reset()}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateProducts;
