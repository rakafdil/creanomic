import React from "react";
import Image from "next/image"; // Note: The existing code uses <img> tag, so <Image> might be unused unless you switch. I'll stick to <img> for the modified code unless you want to optimize with next/image.
import { Product } from "@/types/Products";

// Fungsi formatRupiah tetap sama
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
    // Menggunakan padding yang lebih kecil secara default (mobile) dan padding desktop di lg:
    <div className="flex items-center justify-between py-2 lg:py-3 border-b border-gray-200 lg:border-none">
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Kontainer Gambar: Ukuran lebih kecil di mobile, dan ukuran desktop di lg: */}
        <div className="bg-[#D9D9D9]/80 rounded-xl lg:rounded-2xl p-1 lg:p-2">
          <img
            src={image}
            alt={name}
            // Dimensi gambar: Lebih kecil di mobile (w-12 h-12) dan ukuran desktop di lg: (w-16 h-16)
            className="text-xs w-12 h-12 lg:w-16 lg:h-16 object-contain"
          />
        </div>
        <div>
          {/* Nama Produk: Ukuran font lebih kecil di mobile (text-lg) dan ukuran desktop di lg: (text-2xl) */}
          <p className="font-medium text-md lg:text-2xl">{name}</p>
          {/* Kuantitas: Ukuran font lebih kecil di mobile (text-base) dan ukuran desktop di lg: (text-lg) */}
          <p className="text-sm lg:text-lg text-gray-500">{quantity}</p>
        </div>
      </div>
      {/* Harga: Ukuran font lebih kecil di mobile (text-lg) dan ukuran desktop di lg: (font-semibold tanpa perubahan ukuran) */}
      <p className="font-semibold text-md lg:text-2xl">{formatRupiah(price)}</p>
    </div>
  );
};

export default ProductListItem;
