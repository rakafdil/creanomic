"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ConfirmButton() {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer mt-6 w-full bg-green-800 text-white font-semibold py-3 rounded-lg hover:bg-green-900 transition-colors duration-300"
      onClick={() => router.push("/products/cart/transaction")}
    >
      Proceed to Checkout
    </motion.button>
  );
}
