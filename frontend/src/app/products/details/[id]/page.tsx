"use client";

import { useParams } from "next/navigation";
import ProductsDetail from "@/components/Products/Details/ProductsDetails";
import ProductTabs from "@/components/Products/Details/index";
import BackButton from "@/components/Common/BackButton";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";

export default function ProductDetailPage() {
  const params = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => productService.getProductById(params.id as string),

    select: (response) => response.data,
    staleTime: 30 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="px-4 sm:px-6 lg:mx-30 flex flex-col gap-1">
          <BackButton />
          <div className="w-full py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 font-sans overflow-hidden">
            <div>
              <div className="w-full aspect-square rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-200 animate-pulse w-full h-full" />
              </div>
              <div className="flex gap-4 mt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg lg:rounded-xl overflow-hidden bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <div className="bg-gray-200 animate-pulse h-6 lg:h-8 w-32 rounded mb-2 lg:mb-5" />
              <div className="bg-gray-200 animate-pulse h-9 lg:h-12 w-3/4 rounded mb-3 lg:mb-5" />
              <div className="flex items-center gap-2 mb-4 lg:mb-5">
                <div className="bg-gray-200 animate-pulse h-5 lg:h-7 w-32 rounded" />
                <div className="bg-gray-200 animate-pulse h-5 lg:h-7 w-12 rounded" />
                <div className="bg-gray-200 animate-pulse h-5 lg:h-7 w-24 rounded" />
              </div>
              <div className="bg-gray-200 animate-pulse h-8 lg:h-10 w-40 rounded mb-4 lg:mb-3" />
              <div className="space-y-2 mb-6 lg:mb-15">
                <div className="bg-gray-200 animate-pulse h-4 w-full rounded" />
                <div className="bg-gray-200 animate-pulse h-4 w-full rounded" />
                <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded" />
              </div>
              <div className="mb-6">
                <div className="bg-gray-200 animate-pulse h-5 w-20 rounded mb-2" />
                <div className="flex gap-2 lg:gap-3 flex-wrap">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 animate-pulse h-9 lg:h-11 w-20 rounded-full"
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <div className="bg-gray-200 animate-pulse h-10 lg:h-12 w-35 rounded-full" />
                <div className="bg-gray-200 animate-pulse h-10 lg:h-12 w-36 lg:w-44 rounded-full" />
                <div className="bg-gray-200 animate-pulse h-10 lg:h-12 w-32 lg:w-40 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="bg-gray-200 animate-pulse h-5 w-48 rounded" />
                <div className="bg-gray-200 animate-pulse h-5 w-56 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center">ERROR</div>;
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="px-4 sm:px-6 lg:mx-30 flex flex-col gap-1">
        <BackButton />
        {product && <ProductsDetail product={product} />}
        <ProductTabs product={product} />
      </div>
    </div>
  );
}
