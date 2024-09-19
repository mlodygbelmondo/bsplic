import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import type { FunctionComponent, ReactNode } from "react";
import { BsFillTrophyFill } from "react-icons/bs";

interface Props {}

import "react-casino-roulette/dist/index.css";
import RouletteLayout from "./layout";
import { twMerge } from "tw-merge";
import clsx from "clsx";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useAuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { getRouletteBetById, getUserById } from "@/server/api/queries";
import addData from "@/server/api/addData";
import { v4 as uuidv4 } from "uuid";
import { createToast } from "@/utils/toasts";
import { TOAST_MESSAGES } from "@/utils/toastMessages";
import getData from "../../server/api/getData";
import { on } from "events";
import {
  BLACK_NUMBERS,
  GREEN_NUMBERS,
  RED_NUMBERS,
  WHEEL_NUMBERS,
} from "@/utils/consts/roulette";
import { RouletteWheel } from "react-casino-roulette";

type SimpleRouletteBetData = {
  value: number;
  userId: string;
  status: "pending" | "resolved";
  result: "win" | "lose";
  bet: "green" | "red" | "black";
};

const firstLetterUppercase = (str?: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

// const everyFirstLetterOfWordUppercase = (str?: string) =>
//   str
//     ? str
//         .split(" ")
//         .map(
//           (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//         )
//         .join(" ")
//     : "";
type FormInput = {
  betValue: number;
};

const Home = ({}) => {
  const [start, setStart] = useState(false);
  const [winningBet, setWinningBet] = useState("-1");
  const [betType, setBetType] = useState<"green" | "red" | "black">("red");
  const [betId, setBetId] = useState("");
  const [shouldHandleBetEnd, setShouldHandleBetEnd] = useState(false);

  const { user }: { user: User } = useAuthContext();

  const [userData] = useCollection(getUserById(user?.uid));

  const userAccount = userData?.docs[0]?.data();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInput>();
  const onSubmit = async (data: FormInput, winningBet: string) => {
    const betId = uuidv4();

    let result: "win" | "lose" = "lose";

    switch (betType) {
      case "red":
        if (RED_NUMBERS.includes(winningBet)) {
          result = "win";
        }
        break;
      case "black":
        if (BLACK_NUMBERS.includes(winningBet)) {
          result = "win";
        }
        break;
      case "green":
        if (GREEN_NUMBERS.includes(winningBet)) {
          result = "win";
        }
        break;
    }

    const rouletteBet = {
      userId: user.uid,
      value: data.betValue,
      status: "pending",
      bet: betType,
      result,
    } satisfies SimpleRouletteBetData;

    await addData("users", user.uid, {
      balance: userAccount?.balance - data.betValue,
    });

    await addData("roulette_bets", betId, rouletteBet);
    setBetId(betId);
  };

  const onSpinningEnd = async () => {
    setStart(false);
    setShouldHandleBetEnd(true);
  };

  useEffect(() => {
    if (!shouldHandleBetEnd) {
      return;
    }

    const fetchData = async () => {
      let bet: SimpleRouletteBetData | null = null;

      await getData("roulette_bets", betId).then((data) => {
        if (data.result?.exists()) {
          bet = data.result.data() as SimpleRouletteBetData;
        }
      });

      if (!bet) {
        createToast(TOAST_MESSAGES.notFoundError);
        return setStart(false);
      }

      if (bet) {
        bet = bet as SimpleRouletteBetData;
      }

      const winnings = bet.bet === "green" ? bet.value * 18 : bet.value * 2;

      if (bet.result === "win") {
        await addData("users", user.uid, {
          balance: userAccount?.balance + winnings,
        });
        createToast(TOAST_MESSAGES.rouletteBetWon(winnings));
      } else {
        createToast(TOAST_MESSAGES.rouletteBetLost(bet.value));
      }

      await addData("roulette_bets", betId, {
        status: "resolved",
      });
    };

    fetchData().catch((error) => {
      console.error(error);
    });

    return setShouldHandleBetEnd(false);
  }, [betId, shouldHandleBetEnd, user.uid, userAccount?.balance]);

  const doSpin = () => {
    const random = Math.floor(Math.random() * 38);
    const winningBet = random === 37 ? "00" : random.toString();

    setWinningBet(winningBet);
    setStart(true);

    void handleSubmit((data) => onSubmit(data, winningBet))();
  };

  return (
    <div className="pt-[4.5rem] px-4 h-full flex-col gap-4 items-center flex w-full">
      <RouletteWheel
        onSpinningEnd={() => void onSpinningEnd()}
        start={start}
        customWheelNumbers={WHEEL_NUMBERS}
        winningBet={winningBet}
      />
      <div className="flex gap-3">
        <button
          onClick={() => setBetType("red")}
          disabled={start}
          className={twMerge(
            clsx(
              "w-20 h-12 bg-red-500 text-center hover:bg-red-600 font-medium transition-all text-white rounded-lg p-2",
              {
                "scale-105 -translate-y-1": betType === "red",
              }
            )
          )}
        >
          Red
        </button>
        <button
          onClick={() => setBetType("black")}
          disabled={start}
          className={twMerge(
            clsx(
              "w-20 h-12 text-center hover:bg-black bg-gray-800 font-medium transition-all text-white rounded-lg p-2",
              {
                "scale-105 -translate-y-1": betType === "black",
              }
            )
          )}
        >
          Black
        </button>
        <button
          onClick={() => setBetType("green")}
          disabled={start}
          className={twMerge(
            clsx(
              "w-20 h-12 text-center hover:bg-green-600 bg-green-500 font-medium transition-all text-white rounded-lg p-2",
              {
                "scale-105 -translate-y-1": betType === "green",
              }
            )
          )}
        >
          Green
        </button>
      </div>
      <div>
        <form className="justify-center flex gap-2 items-center">
          <input
            {...register("betValue", {
              required: true,
              min: 1,
              max: userAccount?.balance ?? 0,
            })}
            type="number"
            className="w-40 p-2 rounded-lg text-sm h-10 shadow-rightcard focus:outline-none"
          />
          <button
            type="button"
            className="p-2 bg-black hover:bg-gray-800 transition-all w-16 text-center rounded-lg text-white font-medium disabled:bg-gray-300 disabled:text-gray-500"
            disabled={start || !isValid}
            onClick={doSpin}
          >
            Spin
          </button>
        </form>
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactNode) => {
  return <RouletteLayout>{page}</RouletteLayout>;
};

export default Home;

// const [bet, setBet] = useState<RouletteBet | null>(null);

// type RouletteBet = {
//   type: string;
//   bet: string[];
//   odds: number;
// };

// type BetData = {
//   id: string;
//   bet: string;
// };

// const formattedBet = firstLetterUppercase(
//   bet?.bet ? bet.bet.join(", ").replace("_", " ") : ""
// );

// const [betsToPlace, setBetsToPlace] = useState<RouletteBet[]>([]);

// const handleBet = (betData: { id: string; bet: string }) => {
//   if (start) {
//     return;
//   }

//   const { id: value, bet: type } = betData;

//   const bet = value.split("-");

//   let odds = 1;

//   switch (type) {
//     case "RED":
//     case "BLACK":
//     case "ODD":
//     case "EVEN":
//     case "1_TO_18":
//     case "19_TO_36":
//       odds = 2;
//       break;
//     case "1ST_DOZEN":
//     case "2ND_DOZEN":
//     case "3RD_DOZEN":
//     case "1ST_COLUMN":
//     case "2ND_COLUMN":
//     case "3RD_COLUMN":
//       odds = 3;
//       break;
//     case "DOUBLE_STREET":
//       odds = 6;
//       break;
//     case "SPLIT":
//     case "ROW":
//       odds = 18;
//       break;
//     case "STRAIGHT_UP":
//     case "0":
//     case "00":
//       odds = 36;
//       break;
//     case "CORNER":
//       odds = 9;
//       break;
//     case "STREET":
//       odds = 12;
//       break;
//     case "BASKET_US":
//       odds = 6;
//       break;
//     default:
//       odds = 1;
//   }

//   setBetsToPlace((prev) => [
//     ...prev,
//     {
//       type: firstLetterUppercase(type),
//       bet,
//       odds,
//     },
//   ]);
// };

{
  /* <div className="pt-[4.5rem] px-4 h-full gap-8 justify-center flex w-full">
  <div className="flex items-center gap-2 flex-col">
    <RouletteWheel
      onSpinningEnd={onSpinningEnd}
      start={start}
      winningBet={winningBet}
    />
    <div className="border h-40 overflow-hidden bg-white w-96 shadow-rightcard rounded-lg rounder-black">
      <h2 className="font-bold p-2 px-4 flex gap-2 items-center shadow-sm shadow-gray-300">
        <BsFillTrophyFill />
        Placed bets
      </h2>
      <div className="h-full pt-1 pb-3 overflow-auto">
        {betsToPlace.map((bet, index) => (
          <div className="p-2 py-0.5" key={index}>
            {bet.type} - {bet.bet.join(", ")} - {bet.odds}
          </div>
        ))}
      </div>
    </div>
  </div>
  <div>
    <div className="bg-gray-900 p-3 rounded-lg m-auto lg:w-[800px]">
      <RouletteTable
        bets={{}}
        onBet={(betData) => handleBet(betData as BetData)}
      />
    </div>
    <div className="justify-center flex gap-2 items-center">
      <button type="button" disabled={start} onClick={doSpin}>
        Spin
      </button>
      <div>Bet: {formattedBet}</div>
      <div>Odds: {lastBet?.odds}</div>
      <div>Type: {lastBet?.type}</div>
    </div>
  </div>
  </div> */
}
