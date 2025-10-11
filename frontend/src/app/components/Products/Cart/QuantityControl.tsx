import { Minus, Plus } from "lucide-react";

type QuantityControlProps = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

export default function QuantityControl({ quantity, onIncrease, onDecrease }: QuantityControlProps) {
    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={onDecrease}
                title="Decrease quantity"
                aria-label="Decrease quantity"
                className="px-2 py-1 border rounded-lg hover:bg-gray-100"
            >
                <Minus size={16} />
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
                onClick={onIncrease}
                title="Increase quantity"
                aria-label="Increase quantity"
                className="px-2 py-1 border rounded-lg hover:bg-gray-100"
            >
                <Plus size={16} />
            </button>
        </div>
    );
}