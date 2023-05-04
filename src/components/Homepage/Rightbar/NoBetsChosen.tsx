import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const NoBetsChosen = () => {
  const router = useRouter();

  return (
    <div className="no-bets-container h-full gap-3.5 text-center px-4 flex flex-col items-center justify-center">
      <Image src="/winner.png" alt="Trophy Image" height={72} width={72} />
      <h3 className="font-semibold">Dodaj swój pierwszy zakład!</h3>
      <p className="font-semibold text-sm leading-5 text-gray-500">
        Nie masz żadnych zakładów. Kliknij kursy, aby dodać zakłady.
      </p>
      <button
        onClick={() => router.asPath !== "" && router.push("")}
        className="btn-all-bets py-3 px-8 rounded-full font-bold text-primary-500 border-[0.15rem] text-sm border-primary-500 hover:text-white hover:bg-primary-500 transition-colors ease-linear"
      >
        Wszystkie zakłady
      </button>
    </div>
  );
};

export default NoBetsChosen;
