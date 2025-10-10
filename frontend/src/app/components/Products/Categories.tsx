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
    <div className="flex items-center py-5 px-2.5 bg-white rounded-lg text-left gap-2.5 justify-start hover:bg-gray-300 cursor-pointer">
      <div className="">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={imgAlt}
            width={64}
            height={64}
            className="object-contain"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-full" />
        )}
      </div>
      <div className="w-40 inline-flex flex-col justify-start items-start gap-1.5">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <p className="text-base font-medium text-zinc-600">{desc}</p>
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
    <div className="flex flex-row justify-between">
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
  );
};

export default Categories;
