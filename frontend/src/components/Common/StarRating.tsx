import { FaRegStar, FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  className,
}) => {
  return (
    <div className={`flex items-center ${className} gap-1 sm:gap-2`}>
      {[...Array(5)].map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <div key={index} className="relative w-4 h-4 lg:w-5 lg:h-5">
            <FaRegStar className="absolute text-yellow-400 w-4 h-4 lg:w-5 lg:h-5" />
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <FaStar className="text-yellow-400 w-4 h-4 lg:w-5 lg:h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
