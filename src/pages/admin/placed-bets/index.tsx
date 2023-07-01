import MyCoupon from "@/components/mycoupons/MyCoupon";
import BetsStatusFilter from "@/components/shared/BetsStatusFilter";
import PlacedBetsSearchbars from "@/components/shared/PlacedBetsSearchbars";
import addData from "@/server/api/addData";
import deleteData from "@/server/api/deleteData";
import { getAllPlacedBets, getAllUsers } from "@/server/api/queries";
import { BETS_FILTER } from "@/utils/consts";
import { filterBets } from "@/utils/filterBets";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const Home = () => {
  const [users] = useCollection(getAllUsers());
  const [userBets] = useCollection(getAllPlacedBets());
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);
  const [betsFilter, setBetsFilter] = useState<keyof typeof BETS_FILTER>(
    BETS_FILTER.pending
  );
  const [titleInput, setTitleInput] = useState("");
  const [betInput, setBetInput] = useState("");

  const filteredBets = filterBets(
    userBets?.docs,
    betsFilter,
    titleInput,
    betInput
  );

  const sortedBets = filteredBets.sort((a, b) => {
    return dayjs
      .unix(a.data().betDate.seconds)
      .isBefore(dayjs.unix(b.data().betDate.seconds))
      ? 1
      : -1;
  });

  const toggleDeleteButton = () =>
    setIsDeleteButtonEnabled(!isDeleteButtonEnabled);

  const deleteBet = (betId: string) => deleteData("bets_placed", betId);

  return (
    <div className="pt-16 mt-0.5 pb-4 md:pr-[21.5rem] flex flex-col items-center xl:pr-[23.5rem] xl:pl-[22rem] md:pl-8 px-4">
      <h1 className="text-2xl font-bold text-center pb-4">
        Postawione zakłady
      </h1>
      <BetsStatusFilter betsFilter={betsFilter} setBetsFilter={setBetsFilter} />
      <PlacedBetsSearchbars
        titleInput={titleInput}
        setTitleInput={setTitleInput}
        betInput={betInput}
        setBetInput={setBetInput}
      />
      <div className="flex flex-col gap-7 items-center mt-4">
        {sortedBets?.map((bet) => {
          return (
            <div
              key={bet.id}
              className="flex flex-col gap-2 w-full md:w-auto"
              onDoubleClick={toggleDeleteButton}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center pl-2 gap-3">
                  <p className="font-bold text-sm md:text-lg">
                    {
                      users?.docs
                        .find((user) => user.id === bet.data().userId)
                        ?.data().displayName
                    }
                  </p>
                </div>
                <div className="flex gap-1 md:gap-2">
                  <button
                    className={`p-1.5 text-xs md:p-2 md:text-sm transition-colors font-semibold text-white rounded-md bg-green-600 ${
                      bet.data().betStatus !== "pending"
                        ? "opacity-50"
                        : "hover:bg-green-700"
                    }`}
                    onClick={() => {
                      if (bet.data().betStatus === "pending") {
                        const userBalance = users?.docs
                          .find((user) => user.id === bet.data().userId)
                          ?.data().balance;
                        let odds =
                          bet.data().betType === "single"
                            ? bet.data().bet.betOdds
                            : bet.data().betOdds;
                        const winnings = Number(bet.data().betAmount) * odds;
                        if (
                          !isNaN(
                            parseFloat(
                              (Number(userBalance) + winnings).toFixed(2)
                            )
                          )
                        )
                          addData("users", bet.data().userId, {
                            balance: parseFloat(
                              (Number(userBalance) + winnings).toFixed(2)
                            ),
                          });
                        else alert("NaN!");
                        addData("bets_placed", bet.id, {
                          betStatus: "won",
                        });
                      }
                    }}
                  >
                    Wygrany
                  </button>
                  <button
                    className={`p-1.5 text-xs md:p-2 md:text-sm transition-colors font-semibold text-white rounded-md bg-red-500 ${
                      bet.data().betStatus !== "pending"
                        ? "opacity-50"
                        : "hover:bg-red-600"
                    }`}
                    onClick={() => {
                      addData("bets_placed", bet.id, {
                        betStatus: "lost",
                      });
                    }}
                  >
                    Przegrany
                  </button>
                  <button
                    className={`p-1.5 text-xs md:p-2 md:text-sm transition-colors font-semibold rounded-md  ${
                      !isDeleteButtonEnabled
                        ? "bg-gray-300 text-gray-400"
                        : "bg-red-700 hover:bg-red-800 text-white"
                    }`}
                    onClick={() => deleteBet(bet.id)}
                    disabled={!isDeleteButtonEnabled}
                  >
                    Usuń
                  </button>
                </div>
              </div>
              <MyCoupon coupon={bet.data() as any} id={bet.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
