"use client";

import dynamic from "next/dynamic";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { dummyLocations } from "./data/locations";

const MapComponentWithNoSSR = dynamic(
  () => import("./ProductMap").then((mod) => mod.ProductMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full text-neutral-400">
        Memuat peta...
      </div>
    ),
  }
);

export default function GIS() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = dummyLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.province.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <main className="flex flex-col h-[1044px] bg-neutral-900 text-neutral-200 py-10">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-4 z-20">
        <h1 className="text-3xl font-bold text-center text-lime-400">
          Persebaran Produk
        </h1>

        {/* Search Bar (Visual) */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari wilayah atau provinsi..."
            className="w-full px-4 py-3 pl-10 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
        </div>
      </div>

      {/* Map Container */}
      <div className="pt-10 flex items-center justify-center flex-grow w-full relative -mt-[110px] md:-mt-[140px]">
        <MapComponentWithNoSSR locations={filteredLocations} />
      </div>
    </main>
  );
}
