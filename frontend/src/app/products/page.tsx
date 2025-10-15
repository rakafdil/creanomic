import React from "react";
import Navbar from "../components/Products/Navbar";
import Hero from "../components/Products/Hero";
import Categories from "../components/Products/Categories";
import ProductCard from "../components/Common/ProductCard";
import Link from "next/link";
import ProductsDisplay from "../components/Products/ProductsDisplay";
import Article from "../components/Products/Article";
import Footer from "../components/Common/Footer";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="mx-32 flex flex-col gap-8">
        <Hero />
        <Categories />
        <div className="flex justify-between items-center" id="product">
          <span className="text-black text-4xl font-bold">All Products</span>
          <Link
            className="text-neutral-400 text-2xl font-bold duration-200 transition-all hover:border-b-1"
            href="/products/all"
          >
            View All
          </Link>
        </div>

        <ProductsDisplay />
        <Article />
        <div className="flex justify-between items-center">
          <span className="text-black text-4xl font-bold">
            Nearby Available
          </span>
          <Link
            className="text-neutral-400 text-2xl font-bold duration-200 transition-all hover:border-b-1"
            href="/products/nearby-available"
          >
            View All
          </Link>
        </div>
        <ProductsDisplay gridRow={true} />
        <div className="flex justify-between items-center">
          <span className="text-black text-4xl font-bold">
            Popular in your area
          </span>
          <Link
            className="text-neutral-400 text-2xl font-bold duration-200 transition-all hover:border-b-1"
            href="/products/popular"
          >
            View All
          </Link>
        </div>
        <ProductsDisplay gridRow={true} className="" />
      </div>
    </div>
  );
}
