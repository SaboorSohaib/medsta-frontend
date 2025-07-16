/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageUploadComponent from "@/components/ui/ImageUploadComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateOrUpdateCategory = ({
  isEdit,
  categoryData,
}: {
  isEdit: boolean;
  categoryData?: any;
}) => {
  // Define Zod schema for form validation
  const categorySchema = z.object({
    category_name: z
      .string()
      .min(1, "Category name is required")
      .max(20, "Category name cannot exceed 20 characters"),
    category_handle: z.string().min(1, "Category handle is required"),
    category_photo: isEdit
      ? z.string().optional()
      : z.string().nonempty("Category Photo is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema), // Use Zod schema resolver
    defaultValues: {
      category_name: isEdit ? categoryData?.category_name : "",
      category_handle: isEdit ? categoryData?.category_handle : "",
      category_photo: isEdit ? categoryData?.category_photo : "",
    },
  });
  const { toast } = useToast();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const onSubmit = async (data: any) => {
    const CategoryData = {
      category_name: data.category_name,
      category_handle: data?.category_handle,
      category_photo: data?.category_photo || categoryData?.category_photo,
    };
    try {
      if (!isEdit) {
        const createdCatgory = await createCategory(CategoryData).unwrap();
        if (createdCatgory.success) {
          reset();
          toast({
            variant: "success",
            title: "Success",
            description: "Category created successfully",
          });
        }
        return createdCatgory;
      } else {
        const updatedCategory = await updateCategory({
          id: categoryData?.id,
          ...CategoryData,
        }).unwrap();
        if (updatedCategory.success) {
          toast({
            variant: "success",
            title: "Success",
            description: "Category updated successfully",
          });
        }
        return updatedCategory;
      }
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error?.data?.message,
      });
    }
  };

  const handleUploadSuccess = (url: string) => {
    setValue("category_photo", url, {
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
        >
          {isEdit ? "Update Category" : "Create Category"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Update Category" : "Create Category"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click{" "}
            {`${isEdit ? "update" : "create"}`} when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col items-center gap-y-2">
            <ImageUploadComponent
              image={categoryData?.category_photo}
              onUploadSuccess={handleUploadSuccess}
            />
            {errors.category_photo && (
              <span className="text-red-500 text-sm">
                {errors.category_photo.message as any}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-4 pt-5">
            <div className="flex flex-col items-start gap-y-2">
              <Label htmlFor="category name" className="text-right">
                Category Name
              </Label>
              <Input
                id="category name"
                defaultValue={isEdit ? categoryData?.category_name : ""}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors.category_name && "border border-red-500"
                }`}
                {...register("category_name")}
              />
              {errors.category_name && (
                <span className="text-red-500 text-sm mt-[-4px]">
                  {errors.category_name.message as any}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <Label htmlFor="category handle" className="text-right">
                Category Handle
              </Label>
              <Input
                id="category handle"
                defaultValue={isEdit ? categoryData?.category_handle : ""}
                className={`focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors.category_handle && "border border-red-500"
                }`}
                {...register("category_handle")}
              />
              {errors.category_handle && (
                <span className="text-red-500 text-sm mt-[-4px]">
                  {errors.category_handle.message as any}
                </span>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4 flex flex-col w-full justify-end gap-y-2">
            <DialogTrigger asChild>
              <Button type="button">Cancel</Button>
            </DialogTrigger>
            <Button type="submit" disabled={isLoading}>
              {isEdit ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateCategory;
