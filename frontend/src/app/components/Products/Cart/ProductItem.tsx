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
  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:grid lg:grid-cols-4 items-center py-4 text-2xl">
        {/* Product Info */}
        <div className="flex items-center space-x-4">
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
            quantity={Number(product.quantity)}
            onIncrease={() => onIncrease(product.id)}
            onDecrease={() => onDecrease(product.id)}
          />
        </div>

        {/* Sub Total */}
        <p className="pr-11 text-right font-semibold text-gray-800">
          {formatCurrency(product.price * Number(product.quantity))}
        </p>
      </div>

      {/* Mobile & Tablet View */}
      <div className="lg:hidden flex flex-col gap-3 py-4 border-b border-gray-200 last:border-b-0">
        <div className="flex items-start gap-3">
          {/* Product Image */}
          <div className="bg-[#D9D9D9]/80 rounded-xl p-2 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-base sm:text-lg truncate">
              {product.name}
            </h4>
            <p className="text-sm sm:text-base text-gray-500 mt-0.5">
              {product.weight}
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 mt-2">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>

        {/* Quantity & Subtotal */}
        <div className="flex items-center justify-between">
          <QuantityControl
            quantity={Number(product.quantity)}
            onIncrease={() => onIncrease(product.id)}
            onDecrease={() => onDecrease(product.id)}
          />
          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-500">Subtotal</p>
            <p className="text-base sm:text-lg font-bold text-gray-800">
              {formatCurrency(product.price * Number(product.quantity))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}