"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hook/auth";
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/Common/Loading";
import Link from "next/link";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import PageTransition from "@/components/Common/PageTransition";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [apiLoggedIn, setApiLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setApiLoggedIn(data.isLoggedIn))
      .catch((err) => {
        console.error("Failed to check auth:", err);
        setApiLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && (!user || !apiLoggedIn) && apiLoggedIn !== null) {
      router.push("/error");
    }
  }, [loading, user, router, apiLoggedIn]);

  if (loading || apiLoggedIn === null) {
    return <Loading text={"Checking user..."} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 inline-flex justify-center items-center gap-2.5">
        <div className="text-center justify-start text-white text-sm font-bold font-['Inter']">
          Welcome to GrowthWell
        </div>
      </div>
      <div className="min-h-screen bg-white text-black flex justify-center py-8 md:py-20 text-lg sm:text-lg px-4 md:px-0">
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 md:gap-40">
          <div className="w-full md:w-[240px]">
            <Link
              href="/products"
              className="text-base md:text-lg mb-4 font-semibold inline-block hover:underline"
            >
              <img
                src="/Vector.svg"
                alt="Back to Shopping"
                className="inline-block mr-2"
              />
              Back to Shopping
            </Link>
            <ProfileSidebar />
          </div>
          <PageTransition key={pathname}>{children}</PageTransition>
        </div>
      </div>
    </div>
  );
}
