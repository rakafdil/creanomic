// frontend/src/app/profile/orders/[id]/page.tsx
"use client";
import React from "react";
import OrderProgress from "@/components/Orders/OrderProgress";
import OrderSummaryBar from "@/components/Orders/OrderSummaryBar";
import OrderDetailsCard from "@/components/Orders/OrderDetailsCard";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/components/Profile/Orders/MyOrdersPage";
import Loading from "@/components/Common/Loading";

const TrackOrder = () => {
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
      <div className="mb-12 md:mb-25 w-full">
        <OrderProgress />
      </div>
      <OrderSummaryBar
        orderId={order.order_id}
        paymentMethod={order.payment_method}
        id={String(order.id)}
        updatedAt={
          order.updated_at
            ? new Date(order.updated_at).toLocaleString("id-ID", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : ""
        }
      />
      <OrderDetailsCard order={order} />
    </>
  );
};

export default TrackOrder;
