import React from "react";
import Logo from "../Common/Logo";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";

// Contoh jumlah item di cart, bisa diganti dengan state/props
const cartCount = 12;

const Navbar = () => {
  return (
    <nav className="w-full bg-white py-3">
      <div className="flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/products"
          className="flex items-center h-auto cursor-pointer"
        >
          <Logo width={40} height={40} />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <SearchBar className="w-full" />
        </div>

        {/* Cart & Avatar */}
        <div className="flex items-center gap-4">
          <Link href="/products/cart" className="cursor-pointer relative">
            <div className="bg-[#0A3917] h-15 w-15 rounded-full p-3 flex items-center justify-center relative">
              <Image src="/assets/cart.svg" alt="cart" width={32} height={32} />
              {cartCount > 0 && (
                <span className="absolute top-2.5 right-4 bg-[#F44336] text-white font-bold rounded-full w-3 h-3 flex items-center justify-center"></span>
              )}
            </div>
          </Link>
          <Link href="/profile" className="cursor-pointer">
            <div className="bg-[#083D57] h-15 w-15 rounded-full p-3 flex items-center justify-center">
              <Image
                src="/assets/default-avatar.png"
                alt="avatar"
                width={32}
                height={32}
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
