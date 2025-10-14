import QuantityControl from "./QuantityControl";
import { Product } from "@/Types/Products";

type ProductItemProps = {
  product: Product;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

export default function ProductItem({
  product,
  onIncrease,
  onDecrease,
}: ProductItemProps) {
  // Format harga dengan titik sebagai pemisah ribuan
  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <div className="grid grid-cols-4 items-center py-4 text-2xl">
      {/* Product Info */}
      <div className=" flex items-center space-x-4">
        <div className="bg-[#D9D9D9]/80 rounded-2xl p-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-contain"
          />
        </div>
        <div>
          <h4 className="font-medium">{product.name}</h4>
          <p className="text-lg text-gray-500">{product.weight}</p>
        </div>
      </div>

      {/* Harga */}
      <p className="pl-3 text-center">{formatCurrency(product.price)}</p>

      {/* Quantity */}
      <div className="flex justify-center">
        <QuantityControl
          quantity={product.quantity}
          onIncrease={() => onIncrease(product.id)}
          onDecrease={() => onDecrease(product.id)}
        />
      </div>

      {/* Sub Total */}
      <p className="pr-11 text-right font-semibold text-gray-800">
        {formatCurrency(product.price * product.quantity)}
      </p>
    </div>
  );
}
