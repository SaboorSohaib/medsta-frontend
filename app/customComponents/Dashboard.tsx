import { useGetOrderCalculationQuery } from "@/redux/api/orderApi";
import { it } from "node:test";
import React from "react";

const Dashboard = () => {
  const { data } = useGetOrderCalculationQuery("");
  console.log("🚀 ~ Dashboard ~ data:", data?.data);

  return (
    <main className="flex flex-col gap-5">
      <section className="grid grid-cols-1 justify-between w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data?.data.map((item: any, index: number) => (
          <article key={index} className="border border-gray-300 p-3 w-full">
            {Object.entries(item).map(([key, value]: any) => (
              <div key={key}>
                <strong className="capitalize">
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2")}:
                </strong>{" "}
                <p>{value}</p>
              </div>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
