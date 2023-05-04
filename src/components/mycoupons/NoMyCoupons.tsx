import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoMyCoupons = () => {
  return (
    <div className="flex justify-center flex-col gap-2 items-center pt-44">
      <Image src="/sad.png" alt="Sad image" width={120} height={120} />
      {/* TODO: CHANGE TO OTWARTYCH JAK BEDZIE SUBHEADER */}
      <h4 className="text-xl font-bold">
        Nie masz jeszcze postawionych kuponów.
      </h4>
      <p className="text-gray-600 font-medium text-sm mb-1">
        Pusto! Jeśli chcesz, przejdź do zakładów.
      </p>
      <Link href="/">
        <button className="bg-gray-900 hover:bg-gray-700 transition-colors w-44 text-white p-3 rounded-md font-semibold">
          Wszystkie zakłady
        </button>
      </Link>
    </div>
  );
};

export default NoMyCoupons;
