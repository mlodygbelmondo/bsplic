import React, { useState, memo, useCallback } from "react";
import SearchBar from "./SearchBar";
import GeneralCategories from "./general-categories";
import GamingCategories from "./gaming-categories";

const Sidebar = memo(() => {
  const [titleInput, setTitleInput] = useState("");

  const handleInputChange = useCallback((value: string) => {
    setTitleInput(value);
  }, []);

  return (
    <div className="hidden xl:flex flex-col gap-4 fixed top-[4.5rem] left-10 w-72">
      <SearchBar
        inputValue={titleInput}
        setInputValue={handleInputChange}
        placeholder="Szukaj..."
      />
      <GeneralCategories />
      <GamingCategories />
    </div>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
