import React from "react";
import SearchBar from "./SearchBar";
import SidePopularBets from "./SidePopularBets";
import SideCategories from "./SideCategories";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 fixed top-[4.5rem] left-10 w-72">
      <SearchBar />
      <SidePopularBets />
      <SideCategories />
    </div>
  );
};

export default Sidebar;
