import React from "react";
import { Order } from "@/types/Products";

type OrderSummaryProps = Pick<
  Order,
  "orderId" | "paymentMethod" | "transactionId" | "estimatedDelivery"
>;

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="text-left text-xs sm:text-sm lg:text-xl lg:pl-10">
    <p className="text-gray-700 mb-0.5 sm:mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const OrderSummaryBar = ({
  orderId,
  paymentMethod,
  transactionId,
  estimatedDelivery,
}: OrderSummaryProps) => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:grid lg:grid-cols-[auto_1px_auto_1px_auto_1px_auto] gap-4 bg-[#D0F348] p-4 rounded-lg items-start">
        <InfoItem label="Order ID" value={orderId} />
        <div className="border-l border-gray-400 h-full" />
        <InfoItem label="Payment Method" value={paymentMethod} />
        <div className="border-l border-gray-400 h-full" />
        <InfoItem label="Transaction ID" value={transactionId} />
        <div className="border-l border-gray-400 h-full" />
        <InfoItem label="Estimated Delivery Date" value={estimatedDelivery} />
      </div>

      {/* Mobile & Tablet View */}
      <div className="lg:hidden bg-[#D0F348] p-3 sm:p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <InfoItem label="Order ID" value={orderId} />
          <InfoItem label="Payment Method" value={paymentMethod} />
          <InfoItem label="Transaction ID" value={transactionId} />
          <InfoItem label="Estimated Delivery" value={estimatedDelivery} />
        </div>
      </div>
    </>
  );
};

export default OrderSummaryBar;
