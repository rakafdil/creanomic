"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/services/product.service";
import { formatRupiah } from "@/helper/currencyFormat";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/app/page";
import { FaSpinner } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ErrorModal from "@/components/Common/ErrorModal";
import { StarRating } from "@/components/Common/StarRating";
import { useCart } from "@/hook/useCart";
import ConfirmationPopUp from "@/components/Common/ConfirmationPopUp";

export function useAddToCart() {
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId?: number;
      quantity?: number;
    }) => {
      const res = await axios.post(
        `${BASE_URL}cart`,
        { productId, quantity },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    },
  });
}

const ProductsDetail = ({ product }: { product?: ProductItem }) => {
  const { addItem: addToCart } = useCart();
  const productsPath = [product?.img_url || "/assets/placeholder.png"];

  const weights = [`${product?.unit_value} ${product?.unit_label}`];
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [bigImage, setBigImage] = useState(productsPath[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  return (
    <section className="w-full mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 font-sans">
      {modalOpen && (
        <ConfirmationPopUp
          onAcc={() => {
            if (product?.id) {
              addToCart.mutate({
                productId: product.id,
                quantity: quantity,
              });
              setModalOpen(false);
            }
          }}
          text={` Are You Sure To Add ${product?.name} to Your Cart?`}
          setModal={setModalOpen}
        />
      )}
      {addToCart.error && <ErrorModal error={addToCart.error} />}
      {addToCart.isSuccess && (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Item Has Been Added To Your Cart
              </AlertDialogTitle>
              <AlertDialogDescription>
                {product?.name} {quantity} x {selectedWeight}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                className="cursor-pointer !bg-[#ffffff] !text-black border-2"
                onClick={() => router.push("/products/")}
              >
                Back Shopping
              </AlertDialogAction>
              <AlertDialogAction
                className="cursor-pointer !bg-[#0A3917] !hover:bg-green-900"
                onClick={() => router.push("/products/cart")}
              >
                Go To Cart
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
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
              src={`${bigImage}`}
              onError={() => setBigImage("/assets/placeholder.png")}
              alt="product"
              width={1000}
              height={1000}
              quality={100}
              className="w-full h-full object-cover"
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
              onClick={() => setBigImage(img || "/assets/placeholder.png")}
            >
              <Image
                src={img || "/assets/placeholder.png"}
                alt={`product ${i + 1}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-start">
        <p className="text-[#0A3917] font-medium text-lg lg:text-2xl mb-2 lg:mb-5">
          {product?.categories.name}
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-5">
          {product?.name}
        </h1>

        <div className="flex items-center gap-2 mb-4 lg:mb-5">
          <div className="relative flex">
            <StarRating rating={product?.review_summary} className="!gap-1" />
          </div>
          <span className="text-gray-700 font-medium text-base lg:text-xl">
            {product?.review_summary?.toFixed(1) || "0.0"}
          </span>
          <span className="text-gray-400 text-sm lg:text-lg">
            ({product?.reviews?.length || 0} Review
            {product?.reviews?.length !== 1 ? "s" : ""})
          </span>
        </div>

        <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-3">
          {formatRupiah(product?.price)}
        </p>

        <p className="text-sm lg:text-base text-[#595959] leading-relaxed mb-6 lg:mb-15">
          {product?.description}
        </p>

        <div className="mb-6">
          <p className="font-semibold text-gray-800 text-sm lg:text-base mb-2">
            Weight
          </p>
          <div className="flex gap-2 lg:gap-3 flex-wrap">
            {weights.map((w) => (
              <motion.button
                key={w}
                onClick={() => setSelectedWeight(w)}
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

          <motion.button
            className={`bg-[#0A3917] hover:bg-green-900 text-white font-semibold py-2 px-6 lg:py-3 lg:px-8 rounded-full text-sm lg:text-base transition-all ${addToCart.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            {addToCart.isPending ? (
              <FaSpinner className="animate-spin w-full" />
            ) : (
              "Add To Cart"
            )}
          </motion.button>
          <motion.button
            className="bg-[#D0F348] hover:bg-[#B3E03B] text-black font-semibold py-2 px-6 lg:py-3 lg:px-8 rounded-full text-sm lg:text-base transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/products/cart")}
          >
            Buy Now
          </motion.button>
        </div>

        <div className="text-sm lg:text-lg text-gray-600 space-y-1 lg:space-y-2">
          <p>
            <span className="font-semibold text-gray-800">SKU:</span>{" "}
            BNFR93748PQR
          </p>
          <p>
            <span className="font-semibold text-gray-800">Tags:</span>{" "}
            {product?.categories.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetail;
