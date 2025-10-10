import React from "react";
import Navbar from "../components/Products/Navbar";
import Hero from "../components/Products/Hero";
import Categories from "../components/Products/Categories";
import ProductCard from "../components/Common/ProductCard";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 inline-flex justify-center items-center gap-2.5">
        <div className="text-center justify-start text-white text-sm font-bold font-['Inter']">
          Welcome to GrowthWell
        </div>
      </div>
      <div className="mx-32 flex flex-col gap-8">
        <Navbar />
        <Hero />
        <Categories />
        <ProductCard
          imgUrl={"/assets/products/image 30.svg"}
          imgWidth={200}
          imgHeight={200}
          name={"Avocado"}
          quantity={"2 pcs"}
          rating={3.5}
          price={10000}
        />
      </div>
    </div>
  );
}
