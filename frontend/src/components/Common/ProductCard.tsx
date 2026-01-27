import React, { useState } from "react";
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
  action: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imgUrl,
  imgWidth,
  imgHeight,
  name,
  quantity,
  rating,
  price,
  action,
}) => {
  const [src, setSrc] = useState(imgUrl);
  return (
    <div
      className="bg-[#fafafa] rounded-2xl hover:shadow-md flex flex-col h-80 gap-4 duration-300 transition-all hover:scale-101 cursor-pointer border-1 border-gray-300/20"
      title={name}
    >
      <div className="flex relative w-full justify-center h-40 bg-[#f6fff6] rounded-t-2xl">
        <Image
          src={src}
          onError={() => setSrc("/assets/placeholder.png")}
          alt={name}
          width={imgWidth}
          height={imgHeight}
          className={`${
            src !== imgUrl ? "object-contain" : "object-cover"
          } rounded-xl h-40 w-full`}
        />
      </div>

      <div className="flex flex-col h-full text-left px-5 justify-between pb-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-green-950 max-sm:text-lg text-xl font-bold truncate">
            {name}
          </h3>
          <div className="flex justify-between text-neutral-400 text-base font-semibold">
            <p className="truncate">{quantity}</p>
            <div className="flex items-center align-middle justify-center gap-0.75 md:gap-1.5">
              <FaStar className="text-[#FFC107] mt-1" />
              <span className="">({rating}/5)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-bold text-[#0A3917] text-lg">
            Rp{price.toLocaleString("id-ID")}
          </p>
          <button
            className="cursor-pointer transform hover:scale-120 transition-transform duration-200"
            onClick={action}
          >
            <AiFillPlusCircle className="text-[#0A3917] text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
