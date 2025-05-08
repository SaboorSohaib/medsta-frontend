"use client";
import React, { Fragment } from "react";
import HomePageBanner from "../customComponents/HomePageBanner";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "@/redux/slice/cartSlice";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NotFound from "../customComponents/NotFound";
import { useGetCurrentUserQuery } from "@/redux/api/userApi";

const Cart = () => {
  const dispatch = useDispatch();
  const itesmInCart = useSelector((state: any) => state.cart.cartItems);
  const getTotalPrice = () => {
    return itesmInCart.reduce(
      (accumulator: any, item: any) =>
        accumulator + item.quantity * item.product_price,
      0
    );
  };
  return (
    <main className="flex flex-col items-center">
      <section className="w-full">
        <HomePageBanner isHome={false} title="Cart" from="Home" to="Cart" />
      </section>
      {itesmInCart?.length === 0 ? (
        <section className="w-full">
          <NotFound
            isComponent={false}
            description="There is nothing in your card, please go and add a product to the cart."
          />
        </section>
      ) : (
        <>
          <section className="w-full px-10 py-20 lg:px-20 md:flex md:flex-col md:gap-y-10 hidden">
            <h2 className="text-center text-3xl font-bold py-3">Cart</h2>
            <section className="w-full border border-gray-400">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itesmInCart.map((item: any, index: number) => (
                    <TableRow key={index} className="cursor-pointer">
                      <TableCell className="w-6">
                        <Image
                          src={item?.product_photo}
                          alt={"item.image"}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell>{item?.product_title}</TableCell>
                      <TableCell>{item?.product_price}</TableCell>
                      <TableCell>
                        <Button
                          disabled={!item?.quantity}
                          className="bg-gray-200 hover:bg-gray-200 flex justify-between w-[100px]"
                        >
                          <div className="flex justify-between  items-center w-full">
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
                      </TableCell>
                      <TableCell>
                        ${item?.quantity * item?.product_price}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => dispatch(removeFromCart(item?.id))}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
            <section className="flex">
              <section className="flex flex-col gap-y-10">
                <div className="flex flex-col border border-gray-400">
                  <div className="flex">
                    <p className="border border-b-gray-400 border-r-gray-400 w-[150px] text-lg font-semibold text-center py-4">
                      Cart Totals
                    </p>
                    <p className="border border-b-gray-400 w-[400px]"></p>
                    <p className="border border-b-gray-400 border-l-gray-400 w-[100px] text-center py-4 text-lg font-semibold">
                      ${getTotalPrice()}
                    </p>
                  </div>
                  <div>
                    <div className="flex">
                      <p className="border border-b-gray-400 border-r-gray-400 w-[150px] text-lg font-semibold text-center py-4">
                        Shipping
                      </p>
                      <div className="w-[400px] text-center border border-b-gray-400 text-gray-400"></div>
                      <div className="border border-l-gray-400 border-b-gray-400 w-[100px] text-center py-4 text-lg font-semibold">
                        Free
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <p className="border border-b-gray-400 border-r-gray-400 w-[150px] text-lg font-semibold text-center py-4">
                      Total
                    </p>
                    <div className="w-[400px]"></div>
                    <p className="border border-b-gray-400 border-l-gray-400 w-[100px] text-center py-4 text-lg font-semibold">
                      ${getTotalPrice()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Link
                    className="bg-orange-500 hover:bg-orange-500 text-white p-5"
                    href={"/check-out"}
                  >
                    Proceed To Checkout
                  </Link>
                  <Link href={"/product"} className="text-orange-500 underline">
                    Go To Shopping
                  </Link>
                </div>
              </section>
            </section>
          </section>
          <section className="py-20 px-10 md:hidden">
            <h2 className="text-center text-2xl font-bold py-3">Cart</h2>
            {itesmInCart.map((item: any, index: number) => (
              <Fragment key={index}>
                <hr />
                <article className=" flex gap-x-10 py-5 h-[150px]">
                  <div className="flex flex-col justify-between h-full">
                    <Image
                      src={item?.product_photo}
                      alt="product photo"
                      width={70}
                      height={70}
                      className=""
                    />
                    <p>${item?.product_price}</p>
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    <p>{item?.product_title}</p>
                    <Button
                      disabled={!item?.quantity}
                      className="bg-gray-200 hover:bg-gray-200 flex justify-between w-[100px]"
                    >
                      <div className="flex justify-between  items-center w-full">
                        <Minus
                          onClick={() => dispatch(decrementQuantity(item?.id))}
                          size={18}
                          color="black"
                        />
                        <p className="text-black text-lg">
                          {item?.quantity ? item?.quantity : 0}
                        </p>
                        <Plus
                          onClick={() => dispatch(incrementQuantity(item?.id))}
                          size={18}
                          color="black"
                        />
                      </div>
                    </Button>
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    <Button onClick={() => dispatch(removeFromCart(item?.id))}>
                      Remove
                    </Button>
                    <p>${item?.quantity * item?.product_price}</p>
                  </div>
                </article>
                <hr />
              </Fragment>
            ))}
            <article className="flex flex-col gap-y-2">
              <div className="flex justify-between pt-4 text-lg font-semibold">
                <p className="text-center">Cart Totals:</p>
                <p>${getTotalPrice()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold text-center">Shipping:</p>
                <div className="text-gray-400"></div>
                <div className="flex flex-col items-center text-lg font-semibold">
                  <p>Free</p>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold text-center">Total</p>
                <p className=" text-center text-lg font-semibold">
                  ${getTotalPrice()}
                </p>
              </div>
            </article>
            <div className="flex justify-between gap-4 items-center pt-3">
              <Link
                className="bg-orange-500 hover:bg-orange-500 text-white p-5"
                href={"/check-out"}
              >
                Proceed To Checkout
              </Link>
              <Link href={"/product"} className="text-orange-500 underline">
                Go To Shopping
              </Link>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Cart;
