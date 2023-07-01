import { BETS_FILTER } from "@/utils/consts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OwnProps {
  betsFilter: keyof typeof BETS_FILTER;
}

const NoMyCoupons = ({ betsFilter }: OwnProps) => {
  const message = {
    lost: "żadnych przegranych",
    pending: "żadnych otwartych",
    won: "jeszcze wygranych",
  };

  return (
    <div className="flex justify-center flex-col gap-2 items-center mt-10 text-center">
      <div className="p-4 bg-white rounded-full flex items-center justify-center">
        <Image
          src="/categories/award.png"
          alt="Award image"
          className="relative top-1"
          width={58}
          height={58}
        />
      </div>
      {/* TODO: CHANGE TO OTWARTYCH JAK BEDZIE SUBHEADER */}
      <h4 className="text-lg font-bold text-center">
        Nie masz {message[betsFilter]} kuponów.
      </h4>
      <p className="text-gray-600 font-medium text-sm mb-1">
        Pusto! Przejdź do zakładów, by złożyć kupon.
      </p>
      <Link href="/">
        <button className="bg-gray-900 hover:bg-gray-700 transition-colors w-44 text-white p-3 text-sm rounded-md font-semibold">
          Wszystkie zakłady
        </button>
      </Link>
    </div>
  );
};

export default NoMyCoupons;
