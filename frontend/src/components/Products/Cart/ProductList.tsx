import ProductItem from "./ProductItem";
import { Product } from "@/types/Products";

type Props = {
  products: Product[];
  onIncrease: (productId: Product["id"]) => void;
  onDecrease: (productId: Product["id"]) => void;
};

export default function ProductList({
  products,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="bg-white rounded-xl">
      {/* Desktop Header */}
      <div className="hidden lg:grid lg:grid-cols-4 font-semibold text-left text-2xl text-black bg-[#D0F348] rounded-2xl py-3 px-6">
        <span>Product</span>
        <span className="text-center">Harga</span>
        <span className="text-center">Quantity</span>
        <span className="pr-5 text-right">Sub Total</span>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-[#D0F348] rounded-t-xl py-3 px-4">
        <h3 className="font-bold text-lg sm:text-xl text-black">
          Shopping Cart
        </h3>
      </div>

      {/* Products */}
      <div className="py-2 px-0 lg:px-0">
        <div className="lg:py-0 px-4 lg:px-0">
          {products.map((p) => (
            <ProductItem
              key={p.id}
              product={p}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
