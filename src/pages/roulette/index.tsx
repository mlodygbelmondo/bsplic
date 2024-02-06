import React, { useState } from "react";
import type { FunctionComponent } from "react";
import { RouletteTable, RouletteWheel } from "react-casino-roulette";

interface Props {}

import "react-casino-roulette/dist/index.css";

type RouletteBet = {
  type: string;
  bet: string[];
  odds: number;
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

const Home: FunctionComponent<Props> = ({}) => {
  const [start, setStart] = useState(false);
  const [winningBet, setWinningBet] = useState("-1");
  const [bet, setBet] = useState<RouletteBet | null>(null);

  const handleBet = (betData) => {
    if (start) {
      return;
    }

    const { id: value, bet: type } = betData;

    const bet = value.split("-");

    let odds = 1;

    switch (type) {
      case "RED":
      case "BLACK":
      case "ODD":
      case "EVEN":
      case "1_TO_18":
      case "19_TO_36":
        odds = 2;
        break;
      case "1ST_DOZEN":
      case "2ND_DOZEN":
      case "3RD_DOZEN":
      case "1ST_COLUMN":
      case "2ND_COLUMN":
      case "3RD_COLUMN":
        odds = 3;
        break;
      case "DOUBLE_STREET":
        odds = 6;
        break;
      case "SPLIT":
      case "ROW":
        odds = 18;
        break;
      case "STRAIGHT_UP":
      case "0":
      case "00":
        odds = 36;
        break;
      case "CORNER":
        odds = 9;
        break;
      case "STREET":
        odds = 12;
        break;
      case "BASKET_US":
        odds = 6;
        break;
      default:
        odds = 1;
    }

    setBet(() => ({
      type,
      bet,
      odds,
    }));
  };

  const doSpin = () => {
    const random = Math.floor(Math.random() * 38);
    const winningBet = random === 37 ? "00" : random.toString();

    setWinningBet(winningBet);
    setStart(true);
  };

  const onSpinningEnd = () => {
    setStart(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RouletteWheel
          onSpinningEnd={onSpinningEnd}
          start={start}
          winningBet={winningBet}
        />
      </div>
      <div className="w-full justify-center flex gap-2 items-center">
        <button type="button" disabled={start} onClick={doSpin}>
          Spin
        </button>
        <div>
          Bet: {firstLetterUppercase(bet?.bet.join(", ").replace("_", " "))}
        </div>
        <div>Odds: {bet?.odds}</div>
        <div>Type: {bet?.type}</div>
      </div>
      <div
        className="bg-black border-white border"
        style={{ maxWidth: 700, margin: "auto" }}
      >
        <RouletteTable bets={{}} onBet={handleBet} />
      </div>
    </div>
  );
};

export default Home;
