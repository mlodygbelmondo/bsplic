import { useChosenBetsContext } from "@/pages/_app";
import Image from "next/image";
import React, { useState } from "react";

interface BetBasic {
  icon: string;
  subtitle: string;
  category: string;
  date: string;
  hour: string;
  title: string;
  betLabel: string;
  bet1: string;
  bet2: string;
  bet1Odds: number;
  bet2Odds: number;
  bet1Percents: number;
  bet2Percents: number;
  id: string;
  // isBet2: boolean;
  // bet2: string | null;
  // home2Name: string | null;
  // away2Name: string | null;
  // home2Odds: number | null;
  // away2Odds: number | null;
  // home2Percents: number | null;
  // away2Percents: number | null;
}

interface BetProps<Bet> {
  bet: Bet;
}

interface ButtonsClicked {
  home1Clicked: boolean;
  away1Clicked: boolean;
}

const BetCard = <Bet extends BetBasic>({ bet }: BetProps<Bet>) => {
  const {
    icon,
    category,
    subtitle,
    date,
    hour,
    title,
    betLabel,
    bet1,
    bet2,
    bet1Odds,
    bet2Odds,
    bet1Percents,
    bet2Percents,
    id,
    // isBet2,
    // bet2,
    // home2Name,
    // away2Name,
    // home2Odds,
    // away2Odds,
    // home2Percents,
    // away2Percents,
  } = bet;

  const { chosenBets, setChosenBets, chosenBetSum, setChosenBetSum } =
    useChosenBetsContext();

  const bet1Clicked = chosenBets.find((bet) => bet.betId === id)?.betType === 1;
  const bet2Clicked = chosenBets.find((bet) => bet.betId === id)?.betType === 2;

  const handleBetClick = (betType: number) => {
    if (betType === 1) {
      if (bet1Clicked) {
        setChosenBets([...chosenBets.filter((bet) => bet.betId !== id)]);
        setChosenBetSum([...chosenBetSum.filter((bet) => bet.betId !== id)]);
      } else
        setChosenBets([
          ...chosenBets.filter((bet) => bet.betId !== id),
          {
            betId: id,
            betType: 1,
            icon,
            title,
            label: betLabel,
            bet: bet1,
            betOdds: bet1Odds,
          },
        ]);
    } else if (betType === 2) {
      if (bet2Clicked) {
        setChosenBets([...chosenBets.filter((bet) => bet.betId !== id)]);
        setChosenBetSum([...chosenBetSum.filter((bet) => bet.betId !== id)]);
      } else
        setChosenBets([
          ...chosenBets.filter((bet) => bet.betId !== id),
          {
            betId: id,
            betType: 2,
            icon,
            title,
            label: betLabel,
            bet: bet2,
            betOdds: bet2Odds,
          },
        ]);
    }
  };

  return (
    <div className="bet-card-container select-none bg-white flex flex-col md:grid md:grid-cols-[1.2fr_1.6fr] py-3.5 px-3.5 shadow-betcard rounded-lg xl:cursor-pointer transition-colors xl:hover:bg-[#f9f7f7]">
      <div className="left-bet-card-container">
        <div className="mb-1 flex justify-between">
          <div className="flex items-center gap-1">
            <Image src={icon} alt="Icon Image" width={16} height={16} />
            <p className="text-[0.6rem] text-gray-500">{subtitle}</p>
          </div>

          <div className="text-[0.6rem] text-gray-500 md:pr-4 flex items-center gap-1.5">
            {date} {hour}
          </div>
        </div>

        <h5 className="font-bold">{title}</h5>
      </div>
      <div>
        <p className="hidden md:block text-[0.6rem] text-gray-500">
          {betLabel}
        </p>
        <div className="w-full my-1 flex justify-evenly gap-3">
          <div className="w-1/2">
            <button
              onClick={() => {
                handleBetClick(1);
              }}
              className={`mb-1 w-full rounded-md border border-transparent flex flex-col justify-center items-center py-1.5 px-3 transition-all ease-in-out  ${
                bet1Clicked
                  ? "bg-[#111] text-[#fc0] hover:bg-[#322e2e]"
                  : "bg-[#fc0] hover:bg-[#deb30b]"
              }`}
            >
              <h5 className=" font-medium text-[0.67rem]">{bet1}</h5>
              <h4 className="text-xs font-bold">
                {bet1Odds.toFixed(2).replace(".", ",")}
              </h4>
            </button>
            <div className="w-full flex items-center gap-2 ">
              <span className="text-gray-500 font-semibold text-[0.5rem]">
                {bet1Percents}%
              </span>
              <div className="chart bg-[#f3ebeb] h-1.5 w-full rounded-2xl flex items-center">
                <div
                  className="chart-content bg-[#4b4a48] rounded-2xl h-1.5"
                  style={{ width: `${bet1Percents}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <button
              onClick={() => {
                handleBetClick(2);
              }}
              className={`mb-1 w-full rounded-md border border-transparent flex flex-col justify-center items-center py-1.5 px-3 transition-all ease-in-out ${
                bet2Clicked
                  ? "bg-[#111] text-[#fc0] hover:bg-[#322e2e]"
                  : "bg-[#fc0] hover:bg-[#deb30b]"
              }`}
            >
              <h5 className=" font-medium text-[0.67rem]">{bet2}</h5>
              <h4 className="text-xs font-bold">
                {bet2Odds.toFixed(2).replace(".", ",")}
              </h4>
            </button>
            <div className="w-full flex items-center gap-2">
              <span className="text-gray-500 font-semibold text-[0.5rem]">
                {bet2Percents}%
              </span>
              <div className="bg-[#f3ebeb] h-1.5 w-full rounded-2xl flex items-center">
                <div
                  className="bg-[#4b4a48] rounded-2xl h-1.5"
                  style={{ width: `${bet2Percents}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hidden" hidden={isBet2 ? false : true}>
        <div className="bet-2-name-container">
          <p>{bet2}</p>
        </div>
        <div className="bets-buttons-container">
          <div className="left-bets-buttons-container">
            <button
              onClick={() => {
                setActiveButtons((prevValue) => {
                  return {
                    ...prevValue,
                    home2Clicked: !activeButtons.home2Clicked,
                  };
                });
              }}
              className={`${activeButtons.home2Clicked ? "active" : ""}`}
            >
              <h5>{home2Name}</h5>
              <h4>{home2Odds}</h4>
            </button>
            <div className="bet-percent">
              <span className="percent">{home2Percents}%</span>
              <div className="chart">
                <div
                  className="chart-content"
                  style={{ width: `${home2Percents}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="right-bets-buttons-container">
            <button
              onClick={() => {
                setActiveButtons((prevValue) => {
                  return {
                    ...prevValue,
                    away2Clicked: !activeButtons.away2Clicked,
                  };
                });
              }}
              className={`${activeButtons.away2Clicked ? "active" : ""}`}
            >
              <h5>{away2Name}</h5>
              <h4>{away2Odds}</h4>
            </button>
            <div className="bet-percent">
              <span className="percent">{away2Percents}%</span>
              <div className="chart">
                <div
                  className="chart-content"
                  style={{ width: `${away2Percents}%` }}
                ></div>
              </div>
            </div>
          </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* <div className='right-bet-card-container'></div> */}
    </div>
  );
};

export default BetCard;
