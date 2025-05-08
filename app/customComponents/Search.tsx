"use client";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchProductQuery } from "@/redux/api/productApi";
import debounce from "lodash.debounce";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debouncedSearch = useCallback(
    debounce((value: any) => {
      setDebouncedQuery(value);
    }, 500),
    []
  );
  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  const { data, error, isLoading } = useSearchProductQuery(debouncedQuery, {
    skip: !debouncedQuery,
  });

  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setSearchResult(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className=" w-full relative" ref={ref}>
      <div
        onClick={() => setSearchResult(true)}
        className="flex items-center pl-3 rounded-full p-2 bg-white w-full"
      >
        <SearchIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          className="focus-visible:ring-offset-0 focus-visible:ring-0 border-none text-black"
          placeholder="Search Your Products..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      {searchResult && (
        <section className="absolute z-30 top-16 w-full h-56 overflow-hidden overflow-y-auto rounded-md bg-white text-black">
          {isLoading ? (
            <section className="flex justify-center items-center h-full">
              <p>Loading...</p>
            </section>
          ) : error ? (
            <section className="flex justify-center items-center h-full">
              <p>Failed to fetch</p>
            </section>
          ) : (
            <section className="p-2 h-full">
              {data?.data.length > 0 && debouncedQuery ? (
                <>
                  {data?.data.map((item: any) => (
                    <Link
                      href={`/product/${item?.id}`}
                      key={item.id}
                      className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-md duration-200"
                    >
                      <article className="flex gap-4">
                        <article>
                          <Image
                            src={item?.product_photo}
                            alt="product phote"
                            width={50}
                            height={70}
                            className="rounded-md h-full"
                          />
                        </article>
                        <article className="flex flex-col items-start">
                          <p className="text-xs font-bold sm:text-sm line-clamp-1">
                            {item?.product_title}
                          </p>
                          <div className="flex gap-2">
                            <p>${item?.product_price}</p>
                            <p className="h-full w-[1px] bg-gray-500"></p>
                            <p>{item?.category_id?.category_name}</p>
                          </div>
                        </article>
                      </article>
                      <MdKeyboardArrowRight size={20} />
                    </Link>
                  ))}
                </>
              ) : data?.data.length < 1 && debouncedQuery ? (
                <article className="flex justify-center items-center h-full">
                  <p>No Results</p>
                </article>
              ) : (
                <article className="flex justify-center items-center h-full">
                  <p>Search Products</p>
                </article>
              )}
            </section>
          )}
        </section>
      )}
    </main>
  );
};

export default Search;
