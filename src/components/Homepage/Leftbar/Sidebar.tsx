import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SidePopularBets from "./SidePopularBets";
import SideCategories from "./SideCategories";

const Sidebar = () => {
  const [titleInput, setTitleInput] = useState("");

  return (
    <div className="hidden xl:flex flex-col gap-4 fixed top-[4.5rem] left-10 w-72">
      <SearchBar
        inputValue={titleInput}
        setInputValue={setTitleInput}
        placeholder="Szukaj..."
      />
      <SidePopularBets />
      <SideCategories />
    </div>
  );
};

export default Sidebar;
