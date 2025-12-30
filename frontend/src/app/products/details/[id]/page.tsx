import React from "react";
import Navbar from "../@/components/Products/Navbar";
import ProductsDetail from "../@/components/Products/Details/ProductsDetails";
import ProductTabs from "../@/components/Products/Details/index";
import Footer from "@/app/components/Common/Footer";
import BackButton from "@/app/components/Common/BackButton";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="px-4 sm:px-6 lg:mx-30 flex flex-col gap-1">
        <BackButton />
        <ProductsDetail />
        <ProductTabs />
      </div>
    </div>
  );
}
