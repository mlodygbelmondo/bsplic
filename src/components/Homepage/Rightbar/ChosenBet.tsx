import React, { useState } from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useChosenBetsContext } from "@/pages/_app";
import { BET_TYPE } from "@/utils/consts";

interface OwnProps {
  title: string;
  label: string;
  bet: string;
  betOdds: number;
  icon: string;
  currentBet: keyof typeof BET_TYPE;
  betId: string;
}

const ChosenBet = ({
  title,
  label,
  bet,
  betOdds,
  icon,
  currentBet,
  betId,
}: OwnProps) => {
  const { chosenBets, setChosenBets, chosenBetSum, setChosenBetSum } =
    useChosenBetsContext();

  const handleBetChange = (currentValue: string) => {
    if (Number(currentValue))
      setChosenBetSum([
        ...chosenBetSum.filter((bet) => bet.betId !== betId),
        {
          betId,
          betSum: parseFloat(currentValue),
          betOdds,
        },
      ]);
    else
      setChosenBetSum([...chosenBetSum.filter((bet) => bet.betId !== betId)]);
  };

  const betInputValue = chosenBetSum.find((bet) => bet.betId === betId)?.betSum;

  return (
    <div className="flex flex-col rounded-xl border border-gray-200">
      <div className="flex flex-col px-3 py-2 border-b border-gray-200 rounded-tl rounded-tr">
        <div className="flex items-start justify-between py-1.5">
          <div className="flex gap-1 items-center">
            <Image
              src={icon}
              alt="bet icon"
              width={13}
              height={13}
              className="relative bottom-[1px]"
            />
            <h4 className="font-bold text-[13.5px]">{title}</h4>
          </div>
          <IoCloseSharp
            className="opacity-60 cursor-pointer"
            onClick={() => {
              setChosenBets([
                ...chosenBets.filter((bet) => bet.betId !== betId),
              ]);
              setChosenBetSum([
                ...chosenBetSum.filter((bet) => bet.betId !== betId),
              ]);
            }}
          />
        </div>
        <p className="font-medium text-[13px]">{label}:</p>
        <p className="font-bold text-[13px]">{bet}</p>
      </div>
      <div className="p-3 flex items-center justify-start rounded-bl rounded-br">
        {currentBet === BET_TYPE.BET_AKO && (
          <p className="text-[13px] font-bold">
            {betOdds.toFixed(2).replace(".", ",")}
          </p>
        )}
        {currentBet === BET_TYPE.BET_SINGLE && (
          <div className="flex gap-3 items-center">
            <div className="flex flex-col text-left">
              <p className="text-[12px] font-medium">Kurs</p>
              <p className="text-[13px] font-bold">
                {betOdds.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div className="relative">
              <input
                type="number"
                value={betInputValue}
                min={0}
                placeholder="Stawka"
                onPaste={(e) => {
                  e.preventDefault();
                }}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    e.preventDefault();
                  }
                }}
                onWheel={(e) => {
                  e.currentTarget.blur();
                }}
                className="bg-gray-200 rounded-xl w-full h-10 p-3 text-sm focus:outline-none placeholder:font-bold placeholder:text-[14px] font-medium"
                onChange={(e) => {
                  handleBetChange(e.target.value);
                }}
                // onBlur={(e) => {
                //   if (e.target.value) {
                //     handleBetChange(Number(e.target.value).toFixed(2));
                //   }
                // }}
              />
              <p className="absolute right-3 top-2.5 bottom-0 m-auto text-sm font-medium">
                zł
              </p>
            </div>

            {betInputValue && !Number.isNaN(betOdds * betInputValue) && (
              <div className="flex flex-col">
                <p className="text-[11px] font-semibold">Wygrana</p>
                <p className="text-[13px] font-bold">
                  {(betOdds * betInputValue).toFixed(2).replace(".", ",")}
                  zł
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChosenBet;
