import { Button } from "@/components/ui/button";
import {
  useCrateProductReviewMutation,
  useGetReviewsByProductIdQuery,
} from "@/redux/api/productReviewApi";
import Image from "next/image";
import React, { useState } from "react";
import formatDate from "@/lib/formatDate";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useGetCurrentUserQuery } from "@/redux/api/userApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const ProductDetailsData = ({
  description,
  productId,
}: {
  description: string;
  productId: string;
}) => {
  const reviewSchema = z.object({
    reviewer_name: z.string().min(1, "Reviewer name is required"),
    reviewer_email: z.string().min(1, "Reviewer email is required"),
    review_description: z.string().min(1, "Review description is required"),
    review_rating: z.number({ message: "Review rating is required" }).min(1),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(reviewSchema) });
  const [button, setButton] = useState("description");
  const { data, isLoading } = useGetReviewsByProductIdQuery({
    id: productId,
    size: 10,
  });
  const { data: userData } = useGetCurrentUserQuery(null);
  const ProductReviews = data?.data || [];
  const [rating, setRating] = useState(0);
  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue("review_rating", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const { toast } = useToast();
  const [crateProductReview] = useCrateProductReviewMutation();
  const onSubmit = async (data: any) => {
    const ReviewData = {
      reviewer_name: data.reviewer_name,
      reviewer_email: data.reviewer_email,
      review_description: data.review_description,
      review_rating: data.review_rating,
      reviewer_photo:
        userData && userData.photo
          ? userData.photo
          : "https://ik.imagekit.io/gbfjo9pxy/customer_0YHFFKZx2.jpg?updatedAt=1726309483555",
      product_id: productId,
    };
    if (productId) {
      const createdReviewe = await crateProductReview(ReviewData).unwrap();
      if (createdReviewe.success) {
        reset();
        setRating(0);
        toast({
          variant: "success",
          title: "Success",
          description: "Review added successfully",
        });
      }
      return createdReviewe;
    }
  };
  return (
    <main className="flex flex-col gap-10 w-full md:w-[80%] p-5">
      <div>
        <h2 className="text-3xl font-medium p-1">Product Details</h2>
        <hr className="bg-orange-500" />
      </div>
      <section className="flex flex-col gap-y-4 md:flex-row md:gap-x-6 w-full">
        <div className="flex flex-col gap-y-2">
          <div
            onClick={() => setButton("description")}
            className={`py-4 text-xl w-[250px] rounded-md ${
              button === "description"
                ? "bg-orange-500 text-white cursor-pointer text-center hover:bg-orange-500"
                : "bg-white hover:bg-white cursor-pointer text-center text-black shadow-md"
            }`}
          >
            Description
          </div>
          <div
            onClick={() => setButton("review")}
            className={`py-4 text-xl w-[250px] rounded-md ${
              button === "review"
                ? "bg-orange-500 text-white cursor-pointer text-center hover:bg-orange-500"
                : "bg-white hover:bg-white cursor-pointer text-center text-black shadow-md"
            }`}
          >
            Our Review({ProductReviews?.length})
          </div>
        </div>
        <div className="w-full">
          {button === "description" ? (
            <div className="bg-white shadow-md p-5 ">
              <p>{description}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 w-full md:w-[80%]">
              {ProductReviews.map((review: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col gap-y-5 border border-gray-300 shadow-md p-5"
                >
                  <div className="flex gap-x-4">
                    <Image
                      src={review?.reviewer_photo}
                      alt="reviewer photo"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col gap-y-4">
                      <div className="flex items-center gap-x-2">
                        <p className="capitalize text-1xl font-bold">
                          {review?.reviewer_name}
                        </p>
                        <span className="text-gray-400">
                          - {formatDate(review?.createdAt)}
                        </span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => {
                          return (
                            <Star
                              key={star}
                              className={
                                star <= review?.review_rating
                                  ? "text-orange-500"
                                  : "text-gray-400"
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>{review?.review_description}</p>
                  </div>
                </div>
              ))}
              <div className="py-10">
                <div className="flex flex-col gap-y-2 pb-10">
                  <h2 className="text-2xl font-medium">Leave A Comment</h2>
                  <p className="text-gray-400">
                    Your email address will not be shared.
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="flex gap-x-4">
                    <div className="flex flex-col gap-y-2 w-full">
                      <Label htmlFor="your name" className="text-lg">
                        Your Name
                      </Label>
                      <Input
                        id="your name"
                        type="text"
                        className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                        placeholder="Your name"
                        {...register("reviewer_name")}
                      />
                      {errors?.reviewer_name?.message && (
                        <p className=" text-red-700 -mt-1">
                          {errors?.reviewer_name.message as any}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                      <Label htmlFor="email" className="text-lg">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                        {...register("reviewer_email")}
                      />
                      {errors?.reviewer_email?.message && (
                        <p className=" text-red-700 -mt-1">
                          {errors?.reviewer_email.message as any}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 mt-4">
                    <div className="flex flex-col gap-y-2">
                      <Label htmlFor="description" className="text-lg">
                        Your Messge
                      </Label>
                      <Textarea
                        id="description"
                        className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                        placeholder="Your messge"
                        {...register("review_description")}
                      />
                      {errors?.review_description?.message && (
                        <p className=" text-red-700 -mt-1">
                          {errors?.review_description.message as any}
                        </p>
                      )}
                    </div>
                    <div className="py-10 flex flex-col gap-y-4">
                      <p className="text-lg">Your Rating</p>
                      <div className="flex flex-col">
                        <article className="flex pb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              onClick={() => handleRatingClick(star)}
                              className={
                                star <= rating
                                  ? "text-orange-500 cursor-pointer"
                                  : "text-gray-400 cursor-pointer"
                              }
                            />
                          ))}
                        </article>
                        <input type="hidden" {...register("review_rating")} />
                        {errors?.review_rating?.message && (
                          <p className=" text-red-700 -mt-1">
                            {errors?.review_rating.message as any}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-500"
                  >
                    Post Comment
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsData;
