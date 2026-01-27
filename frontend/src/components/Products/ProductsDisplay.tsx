"use client";

import React from "react";
import ProductCard from "../Common/ProductCard";
import { useProduct } from "@/hook/useProduct";
import { ProductItem } from "@/services/product.service";
import Link from "next/link";

interface ProductDisplayProps {
  gridRow?: boolean;
  className?: string;
  products?: ProductItem[];
  isLoading: boolean;
  error?: Error;
  limit: number;
}

const ProductsDisplay: React.FC<ProductDisplayProps> = ({
  gridRow = false,
  className = "",
  products = [],
  isLoading = true,
  error = undefined,
  limit = 10,
}) => {
  if (isLoading) {
    return (
      <div className={className}>
        <div
          className={
            gridRow
              ? "flex space-x-6 overflow-hidden"
              : "grid grid-cols-2 md:grid-cols-5 gap-5"
          }
        >
          {[...Array(Number(limit))].map((_, i) => (
            <div
              key={i}
              className="w-full h-64 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Gagal memuat produk: {error.message}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        Tidak ada produk ditemukan.
      </div>
    );
  }

  return (
    <div
      className={`${
        gridRow
          ? "flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory pb-4"
          : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
      } ${className}`}
    >
      {products.map((product: ProductItem) => (
        <Link
          href={`/products/details/${product.id}`}
          key={product.id}
          className={`${gridRow ? "flex-shrink-0 snap-start w-60" : ""}`}
        >
          <ProductCard
            imgUrl={product.img_url || "/assets/placeholder.png"}
            imgWidth={150}
            imgHeight={150}
            name={product.name}
            quantity={`${product.unit_value} ${product.unit_label}`}
            rating={product.review_summary || 0}
            price={product.price}
            action={(e) => {
              e?.stopPropagation();
              console.log("Add to cart", product.id);
            }}
          />
        </Link>
      ))}
    </div>
  );
};
export default ProductsDisplay;
