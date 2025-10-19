"use client";

import React, { useState } from "react";
import Navbar from "../../components/Products/Navbar";
import ProductList from "../../components/Products/Cart/ProductList";
import PaymentMethodSelector from "../../components/Products/Cart/PaymentMethodSelector";
import OrderSummary from "../../components/Products/Cart/OrderSummary";
import { Product } from "@/Types/Products";
import BackButton from "@/app/components/Common/BackButton";

export default function ShoppingCartPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Sweet Banana",
      weight: "500 gram",
      price: 15000,
      quantity: 1,
      image: "/assets/products/banana.svg",
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
      <main className="px-4 sm:px-6 md:px-16 lg:px-32 pb-8 sm:pb-12 lg:pb-16">
        <BackButton />
        {/* Page Title - Hidden on mobile, shown on desktop */}
        <h1 className="hidden lg:block text-3xl font-bold text-center mb-8">
          Shopping Cart
        </h1>

        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          {/* Product List */}
          <ProductList
            products={products}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          {/* Payment & Summary Section */}
          <div className="flex flex-col lg:flex-row justify-between w-full gap-4 sm:gap-6 lg:gap-22">
            {/* Payment Method - Full width on mobile, flex-2 on desktop */}
            <div className="w-full lg:flex-2">
              <PaymentMethodSelector
                method={paymentMethod}
                onSelect={setPaymentMethod}
              />
            </div>

            {/* Order Summary - Full width on mobile, flex-1 on desktop */}
            <div className="w-full lg:flex-1">
              <OrderSummary summary={summary} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
