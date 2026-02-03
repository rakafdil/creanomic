"use client";
import React from "react";
import OrderDetailsCard from "@/components/Profile/Orders/MyOrdersDetails";
import { OrderResponse } from "@/types/Products";
import axios from "axios";
import { BASE_URL } from "@/app/page";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Common/Loading";
import { ShoppingBag } from "lucide-react";

export async function getOrder(): Promise<OrderResponse> {
  const response = await axios.get(`${BASE_URL}payment/history`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getOrderById(id: string) {
  const response = await axios.get(`${BASE_URL}payment/status/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export default function MyOrdersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payment_history"],
    queryFn: getOrder,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Loading your orders..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700 text-lg font-semibold text-center">
            Failed to load orders
          </p>
          <p className="text-red-600 text-sm mt-2 text-center">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 text-xl font-semibold">No orders yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Your order history will appear here once you make a purchase
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full max-h-[calc(100vh)]">
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-2xl font-bold text-[#0A3917]">My Orders</h2>
        <p className="text-gray-600 text-sm mt-1">
          {data.results} {data.results === 1 ? "order" : "orders"} found
        </p>
      </div>

      <div className="flex flex-col gap-6 pb-6 overflow-y-auto pr-4 custom-scrollbar">
        {data.data.map((order) => (
          <OrderDetailsCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
