import BackButton from "@/app/components/Common/BackButton";
import ProductsDisplay from "@/app/components/Products/ProductsDisplay";
import React from "react";

interface AllProductsProps {
  params: { mode: string };
}

const modeTitleMap: Record<string, string> = {
  "nearby-available": "Nearest Products",
  all: "All Products",
  popular: "Popular",
};

const AllProducts = ({ params }: AllProductsProps) => {
  const { mode } = params;
  const title = modeTitleMap[mode] || "Daftar Produk";

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 flex flex-col gap-5 sm:gap-6 lg:gap-8">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4 self-center">{title}</h1>
      <ProductsDisplay />
    </div>
  );
};

export default AllProducts;
