import React from "react";
import Logo from "../Common/Logo";
import SearchBar from "./SearchBar";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full bg-white py-3">
      <div className="flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center h-auto">
          <Logo width={40} height={40} />
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <SearchBar className="w-full" />
        </div>

        {/* Cart & Avatar */}
        <div className="flex items-center gap-4">
          <div className="bg-[#0A3917] h-15 w-15 rounded-full p-3 flex items-center justify-center">
            <Image src="/assets/cart.svg" alt="cart" width={32} height={32} />
          </div>
          <div className="bg-[#083D57] h-15 w-15 rounded-full p-3 flex items-center justify-center">
            <Image
              src="/assets/default-avatar.png"
              alt="avatar"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
