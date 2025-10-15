import React from "react";
import Link from "next/link";
import { Order } from "@/Types/Products";
import OrderConfirmationStatus from "@/app/components/Orders/OrderConfirmationStatus";
import OrderSummaryBar from "@/app/components/Orders/OrderSummaryBar";
import OrderDetailsCard from "@/app/components/Orders/OrderDetailsCard";
import { IoIosArrowBack } from "react-icons/io";
// --- Mock Data ---
// Biasanya data ini akan datang dari API
const orderData: Order = {
  orderId: "#PSNG12341",
  paymentMethod: "OVO",
  transactionId: "TRSNF1243RE",
  estimatedDelivery: "20 Oktober 2025",
  products: [
    {
      id: 1,
      name: "Sweet Banana",
      quantity: "500 gram",
      price: 15000,
      image: "/assets/products/banana.svg",
    },
    {
      id: 2,
      name: "Fresh Broccoli",
      quantity: "100 gram",
      price: 36000,
      image: "/assets/products/broccoli.svg",
    },
    {
      id: 3,
      name: "Fresh Garlic",
      quantity: "500 gram",
      price: 18000,
      image: "/assets/products/onion.svg",
    },
    {
      id: 4,
      name: "Green Cabbage",
      quantity: "500 gram",
      price: 30000,
      image: "/assets/products/cabbage.svg",
    },
  ],
  shipping: 3000,
  taxes: 3000,
  total: 105000,
};
// Catatan: Pastikan Anda memiliki gambar di folder /public/images/

const Transaction = () => {
  return (
    <>
      <div className="mx-32">
        <nav className="my-4 text-[#0A3917]">
          <Link
            href="/products"
            className="text-xl hover:text-black flex gap-1 items-center"
          >
            <IoIosArrowBack /> <span>Back to Shopping</span>
          </Link>
        </nav>

        <span className="flex justify-center font-extrabold text-4xl">
          Order Completed
        </span>

        <main>
          <OrderConfirmationStatus />
          <OrderSummaryBar
            orderId={orderData.orderId}
            paymentMethod={orderData.paymentMethod}
            transactionId={orderData.transactionId}
            estimatedDelivery={orderData.estimatedDelivery}
          />
          <OrderDetailsCard order={orderData} />
        </main>
      </div>
    </>
  );
};

export default Transaction;
