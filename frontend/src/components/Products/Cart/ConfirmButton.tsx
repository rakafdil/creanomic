"use client";
import { motion } from "framer-motion";
import { useAuth } from "@/hook/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Common/Loading";
import axios from "axios";
import { BASE_URL } from "@/app/page";
import { useCart } from "@/hook/useCart";

declare global {
  interface Window {
    snap?: any;
  }
}

export default function ConfirmButton() {
  const { user, loading } = useAuth();
  const { cart, isLoading: cartLoading } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/error");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey ?? "");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePay = async () => {
    if (!cart || !user) {
      alert("Cart or user data is missing");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.post(
        `${BASE_URL}payment/checkout`,
        {
          cartData: cart,
          user: user,
          paymentMethod: "ewallet",
        },
        { withCredentials: true },
      );
      const data = response.data;

      if (window.snap && data.token) {
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log("Success!", result);
            alert("Pembayaran Berhasil!");
            router.push("/products/cart/transaction");
          },
          onPending: function (result: any) {
            console.log("Pending...", result);
            alert("Menunggu Pembayaran!");
          },
          onError: function (result: any) {
            console.log("Error!!", result);
            alert("Pembayaran Gagal!");
          },
          onClose: function () {
            alert("Kamu menutup popup sebelum bayar!");
            setIsProcessing(false);
          },
        });
      } else {
        alert("Midtrans Snap belum siap atau token tidak tersedia.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);

      let errorMessage = "Unknown error";

      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      alert("Gagal memulai pembayaran: " + errorMessage);
      setIsProcessing(false);
    }
  };

  if (loading || cartLoading) {
    return (
      <Loading
        className="!absolute top-0 h-fit right-1/2 left-1/2"
        text={"Loading..."}
      />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer mt-4 sm:mt-5 lg:mt-6 w-full bg-green-800 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handlePay}
      disabled={isProcessing || !cart || !user}
    >
      {isProcessing ? "Processing..." : "Proceed to Checkout"}
    </motion.button>
  );
}
