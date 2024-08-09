"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSigninMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [signin, { isLoading }] = useSigninMutation();
  const onSubmit = async (data: any) => {
    try {
      const signinedInUser = await signin(data).unwrap();
      router.push(signinedInUser.data.role === "admin" ? "/admin" : "/user", {
        scroll: false,
      });
      return signinedInUser;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
};

export default Signin;
