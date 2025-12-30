import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const BackButton: React.FC = () => {
  return (
    <nav className="my-3 sm:my-4 text-[#0A3917]">
      <Link
        href="/products"
        className="text-base sm:text-lg lg:text-xl hover:text-black flex gap-1 items-center transition-colors"
      >
        <IoIosArrowBack className="text-xl sm:text-2xl" />
        <span>Back to Shopping</span>
      </Link>
    </nav>
  );
};

export default BackButton;
