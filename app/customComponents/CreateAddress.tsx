"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateAddressMutation,
  useGetUserAddressQuery,
} from "@/redux/api/addressApi";
import { useGetCurrentUserQuery } from "@/redux/api/userApi";
import React from "react";
import { useForm } from "react-hook-form";

const Address = ({
  country,
  city,
  state,
  zip_code,
}: {
  country: string;
  city: string;
  state: string;
  zip_code: number;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: userData } = useGetCurrentUserQuery(null);
  const [createAddress] = useCreateAddressMutation();
  const { toast } = useToast();
  const onSubmit = async (data: any) => {
    try {
      const adressData = {
        country: data?.country,
        city: data?.city,
        state: data?.state,
        zip_code: Number(data?.zip_code),
        user_id: userData?.data?.id,
      };
      const address = await createAddress(adressData).unwrap();
      if (address.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Adress successfully.",
        });
      }
      return address;
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
      {country ? (
        <section>
          <article className="grid grid-cols-2">
            <p className="font-bold">Country:</p> <p>{country}</p>
            <p className="font-bold">City:</p> <p>{city}</p>
            <p className="font-bold">State:</p> <p>{state}</p>
            <p className="font-bold">Zip Code:</p> <p>{zip_code}</p>
          </article>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="country name" className="text-sm">
              Country / Region
            </Label>
            <Input
              id="country name"
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Your country name"
              {...register("country")}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="country name" className="text-sm">
              Street
            </Label>
            <Input
              placeholder="House and street name"
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              {...register("state")}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="country name" className="text-sm">
              Town / City
            </Label>
            <Input
              placeholder="Town / City"
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              {...register("city")}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="country name" className="text-sm">
              Zip Code
            </Label>
            <Input
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Post Code"
              {...register("zip_code")}
            />
          </div>
          <Button>Create Address</Button>
        </form>
      )}
    </main>
  );
};

export default Address;
