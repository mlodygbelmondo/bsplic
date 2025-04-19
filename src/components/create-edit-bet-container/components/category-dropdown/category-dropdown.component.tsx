import { Option, Select } from "@mui/joy";
import type { FunctionComponent } from "react";
import { allCategories } from "./category-dropdown.consts";
import Image from "next/image";

interface OwnProps {
  // Move to avoid rerender
  iconPath: string;
  value: string;
  onChange: (event: any, value: string | null) => void;
}

const CategoryDropdown: FunctionComponent<OwnProps> = ({
  onChange,
  value,
  iconPath,
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      startDecorator={
        <Image src={iconPath} alt={iconPath} width={16} height={16} />
      }
      className="mx-20"
    >
      {allCategories.map((category) => (
        <Option value={category.icon} key={category.pathname}>
          <div className="flex w-full justify-center">
            <Image
              src={category.icon}
              alt={category.name}
              width={16}
              height={16}
            />
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default CategoryDropdown;
