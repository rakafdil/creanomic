"use client";

import React, { useState } from "react";
import ProductList from "@/components/Products/Cart/ProductList";
import PaymentMethodSelector from "@/components/Products/Cart/PaymentMethodSelector";
import OrderSummary from "@/components/Products/Cart/OrderSummary";
import { Cart } from "@/types/Products";
import BackButton from "@/components/Common/BackButton";
import { useCart } from "@/hook/useCart";

export default function ShoppingCartPage() {
  const {
    isLoading,
    isPending,
    isRefetching,
    cart,
    error,
    updateItem,
    removeItem,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("OVO");

  const handleIncrease = (id: number) => {
    updateItem.mutate({
      productId: id,
      quantity:
        (cart?.cart_items.find((item) => item.product_id === id)?.quantity ||
          0) + 1,
    });
  };

  const handleDecrease = (id: number) => {
    updateItem.mutate({
      productId: id,
      quantity:
        (cart?.cart_items.find((item) => item.product_id === id)?.quantity ||
          0) - 1,
    });
  };

  const handleDelete = (id: number) => {
    removeItem.mutate(id);
  };

  const cartItems = cart?.cart_items ?? [];

  const totalItemsCount = cartItems.length;

  const subTotal = cart?.total_price;

  const summary = {
    items: totalItemsCount || 0,
    subTotal: subTotal || 0,
    shipping: 3000,
    taxes: 3000,
    total: (cart?.total_price || 0) + 3000 + 3000,
  };

  return (
    <>
      <main className="px-4 sm:px-6 md:px-16 lg:px-32 pb-8 sm:pb-12 lg:pb-16">
        <BackButton />
        <h1 className="hidden lg:block text-3xl font-bold text-center mb-8">
          Shopping Cart
        </h1>

        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <ProductList
            products={cart?.cart_items}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            handleDelete={handleDelete}
            isLoading={isLoading || isPending || isRefetching}
          />

          <div className="flex flex-col lg:flex-row justify-between w-full gap-4 sm:gap-6 lg:gap-22">
            <div className="w-full lg:flex-2">
              <PaymentMethodSelector
                method={paymentMethod}
                onSelect={setPaymentMethod}
              />
            </div>

            <div className="w-full lg:flex-1">
              <OrderSummary
                summary={summary}
                isLoading={isLoading || isPending || isRefetching}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
