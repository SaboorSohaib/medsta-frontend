/* eslint-disable react/no-unescaped-entities */
import React from "react";
import HomePageBanner from "../customComponents/HomePageBanner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import WhyChooseUs from "../customComponents/WhyChooseUs";
import Service from "../customComponents/Service";

const AboutUs = () => {
  return (
    <main className="w-full">
      <HomePageBanner
        isHome={false}
        title="About Us"
        from="Home"
        to="About Us"
      />
      <div className="hidden lg:flex h-[800px] justify-center w-full py-20 px-20">
        <div className="flex justify-center">
          <div className="relative right-1/2">
            <Image
              src="https://ik.imagekit.io/gbfjo9pxy/customer_0YHFFKZx2.jpg"
              alt="Customers in a store"
              className="rounded-xl h-[600px] w-[550px]"
              width={200}
              height={500}
            />
            <div className="absolute bottom-4 -left-8 bg-orange-500 text-white font-semibold py-2 px-4 rounded-md">
              76,250+ <br /> Customers
            </div>
          </div>
          <div className="w-[40%] absolute rounded-xl shadow-lg mt-10 right-64 p-6 flex flex-col justify-between bg-white">
            <div>
              <h2 className="text-gray-700 text-2xl font-semibold">
                Welcome to Medsta Store
              </h2>
              <h3 className="text-gray-900 text-3xl font-bold mt-4">
                What can a great About Us page do for your business?
              </h3>
              <p className="text-gray-600 mt-4">
                An About Us page helps your company make a good first
                impression, and is critical for building customer trust and
                loyalty. An About Us page should make sure to cover basic
                information about the store and its founders, explain the
                company's purpose and how it differs from the competition, and
                encourage discussion and interaction.
              </p>
              <p className="text-gray-600 mt-4">
                Ius ferri velit sanctus cu, sed at soleat accusata. Dictas
                prompta et Ut placerat legendos interpre.Donec vitae sapien ut
                libero venenatis faucibus.
              </p>
            </div>
            <div className="flex items-center mt-8 space-x-4">
              <div className="bg-gray-100 p-4 rounded-md">
                <Image
                  src="https://ik.imagekit.io/gbfjo9pxy/bgImage_IxbhYhGpi.jpg"
                  alt="Original Quality Badge"
                  className="h-20 w-20"
                  width={20}
                  height={20}
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <Image
                  src="https://ik.imagekit.io/gbfjo9pxy/bgImage_IxbhYhGpi.jpg"
                  alt="Guarantee Badge"
                  className="h-20 w-20"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="pt-10">
              <Button
                type="button"
                className="bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                Read More
              </Button>
            </div>
          </div>
        </div>
      </div>
      <section className="flex justify-center py-20 px-10">
        <iframe
          width="1000"
          height="400"
          src="https://www.youtube.com/embed/xBk9IuSSBlo?si=cbZt1-ORzO3iYGWT"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>
      <WhyChooseUs />
      <Service />
    </main>
  );
};

export default AboutUs;
