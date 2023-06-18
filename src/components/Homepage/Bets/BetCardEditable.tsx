import Image from "next/image";
import React from "react";

interface OwnProps {
  subtitle: string;
  category: string;
  date: string;
  hour: string;
  title: string;
  betLabel: string;
  bet1: string;
  bet2: string;
  bet1Odds: string;
  bet2Odds: string;
  bet1Percents: string;
  bet2Percents: string;
  setBet1: React.Dispatch<React.SetStateAction<string>>;
  setBet2: React.Dispatch<React.SetStateAction<string>>;
  setBet1Odds: React.Dispatch<React.SetStateAction<string>>;
  setBet2Odds: React.Dispatch<React.SetStateAction<string>>;
  setBet1Percents: React.Dispatch<React.SetStateAction<string>>;
  setBet2Percents: React.Dispatch<React.SetStateAction<string>>;
  setSubtitle: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setHour: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBetLabel: React.Dispatch<React.SetStateAction<string>>;
}

const BetCardEditable = ({
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
  setBet1,
  setBet2,
  setBet1Odds,
  setBet2Odds,
  setBet1Percents,
  setBet2Percents,
  setSubtitle,
  setCategory,
  setDate,
  setHour,
  setTitle,
  setBetLabel,
}: OwnProps) => {
  return (
    <div className="bet-card-container select-none bg-white flex flex-col md:grid md:grid-cols-[1.2fr_1.6fr] py-3.5 px-3.5 shadow-betcard rounded-lg transition-colors">
      <div className="left-bet-card-container">
        <div className="mb-1 flex justify-between">
          <div className="flex items-center gap-1">
            <Image src="/bspl.png" alt="Icon Image" width={16} height={16} />
            <input
              type="text"
              className="text-[0.6rem] text-gray-500 focus:outline-none w-[6.75rem]"
              placeholder="Podtytuł zakładu"
              value={subtitle}
              onChange={(e) => {
                setSubtitle(e.target.value.slice(0, 19));
              }}
            />
          </div>

          <div className="text-[0.6rem] text-gray-500 pr-5 flex items-center gap-1.5">
            <input
              type="text"
              className="text-[0.6rem] text-gray-500 focus:outline-none max-w-[3.5rem]"
              placeholder="Data"
              value={date}
              onChange={(e) => {
                setDate(e.target.value.slice(0, 10));
              }}
            />
            <input
              type="text"
              className="text-[0.6rem] text-gray-500 focus:outline-none max-w-[1.75rem]"
              placeholder="Godz."
              value={hour}
              onChange={(e) => {
                setHour(e.target.value.slice(0, 5));
              }}
            />
          </div>
        </div>
        <textarea
          className="placeholder:text-black font-bold resize-none focus:outline-none w-full pr-5"
          placeholder="Tytuł zakładu"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value.slice(0, 50));
          }}
        />
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          className="text-[0.6rem] mb-1 hidden md:block text-gray-500 focus:outline-none max-w-[11rem]"
          placeholder="Etykieta zakładu"
          onChange={(e) => {
            setBetLabel(e.target.value.slice(0, 30));
          }}
          value={betLabel}
        />
        <div className="w-full flex justify-evenly gap-3">
          <div className="left-bets-buttons-container w-1/2">
            <button
              className={`mb-1 w-full min-h-[2.75rem] rounded-md border border-transparent flex flex-col justify-center items-center py-1.5 px-3 transition-all ease-in-out bg-[#fc0]`}
            >
              <input
                type="text"
                className="text-[0.67rem] bg-transparent text-center placeholder:text-black font-medium focus:outline-none max-w-[10rem]"
                placeholder="Pierwszy zakład"
                value={bet1}
                onChange={(e) => {
                  setBet1(e.target.value.slice(0, 19));
                }}
              />
              <input
                type="number"
                className="text-xs bg-transparent text-center placeholder:text-black font-bold focus:outline-none max-w-[5.5rem]"
                placeholder="_"
                value={bet1Odds}
                onChange={(e) => {
                  const temp = e.target.value.slice(0, 6);
                  setBet1Odds(temp);
                  if (
                    temp !== "" &&
                    temp !== "0" &&
                    !Number.isNaN(parseFloat(temp)) &&
                    parseFloat(temp) > 1
                  ) {
                    const bet1NumberOdds = parseFloat(temp);
                    const bet1NumberPercents = Math.round(
                      (1 / bet1NumberOdds) * 100
                    );
                    const bet2NumberPercents = 100 - bet1NumberPercents;
                    const bet2NumberOdds = (
                      Math.round((100 / bet2NumberPercents) * 100) / 100
                    ).toFixed(2);
                    setBet1Percents(bet1NumberPercents + "");
                    setBet2Percents(bet2NumberPercents + "");
                    setBet2Odds(bet2NumberOdds + "");
                  } else {
                    setBet2Odds("Błędny kurs");
                  }
                }}
              />
            </button>
            <div className="w-full flex items-center gap-2 ">
              <div className="flex">
                <input
                  type="text"
                  value={`${bet1Percents}`}
                  placeholder="_"
                  className="text-gray-500 font-semibold text-[0.5rem] w-2.5 focus:outline-none"
                  onChange={(e) => {
                    const temp = e.target.value.slice(0, 2);
                    setBet1Percents(temp);
                    if (
                      temp !== "" &&
                      temp !== "0" &&
                      !Number.isNaN(parseFloat(temp)) &&
                      parseFloat(temp) >= 1 &&
                      parseFloat(temp) <= 99
                    ) {
                      const bet1NumberPercents = parseFloat(temp);
                      const bet2NumberPercents = 100 - bet1NumberPercents;
                      const bet2NumberOdds = (
                        Math.round((100 / bet2NumberPercents) * 100) / 100
                      ).toFixed(2);
                      const bet1NumberOdds = (
                        Math.round((100 / bet1NumberPercents) * 100) / 100
                      ).toFixed(2);
                      setBet1Odds(bet1NumberOdds + "");
                      setBet2Percents(bet2NumberPercents + "");
                      setBet2Odds(bet2NumberOdds + "");
                    } else {
                      setBet2Odds("Błędny %");
                    }
                  }}
                />
                <span className="text-gray-500 font-semibold text-[0.5rem] ml-[1px]">
                  %
                </span>
              </div>

              <div className="chart bg-[#f3ebeb] h-1.5 w-full rounded-2xl flex items-center">
                <div
                  className="chart-content bg-[#4b4a48] rounded-2xl h-1.5"
                  style={{ width: `${bet1Percents || 50}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <button
              className={`mb-1 w-full min-h-[2.75rem] rounded-md border border-transparent flex flex-col justify-center items-center py-1.5 px-3 transition-all ease-in-out bg-[#fc0]`}
            >
              <input
                type="text"
                className="text-[0.67rem]  text-center bg-transparent placeholder:text-black font-medium focus:outline-none max-w-[10rem]"
                placeholder="Drugi zakład"
                value={bet2}
                onChange={(e) => {
                  setBet2(e.target.value.slice(0, 19));
                }}
              />
              <input
                type="text"
                disabled
                className="text-xs bg-transparent cursor-default text-center placeholder:text-black font-bold focus:outline-none max-w-[5.5rem]"
                placeholder="2.00"
                value={bet2Odds}
              />
            </button>
            <div className="w-full flex items-center gap-2">
              <span className="text-gray-500 font-semibold text-[0.5rem]">
                {bet2Percents || 50}%
              </span>
              <div className="bg-[#f3ebeb] h-1.5 w-full rounded-2xl flex items-center">
                <div
                  className="bg-[#4b4a48] rounded-2xl h-1.5"
                  style={{ width: `${bet2Percents || 50}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetCardEditable;
