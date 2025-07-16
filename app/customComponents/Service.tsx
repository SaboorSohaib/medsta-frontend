import { CircleDollarSign, CreditCard, Headset, Truck } from "lucide-react";
import React, { ReactElement } from "react";

type ServiceData = { image: ReactElement; title: string; subtitle: string }[];

const Service = () => {
  const data: ServiceData = [
    {
      image: <Truck />,
      title: "Fast Free Shipping",
      subtitle: "Around the world",
    },
    {
      image: <Headset />,
      title: "24/7 Supports",
      subtitle: "Contact us 24 hours",
    },
    {
      image: <CircleDollarSign />,
      title: "100% Money Back",
      subtitle: "Guarantee of money return",
    },
    {
      image: <CreditCard />,
      title: "100% Secure Payment",
      subtitle: "Your payment are safe with us",
    },
  ];
  return (
    <main className="flex justify-center pb-20">
      <section className="grid grid-cols-1 gap-y-5 justify-center sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 px-10">
        {data?.map((element: any, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-y-2 items-center w-full bg-white shadow-lg p-5"
          >
            <div>{element?.image}</div>
            <p className="text-1xl font-semibold text-center">
              {element?.title}
            </p>
            <p className="text-gray-400 text-center">{element?.subtitle}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Service;
