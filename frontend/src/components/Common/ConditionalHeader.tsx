"use client";
import { useEffect, useState } from "react";
import Navbar from "../Products/Navbar";
import { usePathname } from "next/navigation";

export default function ConditionalHeader({
  isLoggedIn: serverIsLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(serverIsLoggedIn);

  useEffect(() => {
    fetch("/api/auth/me", {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn !== isLoggedIn) {
          setIsLoggedIn(data.isLoggedIn);
        }
      })
      .catch((err) => {
        console.error("Failed to check auth:", err);
        setIsLoggedIn(false);
      });
  }, [pathname]);

  if (!pathname) return null;

  if (pathname.startsWith("/products") || pathname.startsWith("/messages")) {
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
