import React from "react";
import sad from "../assets/sad.png";
import Image from "next/image";
import Link from "next/link";

const PromotionpageMain = () => {
  return (
    <div className="flex justify-center flex-col gap-2 items-center mt-44">
      <Image src="/sad.png" alt="Sad image" width={160} height={160} />
      <h4 className="text-3xl font-bold mb-1">Nic tu nie ma!</h4>
      <p className="text-gray-600 font-medium mb-1">
        Aktualnie nie ma żadnych promocji.
      </p>
      <Link href="/bsplic/">
        <button className="bg-red-600 hover:bg-red-700 transition-colors w-32 text-white p-3 rounded-md font-semibold">
          Powrót
        </button>
      </Link>
    </div>
  );
};

export default PromotionpageMain;
