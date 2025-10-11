import QuantityControl from "./QuantityControl";

type Product = {
    id: string;
    name: string;
    image: string;
    weight?: string;
    price: number;
    quantity: number;
};

type ProductItemProps = {
    product: Product;
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
};

export default function ProductItem({ product, onIncrease, onDecrease }: ProductItemProps) {
    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center space-x-3">
                <img src={product.image} alt={product.name} className="w-12 h-12" />
                <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.weight}</p>
                </div>
            </div>
            <p className="w-24 text-right">Rp {product.price.toLocaleString()}</p>
            <QuantityControl
                quantity={product.quantity}
                onIncrease={() => onIncrease(product.id)}
                onDecrease={() => onDecrease(product.id)}
            />
            <p className="w-24 text-right font-semibold">
                Rp {(product.price * product.quantity).toLocaleString()}
            </p>
        </div>
    );
}