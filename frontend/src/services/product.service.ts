import { api } from "@/lib/api";

export interface Seller {
  stores: any;
  store_id: number;
  seller_id: string;
}

export interface ProductItem {
  id: number;
  seller_id: string;
  category_id: number;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  img_url: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string | null;
  review_summary: any;
  unit_value: number;
  unit_label: string;
  seller: Seller;
}

export interface ProductListResponse {
  message: string;
  data: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    data: ProductItem[];
  };
}

export const productService = {
  getAllProduct: (q?: string) =>
    api.get<ProductListResponse>(`/products${q ? `?${q}` : ""}`),
  getProductById: (id: string) => api.get<ProductItem>(`/products/${id}`),
  searchProduct: (q: string) =>
    api.get<ProductListResponse>(`/products/search?q=${q}`),
};
