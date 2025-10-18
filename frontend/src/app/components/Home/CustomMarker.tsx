import React from "react";
import { Product } from "./data/locations";

// Tipe data baru untuk produk yang sudah dihitung persentasenya
type RankedProduct = Product & { percentage: number };

interface CustomMarkerProps {
  products: RankedProduct[];
}

// Fungsi untuk menentukan ukuran font-size/scale berdasarkan ranking
const getSizeClass = (index: number): string => {
  switch (index) {
    case 0:
      return "text-xl"; // Paling besar
    case 1:
      return "text-lg";
    case 2:
      return "text-base";
    case 3:
      return "text-sm"; // Paling kecil
    default:
      return "text-xs";
  }
};

// Fungsi untuk menentukan posisi di grid 2x2
const getGridPositionClass = (index: number): string => {
  switch (index) {
    case 0:
      return "top-1 left-1"; // Kiri atas
    case 1:
      return "top-1 right-1"; // Kanan atas
    case 2:
      return "bottom-1 left-1"; // Kiri bawah
    case 3:
      return "bottom-1 right-1"; // Kanan bawah
    default:
      return "hidden";
  }
};

export const CustomMarker: React.FC<CustomMarkerProps> = ({ products }) => {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 bg-yellow-400/80 border-2 border-yellow-200 rounded-full shadow-lg">
      {/* Kita gunakan positioning absolut untuk 2x2 grid
        karena text-align/grid biasa sulit diatur dalam divIcon Leaflet
      */}
      {products.slice(0, 4).map((product, index) => {
        const Icon = product.icon;
        return (
          <Icon
            key={product.name}
            className={`
              absolute text-black/70
              ${getSizeClass(index)}
              ${getGridPositionClass(index)}
            `}
            style={
              {
                // Alternatif: Gunakan scale untuk kontrol ukuran yang lebih halus
                // transform: `scale(${1 - (index * 0.2)})`
              }
            }
          />
        );
      })}
    </div>
  );
};
