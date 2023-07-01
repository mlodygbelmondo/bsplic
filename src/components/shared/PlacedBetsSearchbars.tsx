import React from "react";
import SearchBar from "../Homepage/Leftbar/SearchBar";

interface OwnProps {
  titleInput: string;
  setTitleInput: (titleInput: string) => void;
  betInput: string;
  setBetInput: (betInput: string) => void;
}

const PlacedBetsSearchbars = ({
  titleInput,
  setTitleInput,
  betInput,
  setBetInput,
}: OwnProps) => {
  return (
    <div className="flex flex-col mt-5 md:w-[600px] justify-center md:flex-row gap-2">
      <SearchBar
        inputValue={titleInput}
        setInputValue={setTitleInput}
        placeholder="Szukaj po tytule..."
      />
      <SearchBar
        inputValue={betInput}
        setInputValue={setBetInput}
        placeholder="Szukaj po zakładzie..."
      />
    </div>
  );
};

export default PlacedBetsSearchbars;
