import React from "react";
import { Order, OrderResponse } from "@/types/Products";

const OrderSummaryBar = ({
  orderId,
  paymentMethod,
  id,
  updatedAt,
}: {
  orderId: string;
  paymentMethod: string;
  id: string;
  updatedAt: string;
}) => {
  return (
    <div className="bg-[#D0F348] rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#9ABF37]">
            <th className="text-left p-3 sm:p-4 text-xs sm:text-sm lg:text-base font-semibold text-gray-700">
              Order ID
            </th>
            <th className="text-left p-3 sm:p-4 text-xs sm:text-sm lg:text-base font-semibold text-gray-700">
              Payment Method
            </th>
            <th className="text-left p-3 sm:p-4 text-xs sm:text-sm lg:text-base font-semibold text-gray-700 hidden sm:table-cell">
              Transaction ID
            </th>
            <th className="text-left p-3 sm:p-4 text-xs sm:text-sm lg:text-base font-semibold text-gray-700 hidden lg:table-cell">
              Estimated Delivery
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 sm:p-4 text-xs sm:text-sm lg:text-base font-medium">
              {orderId}
            </td>
            <td className="p-3 sm:p-4 text-xs sm:text-sm lg:text-base font-medium">
              {paymentMethod}
            </td>
            <td className="p-3 sm:p-4 text-xs sm:text-sm lg:text-base font-medium hidden sm:table-cell">
              {id}
            </td>
            <td className="p-3 sm:p-4 text-xs sm:text-sm lg:text-base font-medium hidden lg:table-cell">
              {updatedAt}
            </td>
          </tr>

          <tr className="sm:hidden border-t border-[#9ABF37]">
            <td className="p-3 text-xs font-semibold text-gray-700">
              Transaction ID
            </td>
            <td className="p-3 text-xs font-medium" colSpan={3}>
              {id}
            </td>
          </tr>
          <tr className="lg:hidden border-t border-[#9ABF37]">
            <td className="p-3 text-xs sm:text-sm font-semibold text-gray-700">
              Estimated Delivery
            </td>
            <td className="p-3 text-xs sm:text-sm font-medium" colSpan={3}>
              {updatedAt}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummaryBar;
