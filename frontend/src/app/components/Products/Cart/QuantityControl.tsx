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
    <div className="flex items-center justify-center rounded-md">
      <button
        onClick={onDecrease}
        title="Decrease quantity"
        aria-label="Decrease quantity"
        className="py-1.5 sm:py-2 h-full px-2 sm:px-2.5 hover:bg-gray-100 rounded-l-xl border-1 border-gray-300/80 cursor-pointer transition-colors"
      >
        <Minus size={14} className="sm:w-4 sm:h-4" />
      </button>
      <span className="py-0.25 px-3 sm:px-5 text-base lg:text-lg text-center font-medium text-gray-800 border-b border-t border-gray-300 min-w-[40px] sm:min-w-[50px]">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        title="Increase quantity"
        aria-label="Increase quantity"
        className="py-1.5 sm:py-2 h-full px-2 sm:px-2.5 hover:bg-gray-100 rounded-r-xl border-1 border-gray-300/80 cursor-pointer transition-colors"
      >
        <Plus size={14} className="sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
