import React from "react";
import Image from "next/image";
import { Product } from "@/Types/Products";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("Rp", "Rp ");
};

const ProductListItem = ({ name, quantity, price, image }: Product) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="bg-[#D9D9D9]/80 rounded-2xl p-2">
          <img
            src={image}
            alt={name}
            className="text-sm w-16 h-16 object-contain"
          />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-lg text-gray-500">{quantity}</p>
        </div>
      </div>
      <p className="font-semibold">{formatRupiah(price)}</p>
    </div>
  );
};

export default ProductListItem;
