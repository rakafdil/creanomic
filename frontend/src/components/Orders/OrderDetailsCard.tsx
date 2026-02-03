import React from "react";
import { Order } from "@/types/Products";
import ProductListItem from "./ProductListItem";
import OrderTotals from "./OrderTotals";
import { ProductItem } from "@/services/product.service";

type TransactionItem = {
  id: number;
  transaction_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  created_at: string;
  products: ProductItem;
};

type OrderDetailsProps = {
  id: number;
  order_id: string;
  buyer_id: string;
  seller_id: string;
  payment_method: string;
  redirect_url: string;
  status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  transaction_items: TransactionItem[];
};

const OrderDetailsCard = ({ order }: { order: OrderDetailsProps }) => {
  // console.log(order);
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm mt-4 sm:mt-5 lg:mt-6 border-[#8C8C8C] border-2 text-base sm:text-lg lg:text-2xl">
      <h2 className="font-semibold p-4 sm:p-6 lg:p-8">Order Details</h2>
      <div className="w-full h-[1.5px] sm:h-[1.75px] bg-[#8C8C8C]" />
      <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4 p-4 sm:p-6 lg:p-8">
        <span className="font-semibold">Products</span>
        <span className="font-semibold">Sub Total</span>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {order.transaction_items?.map((product) => (
          <ProductListItem
            price={product.price_at_purchase}
            cart_id={""}
            key={product.product_id}
            {...product}
          />
        ))}
      </div>

      <div className="w-full h-[1.5px] sm:h-[1.75px] bg-[#8C8C8C] mt-2 sm:mt-3 lg:mt-4" />
      <OrderTotals shipping={3000} taxes={3000} total={order?.total_amount} />
    </div>
  );
};

export default OrderDetailsCard;
