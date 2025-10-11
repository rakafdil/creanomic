import React from "react";
import ProductCard from "../Common/ProductCard";

interface Product {
  id: number;
  name: string;
  unit: string; // e.g., "4 pcs", "100 gram"
  price: number;
  rating: number;
  image: string;
  hotDeal?: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Sweet Banana",
    unit: "4 pcs",
    price: 15000,
    rating: 4.8,
    image: "assets/products/banana.svg",
  },
  {
    id: 2,
    name: "Fresh Broccoli",
    unit: "100 gram",
    price: 18000,
    rating: 4.8,
    image: "assets/products/broccoli.svg",
  },
  {
    id: 3,
    name: "Ripe Avocado",
    unit: "100 gram",
    price: 25000,
    rating: 4.8,
    image: "assets/products/avocado.svg",
    hotDeal: 1035,
  },
  {
    id: 4,
    name: "Premium Beef",
    unit: "150 gram",
    price: 15000,
    rating: 4.8,
    image: "assets/products/meat.svg",
  },
  {
    id: 5,
    name: "Green Cabbage",
    unit: "200 gram",
    price: 10000,
    rating: 4.8,
    image: "assets/products/cabbage.svg",
  },
  {
    id: 6,
    name: "Fresh Garlic",
    unit: "100 gram",
    price: 18000,
    rating: 4.8,
    image: "assets/products/onion.svg",
  },
  {
    id: 7,
    name: "Salmon Fillet",
    unit: "200 gram",
    price: 55000,
    rating: 4.8,
    image: "assets/products/salmon.svg",
  },
  {
    id: 8,
    name: "Red Chili",
    unit: "150 gram",
    price: 19000,
    rating: 4.8,
    image: "assets/products/chili.svg",
  },
];

interface ProductDisplayProps {
  gridRow?: boolean;
  className?: string;
}

const ProductsDisplay: React.FC<ProductDisplayProps> = ({
  gridRow = false,
  className = "",
}) => {
  return (
    <div
      className={`${
        gridRow
          ? "flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      } ${className}`}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className={`${gridRow ? "flex-shrink-0 snap-start w-60 pb-3" : ""}`}
        >
          <ProductCard
            imgUrl={product.image}
            imgWidth={150}
            imgHeight={150}
            name={product.name}
            quantity={product.unit}
            rating={product.rating}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductsDisplay;
