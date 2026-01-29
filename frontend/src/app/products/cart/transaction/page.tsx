"use client";
import React from "react";
import { Order } from "@/types/Products";
import OrderConfirmationStatus from "@/components/Orders/OrderConfirmationStatus";
import OrderSummaryBar from "@/components/Orders/OrderSummaryBar";
import OrderDetailsCard from "@/components/Orders/OrderDetailsCard";
import { IoIosArrowBack } from "react-icons/io";
import BackButton from "@/components/Common/BackButton";
import { useCart } from "@/hook/useCart";

const Transaction = () => {
  const { cart } = useCart();
  const orderData: Order = {
    orderId: "#PSNG12341",
    paymentMethod: "OVO",
    transactionId: "TRSNF1243RE",
    estimatedDelivery: "20 Oktober 2025",
    cart: cart,
    shipping: 3000,
    taxes: 3000,
    total: cart?.total_price || 0,
  };

  return (
    <>
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 pb-8 sm:pb-12 lg:pb-16">
        <BackButton />

        <div className="flex justify-center">
          <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-center">
            Order Completed
          </h1>
        </div>

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
