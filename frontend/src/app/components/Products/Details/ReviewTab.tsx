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
  <div className={`flex items-center ${className} gap-2`}>
    {[...Array(5)].map((_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-yellow-400" />
      ) : (
        <FaRegStar key={index} className="text-yellow-400" />
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
    <main className="w-full mx-auto flex flex-col gap-12 px-6">
      <div className="w-full flex flex-col gap-16 lg:gap-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="w-full sm:w-2/3">
              {ratingDistribution.map((item) => {
                const percentage =
                  totalRatings > 0 ? (item.count / totalRatings) * 100 : 0;
                return (
                  <div
                    key={item.stars}
                    className="flex items-center gap-4 mb-2 text-sm"
                  >
                    <span className="w-12 text-gray-600">{item.stars}</span>
                    <FaStar className="text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-400 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right text-gray-800 font-medium">
                      {item.count}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-full sm:w-1/3 flex flex-col items-center justify-center bg-amber-50 rounded-xl p-6 h-full">
              <p className="text-5xl font-bold text-yellow-400">4.3</p>
              <StarRating rating={4} className="my-2" />
              <p className="text-gray-600">{totalRatings} Ratings</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Feedbacks
            </h2>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.name}
                  className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4"
                >
                  <img
                    src={feedback.avatarUrl}
                    alt={feedback.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{feedback.name}</h3>
                    <StarRating rating={feedback.rating} className="my-1" />
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feedback.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add Review
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Your Rating
                </label>
                <div className="flex gap-3 items-center text-2xl text-gray-300">
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
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700"
                >
                  Write Your Review
                </label>
                <textarea
                  id="review"
                  rows={5}
                  placeholder="Write here..."
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
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
