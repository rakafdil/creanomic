"use client";
import React from "react";
import OrderConfirmationStatus from "@/components/Orders/OrderConfirmationStatus";
import OrderSummaryBar from "@/components/Orders/OrderSummaryBar";
import OrderDetailsCard from "@/components/Orders/OrderDetailsCard";
import BackButton from "@/components/Common/BackButton";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/components/Profile/Orders/MyOrdersPage";
import Loading from "@/components/Common/Loading";

const Transaction = () => {
  const params = useParams();
  const orderId = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Loading order details..." />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700 text-lg font-semibold text-center">
            Failed to load order details
          </p>
          <p className="text-red-600 text-sm mt-2 text-center">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  const order = data.data;

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
            orderId={order.orderId}
            paymentMethod={order.paymentMethod}
            id={order.transactionId}
            updatedAt={order.estimatedDelivery}
          />
          <OrderDetailsCard order={order} />
        </main>
      </div>
    </>
  );
};

export default Transaction;
