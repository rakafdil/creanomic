import React from "react";
import Link from "next/link";
import { Order } from "@/types/Products";
import OrderConfirmationStatus from "@/components/Orders/OrderConfirmationStatus";
import OrderSummaryBar from "@/components/Orders/OrderSummaryBar";
import OrderDetailsCard from "@/components/Orders/OrderDetailsCard";
import { IoIosArrowBack } from "react-icons/io";
import BackButton from "@/components/Common/BackButton";

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

const Transaction = () => {
  return (
    <>
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 pb-8 sm:pb-12 lg:pb-16">
        <BackButton />

        {/* Page Title */}
        <div className="flex justify-center">
          <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-center">
            Order Completed
          </h1>
        </div>

        {/* Main Content */}
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
