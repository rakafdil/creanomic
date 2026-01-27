"use client";

import React from "react";
import Navbar from "@/components/Products/Navbar";
import ProductsDetail from "@/components/Products/Details/ProductsDetails";
import ProductTabs from "@/components/Products/Details/index";
import Footer from "@/components/Common/Footer";
import BackButton from "@/components/Common/BackButton";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", params.id],

    queryFn: () => productService.getProductById(params.id),

    select: (response) => response.data,
  });

  if (isLoading) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="px-4 sm:px-6 lg:mx-30 flex flex-col gap-1">
        <BackButton />
        {/* Now you can pass 'product' directly */}
        {product && <ProductsDetail product={product.data} />}
        <ProductTabs />
      </div>
    </div>
  );
}
