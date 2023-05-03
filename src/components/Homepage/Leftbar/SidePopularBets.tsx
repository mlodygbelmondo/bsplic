import React from "react";
import circlePlaceholder from "../assets/circle.webp";
import examPNG from "../assets/popularbets/exam.png";
import atomPNG from "../assets/popularbets/atom.png";
import bsplPNG from "../assets/popularbets/bspl.png";
import crazyPNG from "../assets/popularbets/crazy.png";
import panstwamiastaPNG from "../assets/popularbets/panstwamiasta.webp";
import awardPNG from "../assets/award.png";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";
import { createToast } from "@/utils/toasts";
import { TOAST_MESSAGES } from "@/utils/toastMessages";

interface Popularbet {
  icon: string;
  title: string;
}

const SidePopularBets = () => {
  const popularbets: Popularbet[] = [
    { icon: "/popularbets/shooting.png", title: "CS:GO" },
    { icon: "/popularbets/football.png", title: "FIFA 23" },
    { icon: "/popularbets/finish-flag.png", title: "Grid 2" },
    { icon: "/popularbets/robbery.png", title: "GTA V" },
    // { icon: panstwamiastaPNG, title: 'Państwa-miasta' },
    // { icon: bsplPNG, title: 'BSPL' },
    { icon: "/popularbets/dice.png", title: "Bukmacherka" },
    // { icon: crazyPNG, title: 'Dawid Jasper' },
    // { icon: atomPNG, title: 'Fizyka' },
    // { icon: examPNG, title: 'Matura' },
  ];

  return (
    <div className="bg-white px-3 pt-[10px] pb-1 rounded-lg flex flex-col shadow-elevate">
      <h5 className="font-bold mb-1 text-sm">Popularne</h5>
      {popularbets.map((popularbet, index) => (
        <div
          className={`flex justify-between px-[5px] py-2.5 hover:bg-slate-50 transition-all ease-in cursor-pointer items-center ${
            index === popularbets.length - 1 ? "" : "border-b"
          } border-gray-300`}
          key={index}
          onClick={() => createToast(TOAST_MESSAGES.functionUnderDevelopment)}
        >
          <div className="flex items-center text-sm gap-2 font-bold">
            <Image
              src={popularbet.icon}
              alt="popular bet icon"
              width={14}
              height={14}
            />
            {popularbet.title}
          </div>
          <HiOutlineArrowRight />
        </div>
      ))}
    </div>
  );
};

export default SidePopularBets;
