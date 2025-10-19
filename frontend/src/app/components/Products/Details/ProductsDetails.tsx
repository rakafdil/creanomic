"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const productsPath = [
  "banana-big.png",
  "banana-small-1.png",
  "banana-small-2.png",
  "banana-small-3.png",
];
const ProductsDetail = () => {
  const [selectedWeight, setSelectedWeight] = useState("500 g");
  const [quantity, setQuantity] = useState(1);
  const weights = ["500 g", "1 Kg", "2 Kg", "5 Kg"];
  const [bigImage, setBigImage] = useState(productsPath[0]);

  const router = useRouter();
  return (
    // Default: grid-cols-1. lg:grid-cols-2: dua kolom di desktop. py-8 (mobile) vs py-12 (desktop)
    <section className="w-full mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 font-sans">
      <div>
        <div className="w-full aspect-square rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center">
          <motion.div
            key={bigImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            <Image
              src={`/assets/products/${bigImage}`}
              alt="Sweet Banana"
              width={500}
              height={500}
              className="object-contain w-full h-full"
              priority
            />
          </motion.div>
        </div>

        <div className="flex gap-4 mt-4">
          {productsPath.map((img, i) => (
            <div
              key={i}
              className={`w-16 h-16 sm:w-24 sm:h-24 rounded-lg lg:rounded-xl border border-gray-200 overflow-hidden hover:border-green-700 transition-all cursor-pointer hover:scale-105 ${
                bigImage === img
                  ? "border-green-700"
                  : "border-gray-200 hover:border-green-700"
              }`}
              onClick={() => setBigImage(img)}
            >
              <Image
                src={`/assets/products/${img}`}
                alt={`Banana ${i + 1}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-start">
        {/* Kategori */}
        <p className="text-[#0A3917] font-medium text-lg lg:text-2xl mb-2 lg:mb-5">
          Fruits
        </p>
        {/* Nama Produk */}
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-5">
          Sweet Banana
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4 lg:mb-5">
          {/* Ukuran SVG bintang lebih kecil di mobile */}
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFD700"
              viewBox="0 0 24 24"
              width="20" // Mobile
              height="20" // Mobile
              className="lg:w-[30px] lg:h-[30px]" // Desktop
            >
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.781 1.402 8.176L12 18.896l-7.336 3.857 1.402-8.176L.132 9.21l8.2-1.192z" />
            </svg>
          ))}
          <span className="text-gray-700 font-medium text-base lg:text-xl">
            5.0
          </span>
          <span className="text-gray-400 text-sm lg:text-lg">(255 Review)</span>
        </div>

        {/* Harga */}
        <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-3">
          Rp 15.000
        </p>

        {/* Deskripsi Singkat */}
        <p className="text-sm lg:text-base text-[#595959] leading-relaxed mb-6 lg:mb-15">
          Pisang Cavendish premium dengan rasa manis pas dan tekstur lembut.
          Pilihan tepat untuk camilan sehat dan penambah energi instan.
        </p>

        {/* Pilihan Berat */}
        <div className="mb-6">
          <p className="font-semibold text-gray-800 text-sm lg:text-base mb-2">
            Weight
          </p>
          <div className="flex gap-2 lg:gap-3 flex-wrap">
            {weights.map((w) => (
              <motion.button
                key={w}
                onClick={() => setSelectedWeight(w)}
                // Ukuran padding/text lebih kecil di mobile
                className={`px-4 py-1.5 lg:px-5 lg:py-2 rounded-full border text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                  selectedWeight === w
                    ? "bg-[#0A3917] text-white border-green-700"
                    : "border-gray-300 text-gray-700 hover:border-green-700"
                }`}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                {w}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <div className="grid grid-cols-3 items-center border border-gray-300 rounded-full w-35">
            <motion.button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2 py-1 lg:px-3 lg:py-2 text-gray-600 text-lg lg:text-xl font-bold hover:text-green-700 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              −
            </motion.button>
            <span className="mx-auto py-1 lg:px-4 lg:py-2 text-sm lg:text-lg font-medium">
              {quantity}
            </span>
            <motion.button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-1 lg:px-3 lg:py-2 text-gray-600 text-lg lg:text-xl font-bold hover:text-green-700 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              +
            </motion.button>
          </div>

          {/* Add To Cart Button */}
          <motion.button
            // Padding/text lebih kecil di mobile
            className="bg-[#0A3917] hover:bg-green-900 text-white font-semibold py-2 px-6 lg:py-3 lg:px-8 rounded-full text-sm lg:text-base transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Add To Cart
          </motion.button>
          {/* Buy Now Button */}
          <motion.button
            // Padding/text lebih kecil di mobile
            className="bg-[#D0F348] hover:bg-[#B3E03B] text-black font-semibold py-2 px-6 lg:py-3 lg:px-8 rounded-full text-sm lg:text-base transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/products/cart")}
          >
            Buy Now
          </motion.button>
        </div>

        {/* SKU & Tags */}
        <div className="text-sm lg:text-lg text-gray-600 space-y-1 lg:space-y-2">
          <p>
            <span className="font-semibold text-gray-800">SKU:</span>{" "}
            BNFR93748PQR
          </p>
          <p>
            <span className="font-semibold text-gray-800">Tags:</span> Pisang,
            Kuning, Manis, Buah
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetail;
