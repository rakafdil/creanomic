import ProductItem from "./ProductItem";
import { Cart, CartItem } from "@/types/Products";

type Props = {
  products?: Cart["cart_items"];
  onIncrease: (productId: CartItem["quantity"]) => void;
  onDecrease: (productId: CartItem["quantity"]) => void;
  handleDelete: (productId: CartItem["quantity"]) => void;
  isLoading: boolean;
};

export default function ProductList({
  products,
  onIncrease,
  onDecrease,
  handleDelete,
  isLoading,
}: Props) {
  const groupedByStoreName = products?.reduce<Record<string, CartItem[]>>(
    (acc, item) => {
      const storeName = item.products.seller.stores.store_name;
      if (!acc[storeName]) {
        acc[storeName] = [];
      }
      acc[storeName].push(item);
      return acc;
    },
    {},
  );

  console.log(groupedByStoreName);
  return (
    <div className="bg-white rounded-xl">
      <div className="hidden lg:grid lg:grid-cols-4 font-semibold text-left text-xl text-black bg-[#D0F348] rounded-2xl py-3 px-6">
        <span>Cart</span>
        <span className="text-center">Harga</span>
        <span className="text-center">Quantity</span>
        <span className="pr-5 text-right">Sub Total</span>
      </div>

      <div className="lg:hidden bg-[#D0F348] rounded-t-xl py-3 px-4">
        <h3 className="font-bold text-lg sm:text-xl text-black">
          Shopping Cart
        </h3>
      </div>

      <div className="py-2 px-0 lg:px-0">
        <div className="lg:py-0 px-4 lg:px-0">
          {isLoading ? (
            <div>
              <div className="font-semibold animate-pulse text-2xl p-4 h-6 w-32 rounded-md bg-gray-200" />
              {(products && products.length > 0
                ? products
                : Array.from({ length: 4 })
              ).map((_, i) => (
                <div
                  key={i}
                  className="hidden lg:grid lg:grid-cols-4 items-center py-4 animate-pulse"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-gray-200" />
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 rounded-md bg-gray-200" />
                        <div className="h-3 w-20 rounded-md bg-gray-100" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-200" />
                      <div className="h-9 w-9 rounded-full bg-gray-200" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="h-4 w-16 rounded-md bg-gray-200" />
                  </div>
                  <div className="flex justify-center">
                    <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
                      <div className="h-9 w-9 bg-gray-100" />
                      <div className="h-9 w-10 bg-gray-200" />
                      <div className="h-9 w-9 bg-gray-100" />
                    </div>
                  </div>
                  <div className="flex justify-end pr-11">
                    <div className="h-4 w-20 rounded-md bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            groupedByStoreName &&
            Object.entries(groupedByStoreName).map(
              ([storeName, sellerProducts]) => (
                <div key={storeName}>
                  <div className="font-semibold text-2xl p-2">{storeName}</div>
                  {sellerProducts.map((p) => (
                    <ProductItem
                      key={p.product_id}
                      product={p}
                      onIncrease={onIncrease}
                      onDecrease={onDecrease}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
}
