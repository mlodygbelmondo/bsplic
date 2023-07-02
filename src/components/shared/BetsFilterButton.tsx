import React from "react";

interface OwnProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  icon: JSX.Element;
}

const BetsFilterButton = ({ isActive, onClick, label, icon }: OwnProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 md:p-2.5 shadow font-medium rounded-full flex items-center gap-1 text-[11px] md:text-sm transition-colors ${
        isActive
          ? "bg-black text-white"
          : "bg-white text-black hover:bg-gray-50"
      }`}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};

export default BetsFilterButton;
