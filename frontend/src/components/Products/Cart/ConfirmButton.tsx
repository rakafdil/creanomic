"use client";
import { motion } from "framer-motion";
import { useAuth } from "@/hook/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ConfirmButton() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // redirect when we've finished checking and there's no user
      router.push("/error");
    }
    console.log(user);
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">Checking authentication...</span>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer mt-4 sm:mt-5 lg:mt-6 w-full bg-green-800 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-900 transition-colors duration-300"
      onClick={() => {
        !user
          ? router.push("/error")
          : router.push("/products/cart/transaction");
      }}
    >
      Proceed to Checkout
    </motion.button>
  );
}
