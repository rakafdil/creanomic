import React from "react";
import Logo from "../Common/Logo";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/app/page";
import { useCart } from "@/hook/useCart";

function DropdownMenuIcons({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#083D57] h-12 w-12 lg:h-15 lg:w-15 rounded-full p-2.5 lg:p-3 flex items-center justify-center hover:-rotate-15 hover:bg-[#116d9b] transition-all cursor-pointer"
        >
          <Image
            src="/assets/default-avatar.png"
            alt="avatar"
            width={32}
            height={32}
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
        </Button>
      </DropdownMenuTrigger>
      {isLoggedIn ? (
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => redirect("/profile")}
            className="cursor-pointer"
          >
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={async () => {
              await axios.post(
                `${BASE_URL}auth/logout`,
                {},
                {
                  withCredentials: true,
                },
              );
              window.location.href = "/products";
            }}
          >
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => redirect("/auth?mode=login")}
            className="cursor-pointer"
          >
            Log In
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => redirect("/auth?mode=signup")}
            className="cursor-pointer"
          >
            Sign Up
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { cart } = useCart();
  const cartCount = cart?.cart_items.length || 0;

  return (
    <nav className="w-full bg-white py-2 sm:py-3">
      <div className="hidden sm:flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-3 sm:px-4 lg:px-0">
        <Link
          href="/products"
          className="flex items-center h-auto cursor-pointer flex-shrink-0"
        >
          <Logo width={36} height={36} className="w-auto h-9 lg:h-10" />
        </Link>

        <div className="flex-1 flex justify-center max-w-2xl">
          <SearchBar className="w-full" />
        </div>

        <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
          <Link href="/products/cart" className="cursor-pointer relative">
            <div className="bg-[#0A3917] h-12 w-12 lg:h-15 lg:w-15 rounded-full p-2.5 lg:p-3 flex items-center justify-center relative hover:bg-green-800 hover:rotate-6 transition-all">
              <Image
                src="/assets/cart.svg"
                alt="cart"
                width={32}
                height={32}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              {cartCount > 0 && (
                <span className="absolute top-2 right-3 lg:top-2 lg:right-2.5 bg-[#F44336] text-white font-bold rounded-full w-4 h-4 flex items-center justify-center text-[8px]">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          <DropdownMenuIcons isLoggedIn={isLoggedIn} />
        </div>
      </div>

      <div className="sm:hidden flex flex-col gap-3 px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="flex items-center h-auto cursor-pointer"
          >
            <Logo width={32} height={32} />
          </Link>

          <div className="flex items-center gap-2.5">
            <Link href="/products/cart" className="cursor-pointer relative">
              <div className="bg-[#0A3917] h-10 w-10 rounded-full p-2 flex items-center justify-center relative">
                <Image
                  src="/assets/cart.svg"
                  alt="cart"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1.5 bg-[#F44336] text-white font-bold rounded-full w-2.5 h-2.5 flex items-center justify-center"></span>
                )}
              </div>
            </Link>
            <Link href="/profile" className="cursor-pointer">
              <div className="bg-[#083D57] h-10 w-10 rounded-full p-2 flex items-center justify-center">
                <Image
                  src="/assets/default-avatar.png"
                  alt="avatar"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <SearchBar className="w-full" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
