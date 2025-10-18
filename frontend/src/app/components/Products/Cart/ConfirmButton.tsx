"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ConfirmButton() {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer mt-4 sm:mt-5 lg:mt-6 w-full bg-green-800 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-900 transition-colors duration-300"
      onClick={() => router.push("/products/cart/transaction")}
    >
      Proceed to Checkout
    </motion.button>
  );
}