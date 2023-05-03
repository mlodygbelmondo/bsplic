import { TOAST_MESSAGES } from "@/utils/toastMessages";
import { createToast } from "@/utils/toasts";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputContent, setInputContent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputContent(e.target.value);

  return (
    <div className="p-3.5 bg-white justify-between flex shadow-md items-center rounded-lg">
      <div className="flex items-center w-full pr-2 gap-2">
        <BiSearch />
        <input
          type="text"
          placeholder="Szukaj"
          onChange={handleChange}
          value={inputContent}
          className="outline-none text-sm placeholder:font-bold w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createToast(TOAST_MESSAGES.xD);
            }
          }}
        />
      </div>
      <IoCloseSharp
        className={`cursor-pointer ${inputContent.length ? "" : "hidden"}`}
        onClick={(e) => {
          setInputContent("");
        }}
      />
    </div>
  );
};

export default SearchBar;
