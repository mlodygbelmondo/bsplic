import React, { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { FaShoppingCart } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import SystemNotAvailable from "./SystemNotAvailable";
import NoBetsChosen from "./NoBetsChosen";
import ChosenBet from "./ChosenBet";
import { useChosenBetsContext } from "@/pages/_app";
import { User, getAuth } from "firebase/auth";
import { app } from "@/server/api/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { getUserById } from "@/server/api/queries";
import { useAuthContext } from "@/context/AuthContext";
import addData from "@/server/api/addData";
import { createToast } from "@/utils/toasts";
import { TOAST_MESSAGES } from "@/utils/toastMessages";

export type BetType = "bet-single" | "bet-ako" | "bet-system";

interface RightbarProps {
  setIsCouponOpen?: Function;
  isCouponOpen?: boolean;
}

const RightBar = ({ setIsCouponOpen, isCouponOpen = false }: RightbarProps) => {
  const { chosenBets, chosenBetSum, setChosenBetSum, setChosenBets } =
    useChosenBetsContext();
  const [currentBet, setCurrentBet] = useState<BetType>("bet-single");
  const [totalOdds, setTotalOdds] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const akoWinningsSum =
    inputValue === ""
      ? 0
      : chosenBets.reduce((a, b) => a * b.betOdds, 1) * parseFloat(inputValue);

  const auth = getAuth(app);
  const { user }: { user: User } = useAuthContext();

  const [userData, loading, err] = useCollection(getUserById(user?.uid));

  const userAccount = userData?.docs[0]?.data();

  const router = useRouter();

  useEffect(() => {
    const calculateTotalOdds = () => {
      if (chosenBets.length === 0) {
        setTotalOdds(0);
        return;
      }
      let totalOdds = 1;
      for (const bet of chosenBets) {
        totalOdds *= bet.betOdds;
      }
      setTotalOdds(totalOdds);
    };
    calculateTotalOdds();
  }, [chosenBets]);

  const isBetButtonDisabled =
    currentBet === "bet-system" ||
    (currentBet === "bet-ako" &&
      (chosenBets.length < 2 ||
        inputValue === "" ||
        inputValue === "0" ||
        userAccount?.balance < inputValue)) ||
    chosenBets.length === 0 ||
    (currentBet === "bet-single" &&
      (chosenBetSum.reduce((a, b) => a + b.betSum, 0) === 0 ||
        userAccount?.balance < chosenBetSum.reduce((a, b) => a + b.betSum, 0) ||
        chosenBetSum.length !== chosenBets.length));

  const placeBet = async () => {
    const test = chosenBetSum.filter((b) => b.betSum === 0);
    console.log(test);

    if (currentBet === "bet-single") {
      for (const bet of chosenBets) {
        const betId = uuidv4();
        const betAmount = chosenBetSum.find(
          (b) => b.betId === bet.betId
        )?.betSum;
        const betData = {
          betType: "single",
          bet: bet,
          betAmount,
          betDate: new Date(),
          betStatus: "pending",
          betResult: null,
          betResultDate: null,
          userId: user?.uid,
        };
        if (betAmount && userAccount?.balance - betAmount >= 0) {
          await addData("bets_placed", betId, betData);
          await addData("users", user?.uid, {
            balance: userAccount?.balance - betAmount,
          });
        }
      }
      createToast(
        chosenBetSum.length > 1
          ? TOAST_MESSAGES.betsPlacedSuccessfully
          : TOAST_MESSAGES.betPlacedSuccessfully
      );

      setChosenBetSum([]);
      setChosenBets([]);
      router.push("/bsplic");
    } else if (currentBet === "bet-ako") {
      const betId = uuidv4();
      const betData = {
        betId,
        betType: "ako",
        bets: chosenBets,
        betOdds: totalOdds,
        betAmount: inputValue,
        betDate: new Date(),
        betStatus: "pending",
        betResult: null,
        betResultDate: null,
        userId: user?.uid,
      };
      if (userAccount?.balance - parseFloat(inputValue) >= 0) {
        await addData("bets_placed", betId, betData);
        await addData("users", user?.uid, {
          balance: userAccount?.balance - parseFloat(inputValue),
        });
      }
      createToast(TOAST_MESSAGES.betPlacedSuccessfully);
      setChosenBetSum([]);
      setChosenBets([]);
      router.push("/bsplic");
    } else if (currentBet === "bet-system") {
      router.push("/bsplic");
    }
  };

  return (
    <div className="right-bar-over fixed top-[4.5rem] right-8 w-80 border border-gray-100 rounded">
      <div
        className={`right-bar-container ${
          isCouponOpen ? "active" : ""
        } flex bg-white rounded-md flex-col justify-between`}
      >
        <div className="right-bar-header-container flex flex-col gap-2 rounded-tl-lg rounded-tr-lg py-3 px-4 shadow-rightcard">
          <div className="mobile-container hidden">
            <div
              className="mobile-slider"
              onClick={() => {
                // setIsCouponOpen(false);
              }}
            ></div>
          </div>
          <h4 className="flex items-center gap-1 text-sm font-bold">
            <FaShoppingCart /> Kupon
          </h4>
          <div className="bg-gray-200 rounded-full">
            <button
              className={`btn-single transition-colors ease-linear text-xs font-semibold rounded-full text-center py-2 pr-4 pl-[13px] bg-none w-[33%] ${
                currentBet === "bet-single" ? "bg-black text-white" : ""
              }`}
              onClick={() => {
                setCurrentBet("bet-single");
              }}
            >
              Pojedyncze
            </button>
            <button
              className={`btn-ako text-xs transition-colors ease-linear font-semibold text-center py-2 rounded-full pr-4 pl-3 w-[33%] ${
                currentBet === "bet-ako" ? "bg-black text-white" : ""
              }`}
              onClick={() => {
                setCurrentBet("bet-ako");
              }}
            >
              AKO
            </button>
            <button
              className={`btn-system text-xs transition-colors ease-linear font-semibold text-center py-2 pr-3 rounded-full pl-4 w-[34%] ${
                currentBet === "bet-system" ? "bg-black text-white" : ""
              }`}
              onClick={() => {
                setCurrentBet("bet-system");
              }}
            >
              System
            </button>
          </div>
        </div>
        <div className="h-[56vh] shadow-xl p-4 flex flex-col gap-3 overflow-auto">
          {currentBet === "bet-system" && <SystemNotAvailable />}
          {chosenBets.length === 0 && currentBet !== "bet-system" && (
            <NoBetsChosen />
          )}
          {chosenBets.length > 0 &&
            currentBet !== "bet-system" &&
            chosenBets.map((bet, index) => (
              <ChosenBet
                key={index}
                title={bet.title}
                label={bet.label}
                icon={bet.icon}
                bet={bet.bet}
                betOdds={bet.betOdds}
                currentBet={currentBet}
                betId={bet.betId}
              />
            ))}
        </div>
        <div className="right-bar-footer-container flex flex-col py-2 px-4 rounded-bl-lg rounded-br-lg bg-white gap-0.5 text-sm shadow-rightcard">
          {currentBet === "bet-ako" ? (
            <div className="flex justify-between mb-1.5">
              <div className="flex gap-1.5 items-center">
                <p className="font-medium text-sm">Kurs</p>
                <p className="p-2 bg-yellow-400 rounded-lg text-sm font-semibold">
                  {totalOdds.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="relative w-36 ">
                <input
                  type="number"
                  value={inputValue}
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
                    setInputValue(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (Number(e.target.value)) {
                      setInputValue(Number(e.target.value).toFixed(2));
                    }
                  }}
                />
                <p className="absolute right-3 top-2.5 bottom-0 m-auto text-sm font-medium">
                  zł
                </p>
              </div>
            </div>
          ) : (
            <div className="top-container flex justify-between text-gray-400 font-normal">
              <p>Łączna stawka:</p>
              <span className="font-normal">
                {currentBet === "bet-single"
                  ? chosenBetSum
                      .reduce((a, b) => a + b.betSum, 0)
                      .toFixed(2)
                      .replace(".", ",")
                  : "0,00"}
                zł
              </span>
            </div>
          )}

          <div className="middle-container flex justify-between items-center">
            <p className="text-xs font-bold">Potencjalna wygrana:</p>
            <BsQuestionCircle className="cursor-pointer" />
            <span className="text-red-500 font-extrabold">
              {currentBet === "bet-single" &&
                chosenBetSum
                  .reduce((a, b) => a + b.betSum * b.betOdds, 0)
                  .toFixed(2)
                  .replace(".", ",")}
              {currentBet === "bet-ako" &&
                akoWinningsSum.toFixed(2).replace(".", ",")}
              {currentBet === "bet-system" && "0,00"} zł
            </span>
          </div>
          <div className="bottom-container mb-1">
            <p className="text-gray-400 font-bold text-[0.63rem]">
              Współczynnik 0.88
            </p>
          </div>

          <button
            className="btn-bet w-full py-3 px-8 bg-red-600 font-bold text-white transition-colors ease-linear hover:bg-red-700 rounded-full disabled:hover:bg-red-600 disabled:opacity-50"
            disabled={isBetButtonDisabled}
            onClick={placeBet}
          >
            Obstaw
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
