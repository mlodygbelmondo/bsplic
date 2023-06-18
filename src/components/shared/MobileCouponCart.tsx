import { useChosenBetsContext } from "@/pages/_app";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

const MobileCouponCart = () => {
  const { isCouponOpen, setIsCouponOpen } = useChosenBetsContext();

  const openCoupon = () => setIsCouponOpen(true);

  return (
    <button
      onClick={openCoupon}
      className={`md:hidden ${
        isCouponOpen ? "hidden" : ""
      } fixed right-4 text-2xl bottom-4 text-white p-4 flex justify-center items-center rounded-full bg-red-600`}
    >
      <IoCartOutline />
    </button>
  );
};

export default MobileCouponCart;
