import { RANKINGS_TAB } from "./consts";
import { GiRollingDices } from "react-icons/gi";
import { FaTrophy, FaSkull } from "react-icons/fa";
export const RANKINGS_TAB_BUTTONS = [
  {
    filter: RANKINGS_TAB.BIGGEST_WON_ODDS,
    label: "Największe kursy",
    icon: <GiRollingDices />,
  },
  {
    filter: RANKINGS_TAB.BIGGEST_WON_AMOUNT,
    label: "Największe wygrane",
    icon: <FaTrophy />,
  },
  {
    filter: RANKINGS_TAB.BIGGEST_LOST_AMOUNT,
    label: "Największe przegrane",
    icon: <FaSkull />,
  },
] as const;
