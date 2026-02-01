"use client";
import { useEffect, useState } from "react";
import Navbar from "../Products/Navbar";
import { usePathname } from "next/navigation";

export default function ConditionalHeader({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();
  const [apiLoggedIn, setApiLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("api/auth/me")
      .then((res) => res.json())
      .then((data) => setApiLoggedIn(data.isLoggedIn));
  });

  if (!pathname) return null;

  if (pathname.startsWith("/products")) {
    return (
      <>
        <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 text-center text-white text-sm font-bold">
          Welcome to GrowthWell
        </div>
        <div className="py-4 px-4 md:px-16 lg:px-32">
          <Navbar isLoggedIn={Boolean(isLoggedIn || apiLoggedIn)} />
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
