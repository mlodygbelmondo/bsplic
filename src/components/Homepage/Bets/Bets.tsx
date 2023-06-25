import React from "react";
import MainSubheader from "./MainSubheader";
import BetCard from "./BetCard";

import gta5PNG from "../assets/popularbets/robbery.png";
import grid2PNG from "../assets/popularbets/finish-flag.png";
import atomPNG from "../assets/popularbets/atom.png";
import dicePNG from "../assets/popularbets/dice.png";
import { useCollection } from "react-firebase-hooks/firestore";
import { getAllBets } from "@/server/api/queries";
import dayjs from "dayjs";

interface Bet {
  icon: string;
  category: string;
  date: string;
  hour: string;
  homeName: string;
  awayName: string;
  bet1Name: string;
  home1Name: string;
  away1Name: string;
  home1Odds: number;
  away1Odds: number;
  home1Percents: number;
  away1Percents: number;
  isBet2: boolean;
  bet2Name: string | null;
  home2Name: string | null;
  away2Name: string | null;
  home2Odds: number | null;
  away2Odds: number | null;
  home2Percents: number | null;
  away2Percents: number | null;
}

const Bets = () => {
  const [bets, loading, err] = useCollection(getAllBets());

  const sortedBets = bets?.docs.sort((a, b) => {
    return dayjs
      .unix(a.data()?.creationDate?.seconds)
      .isBefore(dayjs.unix(b.data()?.creationDate?.seconds))
      ? 1
      : -1;
  });

  return (
    <div className="pt-16 mt-0.5 pb-4 md:pr-[21.5rem] xl:pr-[23.5rem] xl:pl-[22rem] md:pl-8 px-4">
      <MainSubheader />
      <div className="flex flex-col gap-3.5 mt-3.5 ">
        {sortedBets?.map((bet, index) => {
          const betObj = {
            id: bet.id,
            icon: bet.data().icon,
            category: bet.data().category,
            date: bet.data().date,
            hour: bet.data().hour,
            title: bet.data().title,
            subtitle: bet.data().subtitle,
            bet1: bet.data().bet1,
            bet2: bet.data().bet2,
            betLabel: bet.data().betLabel,
            bet1Odds: bet.data().bet1Odds,
            bet2Odds: bet.data().bet2Odds,
            bet1Percents: bet.data().bet1Percents,
            bet2Percents: bet.data().bet2Percents,
          };
          return <BetCard key={index} bet={betObj} />;
        })}
      </div>
    </div>
  );
};

export default Bets;
