import React from "react";
import { generalCategories } from "@/components/create-edit-bet-container/components/category-dropdown/category-dropdown.consts";
import CategoryCard from "./category-card";

const GeneralCategories = () => {
  return (
    <div className="bg-white px-3 pt-[10px] pb-1 rounded-lg flex flex-col shadow-elevate">
      <h5 className="font-bold mb-1 text-sm">Kategorie</h5>
      {generalCategories.map((category, index) => {
        return (
          <CategoryCard
            key={index}
            shouldBeRounded={index === generalCategories.length - 1}
            category={category}
          />
        );
      })}
    </div>
  );
};

export default GeneralCategories;
