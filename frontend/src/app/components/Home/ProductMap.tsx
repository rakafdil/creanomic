// components/ProductMap.tsx
"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
// Hapus 'dummyLocations' dari impor ini
import { LocationData } from "./data/locations";
import { InfoModal } from "./InfoModal";
import { LocationMarker } from "./LocationMarker";

// 1. Definisikan tipe untuk props yang akan diterima
interface ProductMapProps {
  locations: LocationData[];
}

// 2. Terima 'locations' sebagai props
export const ProductMap: React.FC<ProductMapProps> = ({ locations }) => {
  // 3. Hapus state internal ini, karena data sekarang dari props
  // const [locations, setLocations] = useState<LocationData[]>(dummyLocations);

  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  // Posisi tengah Indonesia
  const centerPosition: LatLngExpression = [-2.5489, 118.0149];
  const zoomLevel = 5;

  const handleMarkerSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  return (
    <>
      <MapContainer
        center={centerPosition}
        zoom={zoomLevel}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="map-tiles" // Ini untuk filter warna biru
        />

        {/* 4. Gunakan 'locations' (dari props) untuk me-render marker */}
        {locations.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            onSelect={handleMarkerSelect}
          />
        ))}
      </MapContainer>

      {selectedLocation && (
        <InfoModal location={selectedLocation} onClose={handleCloseModal} />
      )}
    </>
  );
};
