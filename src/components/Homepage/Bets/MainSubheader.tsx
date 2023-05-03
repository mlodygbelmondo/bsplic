import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BiTime, BiTimeFive } from "react-icons/bi";

type category = "popular" | "now";

const MainSubheader = () => {
  const [activeCategory, setActiveCategory] = useState<category>("now");
  return (
    <div className="main-subheader-container">
      <div className="flex gap-1">
        <div
          className={`transition-colors duration-300 ease-in-out pl-1 pr-[7px] py-1 cursor-pointer justify-center  font-bold flex gap-1 items-center ${
            activeCategory === "now"
              ? "border-red-500 border-b-[3px] text-red-500"
              : "relative bottom-[1px]"
          } `}
          onClick={() => {
            setActiveCategory("now");
          }}
        >
          <BiTimeFive className="relative" />
          <h5>Najnowsze</h5>
        </div>
        <div
          className={`transition-colors duration-300 ease-in-out pl-1 pr-[7px] py-1 cursor-pointer justify-center  font-bold flex gap-1 items-center ${
            activeCategory === "popular"
              ? "border-red-500 border-b-[3px] text-red-500"
              : "relative bottom-[1px]"
          } `}
          onClick={() => {
            setActiveCategory("popular");
          }}
        >
          <FaStar className="bottom-[1px] relative" />
          <h5>Popularne</h5>
        </div>
      </div>
      <hr className="" />
    </div>
  );
};

export default MainSubheader;
