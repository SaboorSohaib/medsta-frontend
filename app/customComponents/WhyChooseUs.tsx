import React, { ReactElement } from "react";
import { GiCabbage, GiFruitBowl, GiPumpkin } from "react-icons/gi";
import { PiOrangeFill } from "react-icons/pi";

type WhyChooseUsData = {
  image: ReactElement;
  title: string;
  subtitle: string; 
}[];
const WhyChooseUs = () => {
  const data: WhyChooseUsData = [
    {
      image: <GiFruitBowl size={22} color="orange" />,
      title: "100% Organic",
      subtitle: "Around the world",
    },
    {
      image: <GiCabbage size={22} color="orange" />,
      title: "Free Delivery",
      subtitle: "Contact us 24 hours",
    },
    {
      image: <GiPumpkin size={22} color="orange" />,
      title: "100% Satisfaction",
      subtitle: "Guarantee of money return",
    },
    {
      image: <PiOrangeFill size={22} color="orange" />,
      title: "Great Daily Deal",
      subtitle: "Your payment are safe with us",
    },
    {
      image: <GiFruitBowl size={22} color="orange" />,
      title: "Wide Assortment",
      subtitle: "Around the world",
    },
    {
      image: <GiCabbage size={22} color="orange" />,
      title: "Premiun Quality",
      subtitle: "Contact us 24 hours",
    },
    {
      image: <GiPumpkin size={22} color="orange" />,
      title: "Always Fresh",
      subtitle: "Guarantee of money return",
    },
    {
      image: <PiOrangeFill size={22} color="orange" />,
      title: "Best Quality",
      subtitle: "Your payment are safe with us",
    },
  ];
  return (
    <main className="flex justify-center pb-20">
      <section className="grid grid-cols-1 gap-5 justify-center px-10 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((element: any, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-y-2 items-center w-full border border-gray-100 duration-300 bg-white p-5 hover:shadow-lg hover:border-transparent"
          >
            <div>{element?.image}</div>
            <p className="text-1xl font-semibold text-gray-500 text-center">
              {element?.title}
            </p>
            <p className="text-gray-400 text-center">{element?.subtitle}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default WhyChooseUs;
