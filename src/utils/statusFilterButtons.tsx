import { AiOutlineClockCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";

export const STATUS_FILTER_BUTTONS = [
  {
    filter: "pending",
    label: "Otwarte",
    icon: <AiOutlineClockCircle />,
  },
  {
    filter: "lost",
    label: "Przegrane",
    icon: <AiOutlineCloseCircle />,
  },
  {
    filter: "won",
    label: "Wygrane",
    icon: <TiTickOutline />,
  },
] as const;
