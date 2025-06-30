"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSigninMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import HomePageBanner from "../customComponents/HomePageBanner";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";

const Signin = () => {
  const singinSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(singinSchema) });
  const itesmInCart = useSelector((state: any) => state.cart.cartItems);
  const router = useRouter();
  const { toast } = useToast();
  const [signin, { isLoading }] = useSigninMutation();
  const onSubmit = async (data: any) => {
    try {
      const signinedInUser = await signin(data).unwrap();
      router.push(
        signinedInUser.data.role === "user" && itesmInCart?.length > 0
          ? "/check-out"
          : signinedInUser.data.role === "admin" && itesmInCart?.length > 0
          ? "/check-out"
          : signinedInUser.data.role === "admin" && itesmInCart?.length === 0
          ? "/admin"
          : signinedInUser.data.role === "user" && itesmInCart?.length === 0
          ? "/user-profile"
          : "",
        {
          scroll: true,
        }
      );
      if (signinedInUser.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Signed successfully.",
        });
      }
      return signinedInUser;
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.data.message,
      });
    }
  };
  return (
    <main className="flex flex-col items-center">
      <section className="w-full">
        <HomePageBanner
          isHome={false}
          title="Sign in"
          from="Home"
          to="Sign in"
        />
      </section>
      <section className="flex flex-col justify-center items-center gap-y-10 w-full sm:w-3/4 md:w-1/2 lg:w-5/12 h-full py-20 px-10">
        <article className="flex gap-x-2 justify-evenly w-full">
          <Link className="w-full p-3 text-center shadow-md" href={"/signup"}>
            Register
          </Link>
          <Link
            className="shadow-md text-center text-white p-3 bg-orange-500 w-full"
            href={""}
          >
            Sign in
          </Link>
        </article>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 justify-center bg-white items-center w-full shadow-md p-10"
        >
          <p className="text-2xl font-semibold">Sing in to Your Account</p>
          <div className="flex flex-col gap-y-2 w-full">
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
                <p className=" text-red-500 -mt-1">
                  {errors.email.message as any}
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
                  {errors.password.message as any}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-500"
            disabled={isLoading ? true : false}
          >
            Sign in
          </Button>
          <p className="flex gap-x-2">
            Dont have an account?
            <Link className="text-blue-500" href={"/signup"}>
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Signin;
