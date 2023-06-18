import React from "react";

interface OwnProps {
  couponCartNumber: number;
}

const MobileCouponCartNumber = ({ couponCartNumber }: OwnProps) => {
  return (
    <div className="px-2 min-w-[24px] h-6 text-sm text-white flex items-center justify-center font-medium rounded-full bg-red-800 absolute -right-1 -top-1">
      {couponCartNumber}
    </div>
  );
};

export default MobileCouponCartNumber;
