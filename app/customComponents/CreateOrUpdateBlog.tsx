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
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import ImageUploadComponent from "@/components/ui/ImageUploadComponent";
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
import { Textarea } from "@/components/ui/textarea";
import { useGetCurrentUserQuery } from "@/redux/api/userApi";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { log } from "console";

const CreateOrUpdateBlog = ({
  isEdit,
  blogData,
}: {
  isEdit: boolean;
  blogData?: any;
}) => {
  // Define Zod schema for form validation
  const blogSchema = z.object({
    blog_title: z
      .string()
      .min(1, "Blog title is required")
      .max(20, "Blog title ca nnot exceed 20 characters"),
    blog_description: z.string().min(1, "Blog description is required"),
    blog_author: z.string().min(1, "Blog author is required"),
    category_id: z.object(
      { label: z.string(), value: z.string() },
      { message: "Category is required" }
    ),
    blog_photo: z.string().nonempty("Blog photo is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      blog_title: isEdit ? blogData?.blog_title : "",
      blog_description: isEdit ? blogData?.blog_description : "",
      blog_author: isEdit ? blogData?.blog_author : "",
      category_id: isEdit
        ? {
            label: `${blogData?.category_id?.category_name}`,
            value: `${blogData?.category_id?.id}`,
          }
        : undefined,
      blog_photo: isEdit ? blogData?.blog_photo : "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [updateblog] = useUpdateBlogMutation();
  const { data: currentUser } = useGetCurrentUserQuery(null);
  const { data } = useGetCategoriesQuery({});
  const onSubmit = async (data: any) => {
    let userId = currentUser?.data?.id;
    const BlogData = {
      blog_title: data.blog_title,
      blog_description: data.blog_description,
      blog_author: data.blog_author,
      blog_photo: data?.blog_photo,
      category_id: data?.category_id?.value,
      user_id: userId,
    };
    try {
      if (!isEdit) {
        const createdBlog = await createBlog({ ...BlogData }).unwrap();
        if (createdBlog.success) {
          reset();
          toast({
            variant: "success",
            title: "Success",
            description: "Blog created successfully",
          });
        }
        return createdBlog;
      } else {
        const updatedBlog = await updateblog({
          id: blogData?.id,
          ...BlogData,
        }).unwrap();
        if (updatedBlog) {
          toast({
            variant: "success",
            title: "Success",
            description: "Blog created successfully",
          });
        }
        return updatedBlog;
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
      return { label: category.category_name, value: category?.id };
    }) || [];

  const handleUploadSuccess = (url: string) => {
    setValue("blog_photo", url);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-[60px] text-xl font-semibold"
          variant={`${isEdit ? "default" : "outline"}`}
        >{`${isEdit ? "Update Blog" : "Create Blog"}`}</Button>
      </DialogTrigger>
      <DialogContent className="w-[330px] md:w-[900px]">
        <DialogHeader>
          <DialogTitle>{`${
            isEdit ? "Update Blog" : "Create Blog"
          }`}</DialogTitle>
          <DialogDescription>
            Make changes to your blog here. Click{" "}
            {`${isEdit ? "update" : "create"}`} when you're done.
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col items-center gap-y-2">
              <ImageUploadComponent
                image={blogData?.blog_photo}
                onUploadSuccess={handleUploadSuccess}
              />
              {errors?.blog_photo?.message && (
                <p className=" text-red-700 mt-1">
                  {errors.blog_photo.message as any}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-2 pt-5">
              <div className="flex flex-col items-start gap-y-2 w-full">
                <Label htmlFor="product title" className="text-right">
                  Blog Title
                </Label>
                <Input
                  id="Blog title"
                  type="text"
                  className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                    errors.blog_title && "border border-red-500"
                  }`}
                  defaultValue={isEdit ? blogData?.blog_title : ""}
                  {...register("blog_title")}
                />
                {errors?.blog_title?.message && (
                  <p className=" text-red-700 -mt-1">
                    {errors.blog_title.message as any}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-y-2 w-full">
                <Label htmlFor="blog author" className="text-right">
                  Blog Author
                </Label>
                <Input
                  id="blog author"
                  className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                    errors.blog_author && "border border-red-500"
                  }`}
                  defaultValue={isEdit ? blogData?.blog_author : ""}
                  type="text"
                  {...register("blog_author")}
                />
                {errors?.blog_author?.message && (
                  <p className=" text-red-700 -mt-1">
                    {errors.blog_author.message as any}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <Label htmlFor="blog description" className="text-right">
                Blog Description
              </Label>
              <Textarea
                id="blog description"
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors.blog_description && "border border-red-500"
                }`}
                defaultValue={isEdit ? blogData?.blog_description : ""}
                {...register("blog_description")}
              />
              {errors?.blog_description?.message && (
                <p className=" text-red-700 -mt-1">
                  {errors.blog_description.message as any}
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
                      isEdit && blogData?.category_id
                        ? {
                            label: `${blogData?.category_id?.category_name}`,
                            value: `${blogData?.category_id?.id}`,
                          }
                        : undefined
                    }
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        id="category"
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
                          field.onChange(
                            selectedOption ? selectedOption : null
                          );
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
          <DialogFooter className="mt-4">
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

export default CreateOrUpdateBlog;
