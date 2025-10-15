import React from "react";
import { Order } from "@/Types/Products";

type OrderSummaryProps = Pick<
  Order,
  "orderId" | "paymentMethod" | "transactionId" | "estimatedDelivery"
>;

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="text-left text-xl pl-10">
    <p className="text-gray-700">{label}</p>
    <p className="">{value}</p>
  </div>
);

const OrderSummaryBar = ({
  orderId,
  paymentMethod,
  transactionId,
  estimatedDelivery,
}: OrderSummaryProps) => {
  return (
    <div className="grid grid-cols-[auto_1px_auto_1px_auto_1px_auto] gap-4 bg-[#D0F348] p-4 rounded-lg items-start">
      <InfoItem label="Order ID" value={orderId} />
      <div className="border-l border-gray-400 h-full" />
      <InfoItem label="Payment Method" value={paymentMethod} />
      <div className="border-l border-gray-400 h-full" />
      <InfoItem label="Transaction ID" value={transactionId} />
      <div className="border-l border-gray-400 h-full" />
      <InfoItem label="Estimated Delivery Date" value={estimatedDelivery} />
    </div>
  );
};

export default OrderSummaryBar;
