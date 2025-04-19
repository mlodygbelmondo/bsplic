import React, { memo, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";

interface OwnProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  placeholder: string;
  width?: string;
}

const SearchBar = memo(
  ({ inputValue, setInputValue, placeholder, width = "w-full" }: OwnProps) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
      [setInputValue]
    );

    const resetInput = useCallback(() => setInputValue(""), [setInputValue]);

    return (
      <div
        className={`p-3.5 ${width} bg-white justify-between flex shadow-md items-center rounded-lg`}
      >
        <div className="flex items-center w-full pr-2 gap-2">
          <BiSearch />
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            value={inputValue}
            className="outline-none text-sm placeholder:font-bold w-full"
          />
        </div>
        <IoCloseSharp
          className={`cursor-pointer ${inputValue.length ? "" : "hidden"}`}
          onClick={resetInput}
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
