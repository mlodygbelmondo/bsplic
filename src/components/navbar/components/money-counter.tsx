import type { FunctionComponent } from "react";
import SlotCounter from "react-slot-counter";
import { inter } from "@/pages/_app";
import { twMerge } from "tw-merge";
import clsx from "clsx";
import { match, P } from "ts-pattern";
import { FaPlus } from "react-icons/fa";
import { tickAnimationOptions, formatBalance } from "../";
import Lottie from "react-lottie";

interface OwnProps {
  isMonthlyBonusClaimed: boolean;
  userBalance: number;
  moneyIcon: "none" | "plus" | "animatedTick";
  claimBonus: () => void;
  completeAnimation: () => void;
}

export const MoneyCounter: FunctionComponent<OwnProps> = ({
  isMonthlyBonusClaimed,
  userBalance,
  moneyIcon,
  claimBonus,
  completeAnimation,
}) => {
  return (
    <button
      onClick={claimBonus}
      className={twMerge(
        clsx(
          "flex gap-1 relative h-8 transition-all duration-300 items-center text-xs font-bold bg-red-800 p-1 rounded-full",
          (isMonthlyBonusClaimed && moneyIcon === "animatedTick") ||
            (moneyIcon === "plus" && !isMonthlyBonusClaimed)
            ? "pl-7"
            : "pl-1",
          isMonthlyBonusClaimed ? "cursor-default" : ""
        )
      )}
    >
      {match({ moneyIcon, isMonthlyBonusClaimed })
        .with(
          {
            isMonthlyBonusClaimed: true,
            moneyIcon: P.not("animatedTick"),
          },
          () => {
            return null;
          }
        )
        .with({ moneyIcon: "none" }, () => {
          return null;
        })
        .with({ moneyIcon: "animatedTick" }, () => {
          return (
            <div className="absolute -left-2">
              <Lottie
                speed={1.2}
                eventListeners={[
                  {
                    eventName: "complete",
                    callback: () => {
                      completeAnimation();
                    },
                  },
                ]}
                height={48}
                width={48}
                options={tickAnimationOptions}
              />
            </div>
          );
        })
        .with({ moneyIcon: "plus" }, () => {
          return (
            <div className="absolute left-1.5">
              <FaPlus className="text-red-500 p-1 bg-white rounded-full text-lg sp" />
            </div>
          );
        })
        .exhaustive()}
      <span className="flex items-end gap-[1px]">
        <SlotCounter
          useMonospaceWidth
          containerClassName={twMerge(clsx("tracking-tight", inter.className))}
          value={formatBalance(userBalance)}
        />
      </span>
    </button>
  );
};
