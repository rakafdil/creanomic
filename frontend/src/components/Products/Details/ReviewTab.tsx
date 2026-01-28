import { BASE_URL } from "@/app/page";
import { Review } from "@/services/product.service";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ReviewPayload } from ".";
import ErrorModal from "@/components/Common/ErrorModal";
import { StarRating } from "@/components/Common/StarRating";

const ReviewTab = ({
  reviews,
  review_sum,
  add_review,
}: {
  reviews?: Review[];
  review_sum?: string;
  add_review: UseMutationResult<any, Error, ReviewPayload, unknown>;
}) => {
  const ratingDistribution = [
    {
      stars: "FIVE",
      count: reviews?.filter((r) => r.rating === 5).length || 0,
    },
    {
      stars: "FOUR",
      count: reviews?.filter((r) => r.rating === 4).length || 0,
    },
    {
      stars: "THREE",
      count: reviews?.filter((r) => r.rating === 3).length || 0,
    },
    {
      stars: "TWO",
      count: reviews?.filter((r) => r.rating === 2).length || 0,
    },
    {
      stars: "ONE",
      count: reviews?.filter((r) => r.rating === 1).length || 0,
    },
  ];

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const totalRatings = ratingDistribution.reduce(
    (acc, item) => acc + item.count,
    0,
  );
  const [comment, setComment] = useState("");

  const { error, isPending } = add_review;
  return (
    <main className="w-full mx-auto flex flex-col gap-8 lg:gap-12 px-0 sm:px-6">
      {add_review.isError && <ErrorModal error={add_review.error} />}
      <div className="w-full flex flex-col gap-10 lg:gap-24">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            <div className="w-full sm:w-2/3">
              {ratingDistribution.map((item) => {
                const percentage =
                  totalRatings > 0 ? (item.count / totalRatings) * 100 : 0;
                return (
                  <div
                    key={item.stars}
                    className="flex items-center gap-2 sm:gap-4 mb-1 text-xs sm:text-sm"
                  >
                    <span className="w-10 sm:w-12 text-gray-600">
                      {item.stars}
                    </span>
                    <FaStar className="text-yellow-400 w-3 h-3 sm:w-auto sm:h-auto" />
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
            <div className="w-full sm:w-1/3 flex flex-col items-center justify-center bg-amber-50 rounded-xl p-4 sm:p-6 h-full">
              <p className="text-4xl lg:text-5xl font-bold text-yellow-400">
                {review_sum || 0}
              </p>
              <StarRating
                rating={Number(review_sum) || 0}
                className="my-1 sm:my-2"
              />
              <p className="text-sm sm:text-base text-gray-600">
                {reviews?.length} Ratings
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-5">
          <div className="flex flex-col flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Recent Feedbacks
            </h2>
            <div className="space-y-4 sm:space-y-6 max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-2">
              {reviews?.map((feedback) => (
                <div
                  key={feedback.users?.username}
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex items-start gap-3 sm:gap-4"
                >
                  <img
                    src={
                      feedback.users?.profile_picture ||
                      "https://i.pravatar.cc/150?u=default"
                    }
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://i.pravatar.cc/150?u=robertpayne";
                    }}
                    alt={feedback.users?.username || "User"}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-800">
                      {feedback.users?.username || "Anonymous"}
                    </h3>
                    <StarRating rating={feedback.rating} className="my-1" />
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {feedback.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
              Add Review
            </h2>
            <form
              className="space-y-3 lg:space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                add_review.mutate({ rating: userRating, comment: comment });
                setComment("");
                setUserRating(0);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Your Rating
                </label>
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

              <div>
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700"
                >
                  Write Your Review
                </label>
                <textarea
                  id="review"
                  rows={4}
                  placeholder="Write here..."
                  className="mt-1 block w-full px-3 py-1.5 lg:py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isPending || userRating === 0}
                className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 lg:py-3 px-4 rounded-lg transition-colors duration-300 text-base ${
                  isPending || userRating === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReviewTab;
