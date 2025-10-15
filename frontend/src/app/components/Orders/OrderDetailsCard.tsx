import React from "react";
import { Order } from "@/Types/Products";
import ProductListItem from "./ProductListItem";
import OrderTotals from "./OrderTotals";

type OrderDetailsProps = {
  order: Order;
};

const OrderDetailsCard = ({ order }: OrderDetailsProps) => {
  const subTotal = order.products.reduce(
    (acc, product) => acc + product.price,
    0
  );

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm mt-6 border-[#8C8C8C] border-2 text-2xl">
      <h2 className="font-semibold p-8">Order Details</h2>
      <div className="w-full h-[1.75px] bg-[#8C8C8C]" />
      <div className="flex justify-between items-center mb-4 p-8">
        <span className="font-semibold">Products</span>
        <span className="font-semibold">Sub Total</span>
      </div>

      <div className="p-8">
        {order.products.map((product) => (
          <ProductListItem key={product.id} {...product} />
        ))}
      </div>

      <div className="w-full h-[1.75px] bg-[#8C8C8C]" />
      <OrderTotals
        shipping={order.shipping}
        taxes={order.taxes}
        total={order.total}
      />
    </div>
  );
};

export default OrderDetailsCard;
