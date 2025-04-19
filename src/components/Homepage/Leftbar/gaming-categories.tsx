import React from "react";
import { gamingCategories } from "@/components/create-edit-bet-container/components/category-dropdown/category-dropdown.consts";
import CategoryCard from "./category-card";

const GamingCategories = () => {
  return (
    <div className="bg-white px-3 pt-[10px] pb-1 rounded-lg flex flex-col shadow-elevate">
      <h5 className="font-bold mb-1 text-sm">Gry</h5>
      {gamingCategories.map((category, index) => {
        return (
          <CategoryCard
            key={index}
            shouldBeRounded={index === gamingCategories.length - 1}
            category={category}
          />
        );
      })}
    </div>
  );
};

export default GamingCategories;
