import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { useSearchParams } from "next/navigation";

export function useProduct() {
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;

  const query = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => productService.getAllProduct(`limit=${limit}&page=${page}`),
    select: (response) => response.data,
  });

  return {
    ...query,
    limit,
    page,
  };
}
