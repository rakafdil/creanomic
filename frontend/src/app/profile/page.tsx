"use client";

import React, { useEffect } from "react";
import ProfileContainer from "@/components/Profile/ProfilePage";
import { useAuth } from "@/hook/auth";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/error");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">Checking authentication...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 inline-flex justify-center items-center gap-2.5">
        <div className="text-center justify-start text-white text-sm font-bold font-['Inter']">
          Welcome to GrowthWell
        </div>
      </div>
      <ProfileContainer />
    </div>
  );
}
