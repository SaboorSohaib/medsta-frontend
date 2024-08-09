"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignupMutation } from "@/redux/api/authApi";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import Signin from "../signin/page";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const result = await signup(data).unwrap();
      if (result.success) {
        router.push("/auth/signin", { scroll: false });
      }
      return result;
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="first name"
          {...register("first_name")}
        />
        <Input type="text" placeholder="Last name" {...register("last_name")} />
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Input
          type="tel"
          placeholder="Phone number"
          {...register("phone_number")}
        />
        <Input type="text" {...register("photo")} placeholder="photo" />
        <Input type="text" {...register("role")} placeholder="role" />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Signup;
