"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetCurrentUserQuery,
  useUpdateUserPasswordMutation,
} from "@/redux/api/userApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PasswordData = {
  password: string;
  confirm_password: string;
};

const PassowrdForm = () => {
  const passwordSchema = z.object({
    password: z.string().min(1, "Password is required"),
    confirm_password: z.string().min(1, "Confirm Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordData>({ resolver: zodResolver(passwordSchema) });

  const [updatePassword] = useUpdateUserPasswordMutation();
  const { data: userData } = useGetCurrentUserQuery(null);
  const { toast } = useToast();
  const onSubmit: SubmitHandler<PasswordData> = async (data) => {
    try {
      if (data.password !== data.confirm_password) {
        toast({
          variant: "error",
          title: "Error",
          description: "Password Does not match.",
        });
      } else {
        const PasswordData = {
          password: data.password,
        };
        if (userData?.data?.id) {
          const updatedPassword = await updatePassword({
            id: userData?.data?.id,
            ...PasswordData,
          }).unwrap();
          if (updatedPassword.success) {
            reset();
            toast({
              variant: "success",
              title: "Success",
              description: "Password updated successfully.",
            });
          }
          return updatedPassword;
        }
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
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <article className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2 w-full">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>
            <Input
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              id="password"
              type="password"
              placeholder="Your password"
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
              Confirm Password
            </Label>
            <Input
              className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
              id="confirm password"
              type="password"
              placeholder="Your confirm password"
              {...register("confirm_password")}
            />
            {errors?.confirm_password?.message && (
              <p className=" text-red-700 -mt-1">
                {errors?.confirm_password.message as any}
              </p>
            )}
          </div>
        </article>
        <Button
          className="bg-orange-500 hover:bg-orange-500 w-full"
          type="submit"
        >
          Update
        </Button>
      </form>
    </main>
  );
};

export default PassowrdForm;
