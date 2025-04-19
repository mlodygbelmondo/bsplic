import { Category } from "@/components/create-edit-bet-container/components/category-dropdown/category-dropdown.types";
import type { FunctionComponent } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import Image from "next/image";

interface OwnProps {
  shouldBeRounded: boolean;
  category: Category;
}

const CategoryCard: FunctionComponent<OwnProps> = ({
  category: { icon, name, pathname },
  shouldBeRounded,
}) => {
  const handleClick = () => {};

  return (
    <div
      className={`flex justify-between px-[5px] py-2.5 hover:bg-slate-50 transition-all ease-in cursor-pointer items-center ${
        shouldBeRounded ? "" : "border-b"
      } border-gray-300`}
      onClick={handleClick}
    >
      <div className="flex items-center text-sm gap-2 font-bold">
        <Image src={icon} alt="popular bet icon" width={14} height={14} />
        {name}
      </div>
      <HiOutlineArrowRight />
    </div>
  );
};

export default CategoryCard;
