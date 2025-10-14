import ProductItem from "./ProductItem";
import { Product } from "@/Types/Products";

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
      <div className="grid grid-cols-4 font-semibold text-left text-2xl text-black bg-[#D0F348] rounded-2xl py-3 px-6">
        <span className="">Product</span>
        <span className=" text-center">Harga</span>
        <span className=" text-center">Quantity</span>
        <span className="pr-5 text-right">Sub Total</span>
      </div>
      <div className="py-2">
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
  );
}
