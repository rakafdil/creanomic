// ReviewTab.tsx
import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

// Data Dummy untuk Ulasan (biasanya ini dari API)
const ratingDistribution = [
  { stars: "FIVE", count: 50 },
  { stars: "FOUR", count: 100 },
  { stars: "THREE", count: 78 },
  { stars: "TWO", count: 20 },
  { stars: "ONE", count: 3 },
];

const feedbacks = [
  {
    name: "Robert Payne",
    rating: 4,
    comment:
      "Sweet Banana ini benar-benar sesuai namanya manis dan lembut! Saya sering pakai untuk smoothie pagi sebelum olahraga, hasilnya bikin energi banget. Packaging-nya juga bersih dan rapi.",
    avatarUrl: "https://i.pravatar.cc/150?u=robertpayne",
  },
  {
    name: "Rachel Flora",
    rating: 5,
    comment:
      "Sweet Banana ini benar-benar sesuai namanya manis dan lembut! Saya sering pakai untuk smoothie pagi sebelum olahraga, hasilnya bikin energi banget. Packaging-nya juga bersih dan rapi.",
    avatarUrl: "https://i.pravatar.cc/150?u=rachelflora",
  },
  {
    name: "Very Fachrurozi",
    rating: 3,
    comment: "Pisang ini busuk",
    avatarUrl: "https://i.pravatar.cc/150?u=veryfachrurozi",
  },
];

// --- Sub-komponen untuk Bintang ---
interface StarRatingProps {
  rating: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, className }) => (
  // Bintang menggunakan w-4 h-4 di mobile, dan kembali ke ukuran default/auto di desktop
  <div className={`flex items-center ${className} gap-1 sm:gap-2`}>
    {[...Array(5)].map((_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-yellow-400 w-4 h-4 lg:w-auto lg:h-auto" />
      ) : (
        <FaRegStar key={index} className="text-yellow-400 w-4 h-4 lg:w-auto lg:h-auto" />
      )
    )}
  </div>
);

// --- Komponen Utama ---
const ReviewTab = () => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const totalRatings = ratingDistribution.reduce(
    (acc, item) => acc + item.count,
    0
  );

  return (
    // Mengurangi gap di mobile, mempertahankan lg:gap-12
    <main className="w-full mx-auto flex flex-col gap-8 lg:gap-12 px-0 sm:px-6">
      <div className="w-full flex flex-col gap-10 lg:gap-24">
        {/* Rating Distribution & Summary */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Ini sudah responsif (bertumpuk di mobile, berdampingan di sm:) */}
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            <div className="w-full sm:w-2/3">
              {ratingDistribution.map((item) => {
                const percentage =
                  totalRatings > 0 ? (item.count / totalRatings) * 100 : 0;
                return (
                  <div
                    key={item.stars}
                    // Mengurangi gap dan font size di mobile
                    className="flex items-center gap-2 sm:gap-4 mb-1 text-xs sm:text-sm"
                  >
                    <span className="w-10 sm:w-12 text-gray-600">{item.stars}</span>
                    <FaStar className="text-yellow-400 w-3 h-3 sm:w-auto sm:h-auto" />
                    {/* Tinggi bar 2px di mobile, 2.5px di desktop */}
                    <div className="flex-1 bg-gray-200 rounded-full h-2 sm:h-2.5">
                      <div
                        className="bg-yellow-400 h-2 sm:h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-6 sm:w-8 text-right text-gray-800 font-medium">
                      {item.count}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Summary Box */}
            <div className="w-full sm:w-1/3 flex flex-col items-center justify-center bg-amber-50 rounded-xl p-4 sm:p-6 h-full">
              {/* Ukuran font 4xl di mobile, kembali ke 5xl di desktop */}
              <p className="text-4xl lg:text-5xl font-bold text-yellow-400">4.3</p>
              <StarRating rating={4} className="my-1 sm:my-2" />
              <p className="text-sm sm:text-base text-gray-600">{totalRatings} Ratings</p>
            </div>
          </div>
        </div>
        
        {/* Recent Feedbacks & Add Review Form */}
        {/* flex-col di mobile, lg:flex-row di desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-5">
          {/* Recent Feedbacks */}
          <div className="flex flex-col flex-1">
            {/* Ukuran font h2 lebih kecil di mobile */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Recent Feedbacks
            </h2>
            {/* Batasan scroll list review lebih ketat di mobile */}
            <div className="space-y-4 sm:space-y-6 max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-2">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.name}
                  // Padding dan gap lebih kecil di mobile
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex items-start gap-3 sm:gap-4"
                >
                  {/* Ukuran Avatar lebih kecil di mobile */}
                  <img
                    src={feedback.avatarUrl}
                    alt={feedback.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                  <div>
                    {/* Ukuran nama dan komentar disesuaikan */}
                    <h3 className="font-bold text-base sm:text-lg text-gray-800">{feedback.name}</h3>
                    <StarRating rating={feedback.rating} className="my-1" />
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {feedback.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Review Form */}
          <div className="flex flex-col flex-1">
            {/* Ukuran font h2 dan margin disesuaikan */}
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
              Add Review
            </h2>
            {/* Spasi antar elemen form lebih kecil di mobile */}
            <form className="space-y-3 lg:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Your Rating
                </label>
                {/* Ukuran bintang rating input lebih kecil di mobile */}
                <div className="flex gap-2 sm:gap-3 items-center text-xl lg:text-2xl text-gray-300">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <button
                        type="button"
                        key={ratingValue}
                        onClick={() => setUserRating(ratingValue)}
                        onMouseEnter={() => setHoverRating(ratingValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer"
                      >
                        {(hoverRating || userRating) >= ratingValue ? (
                          <FaStar className="text-yellow-400 transition-colors duration-150" />
                        ) : (
                          <FaRegStar className="text-gray-300 transition-colors duration-150" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Input Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Input your name"
                  // Padding lebih kecil di mobile
                  className="mt-1 block w-full px-3 py-1.5 lg:py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm"
                />
              </div>
              {/* Textarea Review */}
              <div>
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700"
                >
                  Write Your Review
                </label>
                <textarea
                  id="review"
                  rows={4} // Mengurangi rows menjadi 4 di mobile, menjaga 5 di desktop (tidak bisa langsung di Tailwind, tapi 4 lebih baik untuk mobile)
                  placeholder="Write here..."
                  // Padding dan font size lebih kecil di mobile
                  className="mt-1 block w-full px-3 py-1.5 lg:py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm"
                ></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                // Padding vertikal lebih kecil di mobile
                className="cursor-pointer w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 lg:py-3 px-4 rounded-lg transition-colors duration-300 text-base"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReviewTab;