import BetCard from "@/components/Homepage/Bets/BetCard";
import deleteData from "@/server/api/deleteData";
import { getAllBets } from "@/server/api/queries";
import dayjs from "dayjs";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const Home = () => {
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
      <h1 className="text-2xl font-bold text-center">Zarządzaj zakładami</h1>
      <div className="flex flex-col gap-3 mt-3.5 ">
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
          return (
            <div key={index} className="flex flex-col gap-1.5">
              <div className="flex justify-end">
                {" "}
                <button
                  className={`p-2  transition-colors font-semibold text-sm text-white rounded-md bg-red-700 hover:bg-red-800`}
                  onClick={() => {
                    deleteData("bets", bet.id);
                  }}
                >
                  Usuń
                </button>
              </div>
              <BetCard bet={betObj} />
              <div className="px-5 pt-2">
                <div className="bg-gray-500 opacity-10  h-0.5 w-full"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
