"use client";
import React, { Fragment } from "react";
import HomePageBanner from "../customComponents/HomePageBanner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/slice/cartSlice";
import { Button } from "@/components/ui/button";
import NotFound from "../customComponents/NotFound";
import { useGetUserAddressQuery } from "@/redux/api/addressApi";
import { useToast } from "@/hooks/use-toast";
import { useGetCurrentUserQuery } from "@/redux/api/userApi";
import Link from "next/link";
import Address from "../customComponents/CreateAddress";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const itesmInCart = useSelector((state: any) => state.cart.cartItems);
  const getTotalPrice = () => {
    return itesmInCart.reduce(
      (accumulator: any, item: any) =>
        accumulator + item.quantity * item.product_price,
      0
    );
  };

  const { data: userData } = useGetCurrentUserQuery(null);
  const { data: addressData } = useGetUserAddressQuery(userData?.data?.id);
  const router = useRouter();
  const [createOrder, { isSuccess }] = useCreateOrderMutation();
  const handleSubmit = async () => {
    try {
      const orderData = {
        first_name: userData?.data?.first_name,
        last_name: userData?.data?.last_name,
        phone_number: userData?.data?.phone_number,
        email: userData?.data?.email,
        products: itesmInCart,
        user_address: addressData?.data?.id,
        total_products: itesmInCart?.length,
        total_price: getTotalPrice(),
      };
      const createdOrder = await createOrder(orderData).unwrap();
      if (createdOrder?.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Order placed successfully.",
        });
        dispatch(clearCart());
      }
      return createdOrder;
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error?.data?.message,
      });
    }
  };
  return (
    <main className="flex flex-col items-center">
      {isSuccess ? (
        <main className="flex flex-col items-center w-full">
          <section className="w-full">
            <HomePageBanner
              isHome={false}
              title="Order Success"
              from="Home"
              to="Order Success"
            />
          </section>
          <section className="py-20 px-10 flex flex-col items-center text-center text-xl md:text-2xl font-bold">
            <h2>You order has been successfully placed.</h2>
            <p>Thanks for trusting us.</p>
            <Link
              href={"/"}
              className="bg-orange-500 hover:bg-orange-500 p-3 text-white shadow-md rounded-md mt-10"
            >
              Back to Home
            </Link>
          </section>
        </main>
      ) : (
        <>
          <section className="w-full">
            <HomePageBanner
              isHome={false}
              title="Checkout"
              from="Home"
              to="Checkout"
            />
          </section>
          {userData?.data ? (
            <>
              {itesmInCart?.length > 0 ? (
                <section className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-10 w-full py-20 px-10 lg:px-20">
                  <section className="w-full flex gap-y-4 flex-col">
                    <div className="shadow-md p-10 flex flex-col gap-5 bg-white">
                      <h2 className="text-2xl font-semibold">
                        Billing Details
                      </h2>
                      <article className="grid grid-cols-2">
                        <p className="font-bold">First name:</p>{" "}
                        <p>{userData?.data?.first_name}</p>
                        <p className="font-bold">Lasr name:</p>{" "}
                        <p>{userData?.data?.last_name}</p>
                        <p className="font-bold">Phone number:</p>{" "}
                        <p>{userData?.data?.phone_number}</p>
                        <p className="font-bold">Email:</p>{" "}
                        <p>{userData?.data?.email}</p>
                      </article>
                      <Address
                        country={addressData?.data?.country}
                        city={addressData?.data?.city}
                        state={addressData?.data?.state}
                        zip_code={addressData?.data?.zip_code}
                      />
                    </div>
                    <div className="flex flex-col gap-y-4 shadow-md p-10 bg-white">
                      <h2 className="text-2xl font-semibold">
                        Ship to a Different Address
                      </h2>
                      <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-2 w-full">
                          <Label htmlFor="first name" className="text-sm">
                            First Name
                          </Label>
                          <Input
                            id="first name"
                            className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                            placeholder="First name (Optional)"
                            {...register("reviewer_name")}
                          />
                        </div>
                        <div className="flex flex-col gap-y-2 w-full">
                          <Label htmlFor="last name" className="text-sm">
                            Last Name
                          </Label>
                          <Input
                            className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                            id="last name"
                            placeholder="Last name (Optional)"
                            {...register("reviewer_name")}
                          />
                        </div>
                      </div>
                      <Textarea
                        placeholder="Order Notes (Optional)"
                        className="p-5 focus-visible:ring-offset-0 focus-visible:ring-0"
                        {...register("review_description")}
                      />
                    </div>
                  </section>
                  <section className="w-full flex flex-col gap-y-4">
                    <section className="border border-gray-200 p-10 bg-white">
                      <h2 className="text-2xl font-semibold pb-10">
                        Order Summary
                      </h2>
                      {itesmInCart.map((item: any, index: number) => (
                        <Fragment key={index}>
                          <hr />
                          <article className="flex gap-x-10 py-5 h-[150px]">
                            <div className="flex flex-col justify-between h-full w-full">
                              <Image
                                src={item?.product_photo}
                                alt="product photo"
                                width={70}
                                height={70}
                                className=""
                              />
                              <p>${item?.product_price}</p>
                            </div>
                            <div className="flex flex-col justify-between h-full w-full">
                              <p>{item?.product_title}</p>
                              <Button
                                disabled={!item?.quantity}
                                className="bg-gray-200 hover:bg-gray-200 flex justify-between w-[100px]"
                              >
                                <div className="flex justify-between items-center w-full">
                                  <Minus
                                    onClick={() =>
                                      dispatch(decrementQuantity(item?.id))
                                    }
                                    size={18}
                                    color="black"
                                  />
                                  <p className="text-black text-lg">
                                    {item?.quantity ? item?.quantity : 0}
                                  </p>
                                  <Plus
                                    onClick={() =>
                                      dispatch(incrementQuantity(item?.id))
                                    }
                                    size={18}
                                    color="black"
                                  />
                                </div>
                              </Button>
                            </div>
                            <div className="flex flex-col justify-between h-full w-full">
                              <Button
                                onClick={() =>
                                  dispatch(removeFromCart(item?.id))
                                }
                              >
                                Remove
                              </Button>
                              <p>${item?.quantity * item?.product_price}</p>
                            </div>
                          </article>
                          <hr />
                        </Fragment>
                      ))}
                    </section>
                    <article className="border border-gray-200 p-8 bg-white">
                      <div className="flex flex-col justify-between text-lg font-semibold pb-3">
                        <div className="flex justify-between">
                          <p>Subtotal</p>
                          <p>${getTotalPrice()}</p>
                        </div>
                        <div className="flex justify-between">
                          <p>Total</p>
                          <p>${getTotalPrice()}</p>
                        </div>
                      </div>
                    </article>

                    <Button onClick={handleSubmit}>Place an order</Button>
                  </section>
                </section>
              ) : (
                <section className="w-full">
                  <NotFound
                    isComponent={false}
                    description="There is nothing in your card, please go and add a product to the cart."
                  />
                </section>
              )}
            </>
          ) : (
            <section className="h-full py-20">
              Please{" "}
              <Link className="underline" href={"/signin"}>
                {" "}
                sign in
              </Link>{" "}
              before you checkout
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default Checkout;
