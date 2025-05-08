"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AddressForm from "./AddressForm";
import PassowrdForm from "./PassowrdForm";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserProfileForm = () => {
  const profileSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    photo: z.string().nonempty("Photo is required"),
  });
  const { data: userData, isLoading } = useGetCurrentUserQuery(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: userData?.data?.first_name ? userData?.data?.first_name : "",
      last_name: userData?.data?.last_name ? userData?.data?.last_name : "",
      email: userData?.data?.email ? userData?.data?.email : "",
      phone_number: userData?.data?.phone_number
        ? userData?.data?.phone_number
        : "",
      photo: userData?.data?.photo ? userData?.data?.photo : "",
    },
  });
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("userProfile");
  const [updateUser] = useUpdateUserMutation();
  const onSubmit = async (data: any) => {
    try {
      const UserData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        photo: userData?.data?.photo,
      };
      if (userData?.data.id) {
        const updatedUser = await updateUser({
          id: userData?.data.id,
          ...UserData,
        }).unwrap();
        if (updatedUser.success) {
          toast({
            variant: "success",
            title: "Success",
            description: "Profile updated successfully.",
          });
        }
        return updatedUser;
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
    <main className="flex flex-col gap-y-10">
      <article className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button
          className={` shadow-md w-full ${
            activeTab === "userProfile"
              ? "bg-orange-500 hover:bg-orange-500"
              : "bg-white hover:bg-white text-black"
          } `}
          onClick={() => setActiveTab("userProfile")}
        >
          Profile
        </Button>
        <Button
          className={`shadow-md w-full ${
            activeTab === "address"
              ? "bg-orange-500 hover:bg-orange-500"
              : "bg-white hover:bg-white text-black"
          } `}
          onClick={() => setActiveTab("address")}
        >
          Address
        </Button>
        <Button
          className={`shadow-md w-full ${
            activeTab === "password"
              ? "bg-orange-500 hover:bg-orange-500"
              : "bg-white hover:bg-white text-black"
          } `}
          onClick={() => setActiveTab("password")}
        >
          Password
        </Button>
      </article>
      <section>
        {activeTab === "userProfile" ? (
          <>
            <article className="flex flex-col sm:flex-row items-center gap-2 pb-3">
              {" "}
              <Image
                src={userData?.data?.photo}
                alt="user photo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <Button className="bg-orange-500 hover:bg-orange-500 shadow-md w-full sm:max-w-max">
                Upload
              </Button>
              <Button className="bg-white hover:bg-white shadow-md text-black w-full sm:max-w-max">
                Remove
              </Button>
            </article>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <article className="flex gap-x-4">
                <div className="flex flex-col gap-y-2 w-full">
                  <Label htmlFor="first name" className="text-sm">
                    First Name
                  </Label>
                  <Input
                    id="first name"
                    type="text"
                    className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                      errors.first_name && "border border-red-500"
                    }`}
                    placeholder="Your first name"
                    defaultValue={
                      userData?.data?.first_name
                        ? userData?.data?.first_name
                        : ""
                    }
                    {...register("first_name")}
                  />
                  {errors?.first_name?.message && (
                    <p className=" text-red-700 -mt-1">
                      {errors?.first_name.message as any}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                  <Label htmlFor="last name" className="text-sm">
                    Last Name
                  </Label>
                  <Input
                    className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                      errors.last_name && "border border-red-500"
                    }`}
                    type="text"
                    id="last name"
                    placeholder="Your last name"
                    defaultValue={
                      userData?.data?.last_name ? userData?.data?.last_name : ""
                    }
                    {...register("last_name")}
                  />
                  {errors?.last_name?.message && (
                    <p className=" text-red-700 -mt-1">
                      {errors?.last_name.message as any}
                    </p>
                  )}
                </div>
              </article>
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                    errors.email && "border border-red-500"
                  }`}
                  placeholder="Email"
                  defaultValue={
                    userData?.data?.email ? userData?.data?.email : ""
                  }
                  {...register("email")}
                />
                {errors?.email?.message && (
                  <p className=" text-red-700 -mt-1">
                    {errors?.email.message as any}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="contact number" className="text-sm">
                  Contact Number
                </Label>
                <Input
                  type="text"
                  id="contact number"
                  className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                    errors.phone_number && "border border-red-500"
                  }`}
                  placeholder="Contact number"
                  defaultValue={
                    userData?.data?.phone_number
                      ? userData?.data?.phone_number
                      : ""
                  }
                  {...register("phone_number")}
                />
                {errors?.phone_number?.message && (
                  <p className=" text-red-700 -mt-1">
                    {errors?.phone_number.message as any}
                  </p>
                )}
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-500"
                type="submit"
              >
                Update
              </Button>
            </form>
          </>
        ) : activeTab === "address" ? (
          <AddressForm />
        ) : (
          activeTab === "password" && <PassowrdForm />
        )}
      </section>
    </main>
  );
};

export default UserProfileForm;
