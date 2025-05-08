"use client";
import React from "react";
import HomePageBanner from "../customComponents/HomePageBanner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitContactFormMutation } from "@/redux/api/mailApi";
import { useToast } from "@/hooks/use-toast";

const ContactUS = () => {
  const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    message: z.string().min(1, "Message is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(contactSchema) });

  const { toast } = useToast();
  const [submitForm, { isLoading }] = useSubmitContactFormMutation();
  const onSubmit = async (data: any) => {
    try {
      const submit = await submitForm(data).unwrap();
      // console.log("🚀 ~ onSubmit ~ data:", { data });
      if (submit.success) {
        reset();
        toast({
          variant: "success",
          title: "Success",
          description: "Form submitted successfully.",
        });
      }
      return submit;
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error,
      });
    }
  };
  return (
    <main>
      <section>
        <HomePageBanner
          isHome={false}
          title="Contact Us"
          from="Home"
          to="Contact US"
        />
      </section>
      <section className="flex flex-col items-center py-20 gap-y-10 px-10 lg:px-20 ">
        <article className="flex flex-col items-center gap-y-4">
          <h2 className="text-3xl font-semibold">
            NICE PROJECT? GET IN TOUCH! WILL
          </h2>
          <h3 className="text-3xl font-semibold">CONTACT YOU SOON</h3>
        </article>
        <section className="flex flex-col gap-y-4 w-full lg:w-[1000px] shadow-md bg-white p-10">
          <h3 className="text-2xl font-semibold">Get In Touch</h3>
          <p className="text-gray-400">
            Your email addres will not be published.
          </p>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-col gap-y-4 md:flex-row gap-x-8">
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="name" className="text-sm">
                  Your Name
                </Label>
                <Input
                  className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  {...register("name")}
                />
                {errors?.name?.message && (
                  <p className=" text-red-700 -mt-1">
                    {errors?.name?.message as any}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="email" className="text-sm">
                  Your Email
                </Label>
                <Input
                  className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                  type="text"
                  id="email"
                  placeholder="Your email"
                  {...register("email")}
                />
                {errors?.email?.message && (
                  <p className=" text-red-700 -mt-1">
                    {errors?.email?.message as any}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="description" className="text-sm">
                Your Messge
              </Label>
              <Textarea
                id="description"
                className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                placeholder="Your messge"
                {...register("message")}
              />
              {errors?.message?.message && (
                <p className=" text-red-700 -mt-1">
                  {errors?.message?.message as any}
                </p>
              )}
            </div>
            <Button
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-500 text-white w-full sm:w-1/5 mt-10"
            >
              Send Message
            </Button>
          </form>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 items-center gap-y-20 md:gap-x-5 h-full w-full p-10 lg:w-[1000px] lg:p-0 lg:pt-10">
          <article className="relative bg-white shadow-md flex justify-center w-full h-full">
            <h3 className="absolute bg-orange-500 p-5 w-2/3 rounded-md -top-10 text-center text-white text-xl font-semibold whitespace-nowrap	">
              Branch No 1
            </h3>
            <div className="p-4 mt-10 text-gray-400">
              <p>Address: Kabul, Afghanistan</p>
              <p>Email: info.branch1@gmail.com</p>
              <p>Phone: +02 3433 343 43</p>
              <p>Web: www.branch1.com</p>
            </div>
          </article>
          <article className="relative bg-white shadow-md flex justify-center w-full h-full">
            <h3 className="absolute bg-orange-500 p-5 w-2/3 rounded-md -top-10 text-center text-white text-xl font-semibold whitespace-nowrap	">
              Branch No 2
            </h3>
            <div className="p-4 mt-10 text-gray-400">
              <p>Address: Kabul, Afghanistan</p>
              <p>Email: info.branch2@gmail.com</p>
              <p>Phone: +02 3433 343 43</p>
              <p>Web: www.branch2.com</p>
            </div>
          </article>
          <article className="relative bg-white shadow-md flex justify-center w-full h-full">
            <h3 className="absolute bg-orange-500 p-5 w-2/3 rounded-md -top-10 text-center text-white text-xl font-semibold whitespace-nowrap	">
              Branch No 3
            </h3>
            <div className="p-4 mt-10 text-gray-400">
              <p>Address: Kabul, Afghanistan</p>
              <p>Email: info.branch3@gmail.com</p>
              <p>Phone: +02 3433 343 43</p>
              <p>Web: www.branch3.com</p>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
};

export default ContactUS;
