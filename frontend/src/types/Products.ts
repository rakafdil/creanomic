export interface CartItem {
  price: number;
  cart_id: string;
  quantity: number;
  product_id: number;
  products: {
    name: string;
    price: number;
    img_url: string;
    unit_label: string;
    unit_value: number;
    seller_id: string;
    seller: {
      stores: {
        store_name: string;
      };
    };
  };
}

export interface Cart {
  id: string;
  user_id: string;
  total_price: number;
  coupon: string;
  created_at: string;
  cart_items: CartItem[];
}

export interface Order {
  orderId: string;
  paymentMethod: string;
  transactionId: string;
  estimatedDelivery: string;
  cart?: Cart;
  shipping: number;
  taxes: number;
  total: number;
}
