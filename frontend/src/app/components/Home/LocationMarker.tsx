"use client";

import React from "react";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { LocationData, Product } from "./data/locations";
import { CustomMarker } from "./CustomMarker";

interface LocationMarkerProps {
  location: LocationData;
  onSelect: (location: LocationData) => void;
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  location,
  onSelect,
}) => {
  // 1. Gabungkan semua produk dari semua kategori
  const allProducts: Product[] = location.categories.flatMap(
    (cat) => cat.products
  );

  // 2. Hitung total kuantitas
  const totalQuantity = allProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  // 3. Hitung persentase dan urutkan
  const rankedProducts = allProducts
    .map((product) => ({
      ...product,
      percentage: (product.quantity / totalQuantity) * 100,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // 4. Ubah komponen React (CustomMarker) menjadi HTML string
  const iconHtml = ReactDOMServer.renderToString(
    <CustomMarker products={rankedProducts} />
  );

  // 5. Buat divIcon Leaflet
  const customIcon = divIcon({
    html: iconHtml,
    className: "custom-leaflet-icon", // Class dari globals.css
    iconSize: [48, 48], // Sesuaikan dengan ukuran di CustomMarker
    iconAnchor: [24, 24], // Tengah
  });

  return (
    <Marker
      position={location.position}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          onSelect(location);
        },
      }}
    />
  );
};
