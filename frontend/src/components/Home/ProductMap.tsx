"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Feature, FeatureCollection } from "geojson";
import geoData from "./data/38 Provinsi Indonesia - Provinsi.json";
import { LocationData } from "./data/locations";
import { InfoModal } from "./InfoModal";
import { LocationMarker } from "./LocationMarker";

interface ProductMapProps {
  locations: LocationData[];
}

const typedGeoData = geoData as FeatureCollection;

export const ProductMap: React.FC<ProductMapProps> = ({ locations }) => {
  const geoStyle = {
    fillColor: "#0EA5E9",
    color: "#1D4ED8",
    weight: 2,
    fillOpacity: 0.55,
    opacity: 0.9,
  };

  const onEachProvince = (feature: Feature, layer: L.Layer) => {
    const { Provinsi } = (feature.properties as { Provinsi?: string }) || {};
    if (Provinsi) {
      (layer as L.Path).bindPopup(`<b style="color:#38BDF8">${Provinsi}</b>`);
    }
  };

  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

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
        style={{
          backgroundColor: "transparent",
          filter: "drop-shadow(0 0 3px #0EA5E9)",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="map-tiles"
        />
        <GeoJSON
          data={typedGeoData}
          style={() => geoStyle}
          onEachFeature={onEachProvince}
        />
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
