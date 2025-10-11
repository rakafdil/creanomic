import ProductItem from "./ProductItem";

type Product = {
    id: string | number;
    // add other product fields here as needed, for example:
    // name: string;
    // price: number;
    // quantity: number;
    [key: string]: any;
};

type Props = {
    products: Product[];
    onIncrease: (productId: Product['id']) => void;
    onDecrease: (productId: Product['id']) => void;
};

export default function ProductList({ products, onIncrease, onDecrease }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow p-4">
            <div className="grid grid-cols-4 font-semibold border-b pb-2 text-green-600">
                <span>Product</span>
                <span className="text-right">Harga</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Sub Total</span>
            </div>
            {products.map((p) => (
                <ProductItem
                    key={p.id}
                    product={p}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
            ))}
        </div>
    );
}