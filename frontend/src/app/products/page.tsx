"use client";
import React, { Suspense } from "react";
import Hero from "@/components/Products/Hero";
import Categories from "@/components/Products/Categories";
import Link from "next/link";
import ProductsDisplay from "@/components/Products/ProductsDisplay";
import Article from "@/components/Products/Article";
import { useProduct } from "@/hook/useProduct";

function ProductContent() {
  const { data, isLoading, error, limit, page } = useProduct();

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
            className="text-neutral-400 text-base sm:text-xl lg:text-2xl font-bold duration-200 transition-all hover:border-b-1 hover:text-green-500"
            href="/products/all"
          >
            View All
          </Link>
        </div>

        <ProductsDisplay
          limit={limit}
          products={data?.data}
          isLoading={isLoading}
          error={error ?? undefined}
        />

        <Article />

        {/* Nearby Available Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <span className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold">
            Nearby Available
          </span>
          <Link
            className="text-neutral-400 text-base sm:text-xl lg:text-2xl font-bold duration-200 transition-all hover:border-b-1"
            href="/products/nearby-available"
          >
            View All
          </Link>
        </div>
        <ProductsDisplay
          limit={limit}
          products={data?.data}
          isLoading={isLoading}
          error={error ?? undefined}
          gridRow={true}
        />

        {/* Popular in Your Area Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <span className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold">
            Popular in your area
          </span>
          <Link
            className="text-neutral-400 text-base sm:text-xl lg:text-2xl font-bold duration-200 transition-all hover:border-b-1"
            href="/products/popular"
          >
            View All
          </Link>
        </div>
        <ProductsDisplay
          limit={limit}
          products={data?.data}
          isLoading={isLoading}
          error={error ?? undefined}
          gridRow={true}
          className=""
        />
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}
