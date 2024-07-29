import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Categories = () => {
  return (
    <div className="flex flex-col items-center">
      <p>what do you looking for</p>
      <Carousel className="">
        <CarouselContent>
          <CarouselItem className="basis-1/3">Fresh Fruits</CarouselItem>
          <CarouselItem className="basis-1/3">Drink</CarouselItem>
          <CarouselItem className="basis-1/3">Bakery</CarouselItem>
          <CarouselItem className="">Drink</CarouselItem>
          <CarouselItem className="">Bakery</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
