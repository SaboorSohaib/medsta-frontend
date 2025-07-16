"use client";
import HomePageBanner from "@/app/customComponents/HomePageBanner";
import { Button } from "@/components/ui/button";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { Minus, Plus, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/slice/cartSlice";
import ProductDetailsData from "@/app/customComponents/ProductDetails";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/ui/spinner";

const ProductDetails = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const id = param?.id;
  const { data, isLoading } = useGetSingleProductQuery(id);
  const productData = data?.data || [];
  const { product_photo, product_title, product_price } = productData;
  const items = useSelector((state: any) => state.cart.cartItems);
  const Itemquantity = items
    .map((item: any) => {
      if (item.id === productData?.id) {
        return item?.quantity;
      }
    })
    .filter((item: any) => item !== undefined);
  const { toast } = useToast();
  const handleAddToCart = () => {
    const productToAdd = {
      id,
      product_photo,
      product_title,
      product_price,
    };
    dispatch(addToCart(productToAdd));
    toast({
      variant: "success",
      title: "Success",
      description: `Item ${productToAdd.product_title} added successfully`,
    });
  };
  return (
    <main>
      <HomePageBanner
        isHome={false}
        title="Product Details"
        from="Home"
        to="Product Details"
      />

      <section className="flex flex-col justify-center items-center gap-y-10 py-20 px-10">
        {isLoading ? (
          <section className="h-[500px] flex justify-center">
            <Spinner size={"medium"} />
          </section>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="">
                <Image
                  src={
                    "https://ik.imagekit.io/gbfjo9pxy/connor-gan-19ax9amROko-unsplash_lHQ9XASFb.jpg?updatedAt=1726309304015"
                  }
                  width={500}
                  height={500}
                  alt="product photo"
                  className="h-full w-[80%] md:w-full"
                />
              </div>
              <div className="flex flex-col gap-y-3 md:w-[500px]">
                <div className="flex flex-col gap-y-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating = productData?.average_rating || 0;

                      return (
                        <span key={star}>
                          {star <= Math.floor(rating) ? (
                            <Star className="text-orange-500" />
                          ) : star - rating <= 0.5 ? (
                            <StarHalf className="text-orange-500" />
                          ) : (
                            <Star className="text-gray-400" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <h2 className="text-3xl font-semibold">
                    {productData?.product_title}
                  </h2>
                  <p className="text-3xl font-semibold text-orange-500">
                    ${productData?.product_price}
                  </p>
                </div>
                <hr />
                <p className="text-gray-400">
                  {productData?.product_description ||
                    "Lorem ipsum, dolor sit nisi impedit ea sequiPerferendis amet distinctio quidem veritatis ex iure."}
                </p>
                <hr />
                <div>
                  <div className="flex items-center gap-x-2 pb-5 pt-3">
                    <Button
                      disabled={!Itemquantity[0]}
                      className="bg-gray-200 hover:bg-gray-200 flex justify-between w-[100px]"
                    >
                      <div className="flex justify-between items-center w-full">
                        <Minus
                          onClick={() =>
                            dispatch(decrementQuantity(productData?.id))
                          }
                          size={18}
                          color="black"
                        />
                        <p className="text-black text-lg">
                          {Itemquantity[0] ? Itemquantity[0] : 0}
                        </p>
                        <Plus
                          onClick={() =>
                            dispatch(incrementQuantity(productData?.id))
                          }
                          size={18}
                          color="black"
                        />
                      </div>
                    </Button>
                    <Button
                      disabled={Itemquantity[0]}
                      className="bg-orange-500 hover:bg-orange-500 px-8"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </Button>
                    <Link href={"/cart"} className="underline">
                      Go to Cart
                    </Link>
                  </div>
                  <p className="text-lg text-gray-400">
                    Product Type:{" "}
                    <span className="text-base">
                      {productData?.product_type}
                    </span>
                  </p>
                  <p className="text-lg text-gray-400">
                    Category:{" "}
                    <span className="text-base">
                      {productData?.category?.category_name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <ProductDetailsData
              description={productData?.product_description}
              productId={productData?.id}
            />
          </>
        )}
      </section>
    </main>
  );
};

export default ProductDetails;
