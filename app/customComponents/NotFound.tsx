/* eslint-disable react/no-unescaped-entities */
import React from "react";
import HomePageBanner from "./HomePageBanner";
import Link from "next/link";

const NotFound = ({
  description = "The page you are looking for may have been renamed or does not existin this server.",
  isComponent,
}: {
  description?: string;
  isComponent?: boolean;
}) => {
  return (
    <main className="flex flex-col items-center">
      {isComponent && (
        <section className="w-full">
          <HomePageBanner
            isHome={false}
            title="404"
            from="Home"
            to="Error Page"
          />
        </section>
      )}
      <section className="flex flex-col items-center py-20">
        <article>
          <h2 className="text-6xl font-extrabold text-orange-500 pb-20">404</h2>
        </article>
        <article className="flex flex-col items-center gap-y-4">
          <h2 className="text-5xl font-bold">There's Nothing Here</h2>
          <p>{description}</p>
          <Link
            href={"/"}
            className="bg-orange-500 hover:bg-orange-500 p-3 text-white shadow-md rounded-md mt-10"
          >
            Back to Home
          </Link>
        </article>
      </section>
    </main>
  );
};

export default NotFound;
