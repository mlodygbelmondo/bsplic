import React from "react";

interface OwnProps {
  isMobileNavbarOpen: boolean;
}

const MobileNavbar = ({ isMobileNavbarOpen }: OwnProps) => {
  return (
    <div className="fixed">
      <div className="bg-black opacity-70 z-40" />
      <div className="bg-white"></div>
    </div>
  );
};

export default MobileNavbar;
