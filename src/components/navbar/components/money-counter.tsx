import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { formatBalance } from "../navbar.utils";
import Lottie from "@/components/client-lottie/client-lottie";
import tickAnimation from "../../../assets/lottie/tick-animation.json";

interface Props {
  isMonthlyBonusClaimed: boolean;
  userBalance: number;
  moneyIcon: "plus" | "none" | "animatedTick";
  claimBonus: () => void;
  completeAnimation: () => void;
}

const MoneyCounter = ({
  isMonthlyBonusClaimed,
  userBalance,
  moneyIcon,
  claimBonus,
  completeAnimation,
}: Props) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (moneyIcon === "animatedTick") {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
        completeAnimation();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [moneyIcon, completeAnimation]);

  const tickAnimationOptions = {
    autoplay: true,
    loop: false,
    animationData: tickAnimation,
  };

  return (
    <div className="flex items-center gap-2">
      {showAnimation ? (
        <div className="w-6 h-6">
          <Lottie options={tickAnimationOptions} height={24} width={24} />
        </div>
      ) : (
        <button
          onClick={claimBonus}
          disabled={isMonthlyBonusClaimed}
          className={`flex items-center justify-center w-6 h-6 rounded-full ${
            isMonthlyBonusClaimed ? "bg-gray-400" : "bg-white"
          }`}
        >
          <FaPlus
            className={`text-sm ${
              isMonthlyBonusClaimed ? "text-gray-500" : "text-red-500"
            }`}
          />
        </button>
      )}
      <p>{formatBalance(userBalance)}</p>
    </div>
  );
};

export default MoneyCounter;
