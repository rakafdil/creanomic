"use client";

import {
  ProductItem,
  ProductListResponse,
  productService,
} from "@/services/product.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function useProduct() {
  const [data, setData] = useState<ProductListResponse["data"]>();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await productService.getAllProduct(
          `limit=${limit}&page=${page}`
        );
        setData(response.data);
        setProducts(response.data.data);
        console.log(response.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [limit, page]);

  return {
    data,
    products,
    isLoading,
    error,
    limit,
    page,
  };
}
