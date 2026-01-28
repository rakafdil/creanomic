"use client";

import BackButton from "@/components/Common/BackButton";
import ProductsDisplay from "@/components/Products/ProductsDisplay";
import { useProduct } from "@/hook/useProduct";
import { useParams } from "next/navigation";
import React from "react";

const modeTitleMap: Record<string, string> = {
  "nearby-available": "Nearest Products",
  all: "All Products",
  popular: "Popular",
};

const AllProducts = () => {
  const params = useParams<{ mode: string }>();
  const title = modeTitleMap[params.mode];

  const { data, isLoading, error, limit, page } = useProduct();
  const products = data?.data ?? [];

  const totalPages = data?.totalPages ?? 0;
  const isMany = totalPages > 6;

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    params.set("limit", limit.toString());
    window.history.pushState({}, "", `?${params.toString()}`);
  };

  const pagesToRender = () => {
    if (!isMany) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>();

    pages.add(1);
    pages.add(totalPages);
    pages.add(page);
    pages.add(page - 1);
    pages.add(page + 1);

    return [...pages]
      .filter((p) => p >= 1 && p <= totalPages)
      .sort((a, b) => a - b);
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 flex flex-col gap-5 sm:gap-6 lg:gap-8">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4 self-center">
        {title} {`(${data?.totalItems})`}
      </h1>
      <ProductsDisplay
        limit={limit}
        products={products}
        isLoading={isLoading}
        error={error ?? undefined}
      />
      <div className="flex gap-2 justify-center">
        {pagesToRender().map((p, i, arr) => {
          const prev = arr[i - 1];

          return (
            <React.Fragment key={p}>
              {prev && p - prev > 1 && (
                <span className="px-2 flex items-center">…</span>
              )}

              <button
                onClick={() => goToPage(p)}
                className={`flex justify-center items-center h-12 w-10 rounded-xl border cursor-pointer
            ${
              page === p
                ? "bg-green-400 text-white"
                : "bg-white hover:bg-green-200"
            }
          `}
              >
                {p}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
