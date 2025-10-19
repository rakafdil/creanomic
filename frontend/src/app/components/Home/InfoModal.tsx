import React from "react";
import { LocationData, FaMapMarkerAlt, RxCross2 } from "./data/locations";

interface InfoModalProps {
  location: LocationData;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ location, onClose }) => {
  const total = location.categories
    .flatMap((cat) => cat.products)
    .reduce((sum, p) => sum + p.quantity, 0);

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="relative w-full max-w-md p-6 m-4 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg text-neutral-200"
        onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat klik di dalam modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
          aria-label="Tutup modal"
        >
          <RxCross2 size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaMapMarkerAlt className="text-lime-400" size={20} />
          <h2 className="text-xl font-semibold">
            {location.name} - {location.province}
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {location.categories.map((category) => (
            <div key={category.categoryName}>
              <div className="flex items-center gap-2 mb-3">
                <category.icon className="text-lime-400" size={20} />
                <h3 className="text-lg font-medium">{category.categoryName}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.products.map((product) => {
                  const percent =
                    total > 0
                      ? Math.round((product.quantity / total) * 100)
                      : 0;
                  return (
                    <span
                      key={product.name}
                      className="px-3 py-1 text-sm font-medium bg-lime-400/20 text-lime-300 rounded-full"
                    >
                      {product.name}{" "}
                      <span className="text-lime-200">({percent}%)</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-xs text-neutral-500">
          Data ini menampilkan hasil pertanian dan peternakan utama yang
          dihasilkan di wilayah {location.name}.
        </p>
      </div>
    </div>
  );
};
