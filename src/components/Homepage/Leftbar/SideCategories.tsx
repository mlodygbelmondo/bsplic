import React from "react";
import circlePlaceholder from "../assets/circle.webp";
import { HiOutlineArrowRight } from "react-icons/hi";

import Image from "next/image";
import { createToast } from "@/utils/toasts";
import { TOAST_MESSAGES } from "@/utils/toastMessages";

interface Category {
  icon: string;
  title: string;
}

const SideCategories = () => {
  const categories: Category[] = [
    { icon: "/categories/gaming.png", title: "Gaming" },
    { icon: "/categories/drinking.png", title: "Picie" },
    { icon: "/categories/school.png", title: "Szkoła" },
    { icon: "/categories/award.png", title: "BSPL Awards" },
    { icon: "/categories/live.png", title: "Streaming" },
    { icon: "/categories/mma.png", title: "Freakfights" },
  ];

  return (
    <div className="bg-white px-3 pt-[10px] pb-1 rounded-lg flex flex-col shadow-elevate">
      <h5 className="font-bold mb-1 text-sm">Kategorie</h5>
      {categories.map((category, index) => (
        <div
          className={`flex justify-between px-[5px] py-2.5 hover:bg-slate-50 transition-all ease-in cursor-pointer items-center ${
            index === categories.length - 1 ? "" : "border-b"
          } border-gray-300`}
          key={index}
          onClick={() => createToast(TOAST_MESSAGES.functionUnderDevelopment)}
        >
          <div className="flex items-center text-sm gap-2 font-bold">
            <Image
              src={category.icon}
              alt="category icon"
              width={14}
              height={14}
            />{" "}
            {category.title}
          </div>
          <HiOutlineArrowRight />
        </div>
      ))}
    </div>
  );
};

export default SideCategories;
