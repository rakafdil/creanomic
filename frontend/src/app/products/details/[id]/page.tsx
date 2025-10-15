import React from "react";
import Navbar from "../../../components/Products/Navbar";
import ProductsDetail from "../../../components/Products/Details/ProductsDetails";
import ProductTabs from "../../../components/Products/Details/index";
import Footer from "@/app/components/Common/Footer";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="mx-32 flex flex-col gap-1">
        <ProductsDetail />
        <ProductTabs />
      </div>
    </div>
  );
}
