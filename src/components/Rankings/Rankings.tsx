import { getAllPlacedBets, getAllUsers } from "@/server/api/queries";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import MyCoupon from "../mycoupons/MyCoupon";
import { RANKINGS_TAB } from "@/utils/consts";
import { sortRankings } from "@/utils/sortRankings";
import RankingsTab from "./RankingsTabs";

const Rankings = () => {
  const [users] = useCollection(getAllUsers());

  const [userBets] = useCollection(getAllPlacedBets());
  const [rankingsTab, setRankingsTab] = useState<keyof typeof RANKINGS_TAB>(
    RANKINGS_TAB.BIGGEST_WON_ODDS
  );

  const sortedBets = sortRankings(userBets?.docs, rankingsTab);

  return (
    <div className="pt-[70px] flex flex-col pb-4 px-4 md:px-0 items-center md:pl-[15rem] md:pr-[17rem] gap-3">
      <h1 className="text-2xl mb-1 font-bold">Rankingi</h1>
      <RankingsTab rankingsTab={rankingsTab} setRankingsTab={setRankingsTab} />
      {sortedBets?.map((bet, index) => {
        const displayName = users?.docs
          .find((user) => user.id === bet.data().userId)
          ?.data().displayName;

        return (
          <div key={bet.id} className="flex flex-col gap-2 w-full md:w-auto">
            <p className="font-bold text-sm md:text-lg">
              {index + 1}. {displayName}
            </p>
            <MyCoupon key={bet.id} coupon={bet.data() as any} id={bet.id} />
          </div>
        );
      })}
    </div>
  );
};

export default Rankings;
