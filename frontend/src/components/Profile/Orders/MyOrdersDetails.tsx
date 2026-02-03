"use client";
import React from "react";
import Link from "next/link";
import { Order, OrderResponse } from "@/types/Products";

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col text-xs md:text-sm">
    <p className="text-[#343434] font-medium">{label}</p>
    <p className="text-[#343434]/90 font-semibold">{value}</p>
  </div>
);

type OrderSummaryProps = Pick<
  Order,
  "orderId" | "paymentMethod" | "transactionId" | "estimatedDelivery"
>;

const OrderSummaryBar = ({
  orderId,
  paymentMethod,
  transactionId,
  estimatedDelivery,
}: OrderSummaryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#9ABF37] bg-[#D0F348] p-3 md:p-4 rounded-t-lg gap-3 sm:gap-0">
      <div className="px-0 sm:px-3 py-2 sm:py-0">
        <InfoItem label="Order ID" value={orderId} />
      </div>
      <div className="px-0 sm:px-3 py-2 sm:py-0">
        <InfoItem label="Payment Method" value={paymentMethod} />
      </div>
      <div className="px-0 sm:px-3 py-2 sm:py-0">
        <InfoItem label="Transaction ID" value={transactionId} />
      </div>
      <div className="px-0 sm:px-3 py-2 sm:py-0">
        <InfoItem label="Estimated Delivery Date" value={estimatedDelivery} />
      </div>
    </div>
  );
};

type OrderDetailsProps = {
  order?: OrderResponse["data"][0];
};

const MyOrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm mt-6 md:mt-10 border border-[#E0E0E0] max-w-4xl md:origin-top">
      <OrderSummaryBar
        orderId={order?.order_id || ""}
        paymentMethod={order?.payment_method || ""}
        transactionId={String(order?.id || "")}
        estimatedDelivery={
          order?.updated_at
            ? new Date(order.updated_at).toLocaleString("id-ID", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : ""
        }
      />

      <div className="flex flex-col items-start gap-4 p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="bg-[#FFE7DA] text-[#FF6200] text-xs font-semibold px-3 py-1 rounded-full">
            {order?.status}
          </span>
          <p className="text-xs md:text-sm text-gray-600">
            Your order has been accepted
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href={`orders/${order?.id}`}
            className="bg-[#0A3917] text-white text-sm py-2 px-5 rounded-3xl hover:bg-green-900 transition inline-block text-center"
          >
            Track Order
          </Link>
          <button className="bg-[#FF5757] text-white text-sm py-2 px-5 rounded-3xl hover:bg-red-600 transition">
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetails;
