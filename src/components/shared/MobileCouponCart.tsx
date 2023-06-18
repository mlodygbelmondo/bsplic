import { useChosenBetsContext } from "@/pages/_app";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import MobileCouponCartNumber from "./MobileCouponCartNumber";

const MobileCouponCart = () => {
  const { isCouponOpen, setIsCouponOpen, chosenBets } = useChosenBetsContext();

  const openCoupon = () => setIsCouponOpen(true);

  const couponCartNumber = chosenBets.length;

  return (
    <button
      onClick={openCoupon}
      className={`md:hidden ${
        isCouponOpen ? "hidden" : ""
      } fixed right-4 text-2xl bottom-4 text-white p-4 flex justify-center items-center rounded-full bg-red-600`}
    >
      <IoCartOutline />
      {couponCartNumber > 0 && (
        <MobileCouponCartNumber couponCartNumber={couponCartNumber} />
      )}
    </button>
  );
};

export default MobileCouponCart;
