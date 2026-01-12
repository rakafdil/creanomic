"use client";
import React from "react";
import Link from "next/link";
import { Order, Product } from "@/types/Products";

/* ------------------ Helper untuk format harga ------------------ */
const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("Rp", "Rp ");
};

/* ------------------ Komponen InfoItem ------------------ */
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col text-xs md:text-sm">
    <p className="text-[#343434] font-medium">{label}</p>
    <p className="text-[#343434]/90 font-semibold">{value}</p>
  </div>
);

/* ------------------ Komponen OrderSummaryBar ------------------ */
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

/* ------------------ Komponen Produk ------------------ */
const ProductListItem = ({ name, quantity, price, image }: Product) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="bg-[#D9D9D9]/60 rounded-2xl p-2">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
        </div>
        <div>
          <p className="font-semibold text-[#1a1a1a] text-base md:text-lg">
            {name}
          </p>
          <p className="text-gray-500 text-xs md:text-sm">{quantity}</p>
        </div>
      </div>
    </div>
  );
};

/* ------------------ Komponen Utama ------------------ */
type OrderDetailsProps = {
  order: Order;
};

const MyOrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm mt-6 md:mt-10 border border-[#E0E0E0] max-w-4xl md:transform md:scale-110 md:origin-top">
      {/* Ringkasan Pesanan */}
      <OrderSummaryBar
        orderId={order.orderId}
        paymentMethod={order.paymentMethod}
        transactionId={order.transactionId}
        estimatedDelivery={order.estimatedDelivery}
      />

      {/* Daftar Produk */}
      <div className="p-4 md:p-6">
        {order.products.map((product) => (
          <ProductListItem key={product.id} {...product} />
        ))}

        {/* Status & Tombol */}
        <div className="flex flex-col items-start mt-6 md:mt-8 gap-4">
          {/* Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="bg-[#FFE7DA] text-[#FF6200] text-xs font-semibold px-3 py-1 rounded-full">
              Accepted
            </span>
            <p className="text-xs md:text-sm text-gray-600">
              Your order has been accepted
            </p>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="./orders/trackorder"
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
    </div>
  );
};

export default MyOrderDetails;
