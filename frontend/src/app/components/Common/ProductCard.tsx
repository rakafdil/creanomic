import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";

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
    <div className="bg-[#F0F0F0] rounded-2xl shadow-md py-7.5 px-5 flex flex-col h-80 gap-11">
      {/* Gambar Produk */}
      <div className="flex relative w-full justify-center h-25">
        <Image
          src={imgUrl}
          alt={name}
          width={imgWidth}
          height={imgHeight}
          className="object-contain rounded-xl h-25"
        />
      </div>

      {/* Info Produk */}
      <div className="flex flex-col gap-2.5 mt-3 text-left">
        <h3 className="text-green-950 text-2xl font-bold truncate">{name}</h3>
        <div className="flex justify-between text-neutral-400 text-base font-semibold">
          <p className="">{quantity}</p>
          {/* Rating */}
          <div className="flex items-center justify-center gap-1.5">
            <FaStar className="text-[#FFC107]" />
            <span className="">({rating}/5)</span>
          </div>
        </div>

        {/* Harga */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-[#0A3917] text-lg">
            Rp{price.toLocaleString("id-ID")}
          </p>
          <button className="cursor-pointer transform hover:scale-120 transition-transform duration-200">
            <AiFillPlusCircle className="text-[#0A3917] text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
