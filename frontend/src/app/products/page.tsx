import React from "react";
import Navbar from "@/components/Products/Navbar";
import Hero from "@/components/Products/Hero";
import Categories from "@/components/Products/Categories";
import ProductCard from "@/components/Common/ProductCard";
import Link from "next/link";
import ProductsDisplay from "@/components/Products/ProductsDisplay";
import Article from "@/components/Products/Article";
import Footer from "@/components/Common/Footer";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
      <div className="mx-5 sm:mx-12 md:mx-16 lg:mx-24 xl:mx-32 flex flex-col gap-5 sm:gap-6 lg:gap-8">
        <Hero />
        <Categories />

        {/* All Products Section */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0"
          id="product"
        >
          <span className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold">
            All Products
          </span>
          <Link
            className="text-neutral-400 text-base sm:text-xl lg:text-2xl font-bold duration-200 transition-all hover:border-b-1"
            href="/products/all/all"
          >
            View All
          </Link>
        </div>

        <ProductsDisplay />

        <Article />

        {/* Nearby Available Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <span className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold">
            Nearby Available
          </span>
          <Link
            className="text-neutral-400 text-base sm:text-xl lg:text-2xl font-bold duration-200 transition-all hover:border-b-1"
            href="/products/all/nearby-available"
          >
            View All
          </Link>
        </div>
        <ProductsDisplay gridRow={true} />

        {/* Popular in Your Area Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <span className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold">
            Popular in your area
          </span>
          <Link
            className="text-neutral-400 text-base sm:text-xl lg:text-2xl font-bold duration-200 transition-all hover:border-b-1"
            href="/products/all/popular"
          >
            View All
          </Link>
        </div>
        <ProductsDisplay gridRow={true} className="" />
      </div>
    </div>
  );
}
