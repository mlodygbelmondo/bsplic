import React from "react";
import sad from "../assets/sad.png";
import Image from "next/image";
import Link from "next/link";

const Livepagemain = () => {
  return (
    <div className="flex h-screen -translate-y-32 justify-center flex-col gap-2 items-center pt-44 px">
      <Image src="/sad.png" alt="Sad image" width={96} height={96} />
      <h4 className="text-xl md:text-2xl font-bold">Nic tu nie ma!</h4>
      <p className="text-gray-600 text-center text-sm md:text-base font-medium mb-1 md:px-0 px-16">
        Aktualnie nie ma żadnych zakładów na żywo.
      </p>
      <Link href="/">
        <button className="bg-red-600 hover:bg-red-700 transition-colors w-32 text-white p-3 rounded-md font-semibold">
          Powrót
        </button>
      </Link>
    </div>
  );
};

export default Livepagemain;
