export type Product = {
  id: number;
  name: string;
  image: string;
  weight?: string;
  price: number;
  quantity: number | string;
};

export interface Order {
  orderId: string;
  paymentMethod: string;
  transactionId: string;
  estimatedDelivery: string;
  products: Product[];
  shipping: number;
  taxes: number;
  total: number;
}
