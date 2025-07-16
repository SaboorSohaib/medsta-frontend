"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignupMutation } from "@/redux/api/authApi";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ImageUploadComponent from "@/components/ui/ImageUploadComponent";
import Link from "next/link";
import HomePageBanner from "../customComponents/HomePageBanner";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup = () => {
  const singupSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    password: z.string().min(1, "Password is required"),
    photo: z.string().nonempty("Photo is required"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(singupSchema) });
  const [signup, { isLoading }] = useSignupMutation();
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      if (data.password !== data.confirm_password) {
        toast({
          variant: "error",
          title: "Error",
          description: "Password Does not match.",
        });
      } else {
        const result = await signup(data).unwrap();
        if (result.success) {
          router.push("/signin", { scroll: true });
        }
        if (result.success) {
          toast({
            variant: "success",
            title: "Success",
            description: "Account created successfully.",
          });
        }
        return result;
      }
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.data.message,
      });
    }
  };
  const handleUploadSuccess = (url: string) => {
    setValue("photo", url, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  return (
    <main className="flex flex-col items-center">
      <section className="w-full">
        <HomePageBanner
          isHome={false}
          title="Register"
          from="Home"
          to="Register"
        />
      </section>
      <section className="flex flex-col justify-center items-center gap-y-10 w-full sm:w-3/4 md:w-1/2 lg:w-5/12 h-full py-20 px-10">
        <article className="flex gap-x-2 justify-evenly w-full">
          <Link
            className="shadow-md text-center text-white p-3 bg-orange-500 w-full"
            href={"/signup"}
          >
            Register
          </Link>
          <Link className="w-full p-3 text-center shadow-md" href={"/signin"}>
            Sign in
          </Link>
        </article>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 justify-center items-center w-full shadow-md p-10 bg-white"
        >
          <p className="text-2xl font-semibold">Register Your Account</p>
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex flex-col items-center w-full gap-y-2">
              <ImageUploadComponent onUploadSuccess={handleUploadSuccess} />
              {errors?.photo?.message && (
                <p className=" text-red-700 -mt-1 text-center">
                  {errors?.photo.message as any}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full pt-2">
              <Label htmlFor="first name" className="text-sm">
                First Name
              </Label>
              <Input
                id="first name"
                type="text"
                className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors?.first_name && "border border-red-500"
                }`}
                placeholder="Your first name"
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
                id="last name"
                type="text"
                className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors?.last_name && "border border-red-500"
                }`}
                placeholder="Your last name"
                {...register("last_name")}
              />
              {errors?.last_name?.message && (
                <p className=" text-red-700 -mt-1">
                  {errors.last_name.message as any}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors?.email && "border border-red-500"
                }`}
                placeholder="Email"
                {...register("email")}
              />
              {errors?.email?.message && (
                <p className=" text-red-700 -mt-1">
                  {errors?.email.message as any}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="password" className="text-sm">
                Pasword
              </Label>
              <Input
                id="password"
                type="password"
                className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors?.password && "border border-red-500"
                }`}
                placeholder="Password"
                {...register("password")}
              />
              {errors?.password?.message && (
                <p className=" text-red-700 -mt-1">
                  {errors?.password.message as any}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="confirm password" className="text-sm">
                Confirm Pasword
              </Label>
              <Input
                id="confirm password"
                type="password"
                className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors?.confirm_password && "border border-red-500"
                }`}
                placeholder="confirm password"
                {...register("confirm_password")}
              />
              {errors?.confirm_password?.message && (
                <p className=" text-red-700 -mt-1">
                  {errors?.confirm_password.message as any}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="phone number" className="text-sm">
                Phone Number
              </Label>
              <Input
                id="phone number"
                type="text"
                className={`p-5 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                  errors?.phone_number && "border border-red-500"
                }`}
                placeholder="Phone number"
                {...register("phone_number")}
              />
              {errors?.phone_number?.message && (
                <p className=" text-red-700 -mt-1">
                  {errors?.phone_number.message as any}
                </p>
              )}
            </div>
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-500"
          >
            Create Account
          </Button>
          <p className="flex gap-x-2">
            Already have an account?
            <Link className="text-blue-500" href={"/signin"}>
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Signup;
