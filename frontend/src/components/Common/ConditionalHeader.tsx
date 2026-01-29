"use client";
import Navbar from "../Products/Navbar";
import { usePathname } from "next/navigation";

export default function ConditionalHeader({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();

  // Pastikan pathname sudah ada (hindari render saat undefined/null)
  if (!pathname) return null;

  if (pathname.startsWith("/products")) {
    return (
      <>
        <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 text-center text-white text-sm font-bold">
          Welcome to GrowthWell
        </div>
        <div className="py-4 px-4 md:px-16 lg:px-32">
          <Navbar isLoggedIn={isLoggedIn} />
        </div>
      </>
    );
  }

  if (pathname === "/profil") {
    return (
      <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 text-center text-white text-sm font-bold">
        Welcome to GrowthWell
      </div>
    );
  }

  return null;
}
