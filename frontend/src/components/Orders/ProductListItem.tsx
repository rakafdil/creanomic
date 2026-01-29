import React from "react";
import Image from "next/image";
import { CartItem } from "@/types/Products";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("Rp", "Rp ");
};

const ProductListItem = ({ products, quantity, price }: CartItem) => {
  return (
    <div className="flex items-center justify-between py-2 lg:py-3 border-b border-gray-200 lg:border-none">
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-xl bg-gray-200">
          <Image
            src={products.img_url}
            alt={products.name}
            width={56}
            height={56}
            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
        <div>
          <p className="font-medium text-md lg:text-xl">{products.name}</p>
          <p className="text-sm lg:text-base text-gray-500">
            {quantity} x {products.unit_value} {products.unit_label}
          </p>
        </div>
      </div>
      <p className="font-semibold text-md lg:text-xl">{formatRupiah(price)}</p>
    </div>
  );
};

export default ProductListItem;
