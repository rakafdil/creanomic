import { Minus, Plus } from "lucide-react";

type QuantityControlProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityControlProps) {
  return (
    <div className="flex items-center justify-center rounded-md py-1">
      <button
        onClick={onDecrease}
        title="Decrease quantity"
        aria-label="Decrease quantity"
        className="py-1 h-full px-2 hover:bg-gray-100 rounded-l-xl border-1 border-gray-300/80 cursor-pointer"
      >
        <Minus size={16} />
      </button>
      <span className="py-1 px-5 text-lg text-center font-medium text-gray-800 border-b border-t border-gray-300">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        title="Increase quantity"
        aria-label="Increase quantity"
        className="py-1 h-full px-2 hover:bg-gray-100 rounded-r-xl border-1 border-gray-300/80 cursor-pointer"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
