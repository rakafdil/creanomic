import React from "react";
import { Order } from "@/types/Products";

type OrderTotalsProps = Pick<Order, "shipping" | "taxes" | "total">;

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("Rp", "Rp ");
};

const TotalRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-base sm:text-lg lg:text-xl text-black">
    <p>{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const OrderTotals = ({ shipping, taxes, total }: OrderTotalsProps) => {
  return (
    <>
      <div className="space-y-4 sm:space-y-6 lg:space-y-11 p-4 sm:p-6 lg:p-8">
        <TotalRow label="Shipping" value={formatRupiah(shipping)} />
        <TotalRow label="Taxes" value={formatRupiah(taxes)} />
      </div>
      <div className="w-full h-[1.5px] sm:h-[1.65px] bg-[#8C8C8C]" />
      <div className="p-4 sm:p-6 lg:p-8">
        <TotalRow label="Total" value={formatRupiah(total)} />
      </div>
    </>
  );
};

export default OrderTotals;
