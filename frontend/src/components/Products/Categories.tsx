import Image from "next/image";
import React from "react";

interface CategoriesProps {
  imgUrl: string;
  imgAlt: string;
  title: string;
  desc: string;
}

const CategoryCard: React.FC<CategoriesProps> = ({
  imgUrl,
  imgAlt,
  title,
  desc,
}) => {
  return (
    <div className="flex items-center py-4 sm:py-5 px-2 sm:px-2.5 bg-white rounded-lg text-left gap-2 sm:gap-2.5 justify-start hover:bg-gray-300 cursor-pointer transition-colors min-w-[140px] sm:min-w-[160px] lg:min-w-0">
      <div className="flex-shrink-0">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={imgAlt}
            width={64}
            height={64}
            className="object-contain w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
          />
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-300 rounded-full" />
        )}
      </div>
      <div className="w-full sm:w-32 lg:w-40 inline-flex flex-col justify-start items-start gap-1 sm:gap-1.5">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black">
          {title}
        </h3>
        <p className="text-xs sm:text-sm lg:text-base font-medium text-zinc-600">
          {desc}
        </p>
      </div>
    </div>
  );
};

const Categories = () => {
  const categories = [
    {
      imgUrl: "/assets/categories/vegetables.svg",
      imgAlt: "Fresh Vegetables",
      title: "Vegetables",
      desc: "Organic Vegetables",
    },
    {
      imgUrl: "/assets/categories/grape.svg",
      imgAlt: "Fresh Fruits",
      title: "Fruits",
      desc: "Organic Fruits",
    },
    {
      imgUrl: "/assets/categories/herb.svg",
      imgAlt: "Herb Products",
      title: "Herb",
      desc: "Fresh Herb",
    },
    {
      imgUrl: "/assets/categories/meat.svg",
      imgAlt: "Meat",
      title: "Meat",
      desc: "Fresh Meat",
    },
    {
      imgUrl: "/assets/categories/fish.svg",
      imgAlt: "Fish",
      title: "Fish",
      desc: "Fresh Fish",
    },
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex flex-row gap-2 sm:gap-3 lg:gap-0 lg:justify-between min-w-max lg:min-w-0 px-2 sm:px-0">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            imgUrl={category.imgUrl}
            imgAlt={category.imgAlt}
            title={category.title}
            desc={category.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;