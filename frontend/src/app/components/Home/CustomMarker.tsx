import React from "react";
import { Product } from "./data/locations";

type RankedProduct = Product & { percentage: number };

interface CustomMarkerProps {
  products: RankedProduct[];
}

const getSizeClass = (index: number): string => {
  switch (index) {
    case 0:
      return "text-xl";
    case 1:
      return "text-lg";
    case 2:
      return "text-base";
    case 3:
      return "text-sm";
    default:
      return "text-xs";
  }
};

const getGridPositionClass = (index: number): string => {
  switch (index) {
    case 0:
      return "top-1 left-1";
    case 1:
      return "top-1 right-1";
    case 2:
      return "bottom-1 left-1";
    case 3:
      return "bottom-1 right-1";
    default:
      return "hidden";
  }
};

export const CustomMarker: React.FC<CustomMarkerProps> = ({ products }) => {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 bg-[#D0F348] rounded-full shadow-lg">
      {/* Blur & Pulse effect */}
      <span
        className="absolute inset-0 rounded-full bg-[#D0F348] blur-xl opacity-60 animate-pulse"
        style={{ zIndex: 0 }}
      />
      {/* Marker icons */}
      {products.map((product, index) => {
        const Icon = product.icon;
        return (
          <Icon
            key={product.name}
            className={`
              absolute text-black/70
              ${getSizeClass(index)}
              ${getGridPositionClass(index)}
            `}
            style={{ zIndex: 1 }}
          />
        );
      })}
    </div>
  );
};
