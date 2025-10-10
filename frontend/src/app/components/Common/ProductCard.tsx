import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  imgUrl: string;
  imgWidth: number;
  imgHeight: number;
  name: string;
  quantity: string;
  rating: number;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imgUrl,
  imgWidth,
  imgHeight,
  name,
  quantity,
  rating,
  price,
}) => {
  return (
    <div className="bg-[#F0F0F0] rounded-2xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col items-center text-center cursor-pointer">
      {/* Gambar Produk */}
      <div className="relative">
        <Image
          src={imgUrl}
          alt={name}
          width={imgWidth}
          height={imgHeight}
          className="object-contain rounded-xl"
        />
      </div>

      {/* Info Produk */}
      <div className="mt-3">
        <h3 className="font-semibold text-[#0A3917] text-lg truncate">
          {name}
        </h3>
        <div className="flex justify-between items-center text-base">
          <p className=" text-[#8C8C8C]">{quantity}</p>
          {/* Rating */}
          <div className="flex items-center justify-center gap-1.5">
            <FaStar className="text-[#FFC107]" />
            <span className="text-[#8C8C8C]">({rating}/5)</span>
          </div>
        </div>

        {/* Harga */}
        <div className="mt-2">
          <p className="font-bold text-[#0A3917] text-lg">
            Rp{price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
