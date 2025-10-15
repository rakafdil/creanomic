"use client";

import React, { useState } from "react";
import Navbar from "../../components/Products/Navbar"; // Asumsi komponen ini ada
import ProductList from "../../components/Products/Cart/ProductList";
import PaymentMethodSelector from "../../components/Products/Cart/PaymentMethodSelector";
import OrderSummary from "../../components/Products/Cart/OrderSummary";
import { Product } from "@/Types/Products"; // Asumsi tipe ini ada

export default function ShoppingCartPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Sweet Banana",
      weight: "500 gram",
      price: 15000,
      quantity: 1,
      image: "/assets/products/banana.svg", // Menggunakan URL gambar placeholder
    },
    {
      id: 2,
      name: "Fresh Broccoli",
      weight: "100 gram",
      price: 18000,
      quantity: 2,
      image: "/assets/products/broccoli.svg",
    },
    {
      id: 3,
      name: "Fresh Garlic",
      weight: "500 gram",
      price: 18000,
      quantity: 1,
      image: "/assets/products/onion.svg",
    },
    {
      id: 4,
      name: "Green Cabbage",
      weight: "500 gram",
      price: 10000,
      quantity: 3,
      image: "/assets/products/cabbage.svg",
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("OVO");

  const handleIncrease = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Number(p.quantity) + 1 } : p
      )
    );
  };

  const handleDecrease = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && Number(p.quantity) > 1
          ? { ...p, quantity: Number(p.quantity) - 1 }
          : p
      )
    );
  };

  const totalItemsCount = products.reduce(
    (sum, p) => sum + Number(p.quantity),
    0
  );
  const subTotal = products.reduce(
    (sum, p) => sum + p.price * Number(p.quantity),
    0
  );

  const summary = {
    items: totalItemsCount,
    subTotal: subTotal,
    shipping: 3000,
    taxes: 3000,
    total: subTotal + 3000 + 3000,
  };

  return (
    <>
      <main className="px-4 md:px-16 lg:px-32 pb-16">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
        <div className="flex flex-col gap-8">
          <ProductList
            products={products}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <div className="flex justify-between w-full gap-22">
            <div className="flex-2">
              <PaymentMethodSelector
                method={paymentMethod}
                onSelect={setPaymentMethod}
              />
            </div>
            <div className="flex-1">
              <OrderSummary summary={summary} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
