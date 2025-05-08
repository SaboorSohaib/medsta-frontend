"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUpdateUserAddressMutation } from "@/redux/api/addressApi";
import { useGetCurrentUserQuery } from "@/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddressForm = () => {
  const addressSchema = z.object({
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State required"),
    zip_code: z.string().min(1, "Zip code is required"),
  });
  const { data: userData } = useGetCurrentUserQuery(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: userData?.data?.address?.country ? userData?.data?.country : "",
      city: userData?.data?.address?.city ? userData?.data?.address?.city : "",
      state: userData?.data?.address?.state
        ? userData?.data?.address?.state
        : "",
      zip_code: userData?.data?.address?.zip_code
        ? userData?.data?.address?.zip_code
        : "",
    },
  });
  const [updateAddress] = useUpdateUserAddressMutation();
  const onSubmit = async (data: any) => {
    try {
      const AddressData = {
        country: data.country,
        city: data.city,
        state: data.state,
        zip_code: Number(data.zip_code),
        user_id: userData?.data?.id,
      };
      if (userData?.data?.id) {
        const updatedAddress = await updateAddress({
          id: userData?.data?.address?.id,
          ...AddressData,
        }).unwrap();
        if (updatedAddress.success) {
          toast({
            variant: "success",
            title: "Success",
            description: "Address updated successfully.",
          });
        }

        return updatedAddress;
      }
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.data.message,
      });
    }
  };
  return (
    <main>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-y-4"
      >
        <article className="flex gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="Country" className="text-sm">
              Country
            </Label>
            <Input
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              type="text"
              id="Country"
              defaultValue={
                userData?.data?.address?.country
                  ? userData?.data?.address?.country
                  : ""
              }
              placeholder="Your country"
              {...register("country")}
            />
            {errors?.country?.message && (
              <p className=" text-red-700 -mt-1">
                {errors?.country.message as any}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="city" className="text-sm">
              City
            </Label>
            <Input
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              type="text"
              id="city"
              defaultValue={
                userData?.data?.address?.city
                  ? userData?.data?.address?.city
                  : ""
              }
              placeholder="Your city"
              {...register("city")}
            />
            {errors?.city?.message && (
              <p className=" text-red-700 -mt-1">
                {errors?.city.message as any}
              </p>
            )}
          </div>
        </article>
        <article className="flex gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="state" className="text-sm">
              State
            </Label>
            <Input
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              id="state"
              type="text"
              defaultValue={
                userData?.data?.address?.state
                  ? userData?.data?.address?.state
                  : ""
              }
              placeholder="Your state"
              {...register("state")}
            />
            {errors?.state?.message && (
              <p className=" text-red-700 -mt-1">
                {errors?.state.message as any}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="zip code" className="text-sm">
              Zip Code
            </Label>
            <Input
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              id="zip code"
              type="text"
              defaultValue={
                userData?.data?.address?.zip_code
                  ? userData?.data?.address?.zip_code
                  : ""
              }
              placeholder="Your zip code"
              {...register("zip_code")}
            />
            {errors?.zip_code?.message && (
              <p className=" text-red-700 -mt-1">
                {errors?.zip_code.message as any}
              </p>
            )}
          </div>
        </article>
        <Button className="bg-orange-500 hover:bg-orange-500" type="submit">
          Update
        </Button>
      </form>
    </main>
  );
};

export default AddressForm;
