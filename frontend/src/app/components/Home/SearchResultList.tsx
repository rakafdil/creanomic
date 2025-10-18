// components/SearchResultsList.tsx

import React from "react";
import { LocationData } from "./data/locations";
import { FaMapMarkerAlt } from "react-icons/fa";

interface SearchResultsListProps {
  locations: LocationData[];
  onSelect: (location: LocationData) => void;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  locations,
  onSelect,
}) => {
  if (locations.length === 0) {
    return null;
  }

  return (
    // Backdrop untuk menutup list jika diklik di luar
    <div
      className="fixed inset-0 z-10"
      onClick={() => onSelect(locations[0])} // Trik: sembunyikan list dgn memilih item (atau bisa dibuat fungsi onDismiss)
    >
      {/* Container List */}
      <div className="absolute w-full max-w-4xl px-4 md:px-8 mx-auto top-[110px] md:top-[120px]">
        <ul
          className="bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Hindari penutupan saat list diklik
        >
          {locations.map((location) => (
            <li
              key={location.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-700 transition-colors"
              onClick={() => onSelect(location)}
            >
              <FaMapMarkerAlt className="text-lime-400" />
              <div>
                <span className="font-medium">{location.name}</span>
                <span className="text-sm text-neutral-400">
                  {" - "}
                  {location.province}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
