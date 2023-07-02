import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { RANKINGS_TAB } from "./consts";
import { filterBets } from "./filterBets";

export const sortRankings = (
  rankings: QueryDocumentSnapshot<DocumentData>[] | undefined,
  filter: keyof typeof RANKINGS_TAB
) => {
  if (!rankings) return [];
  switch (filter) {
    case RANKINGS_TAB.BIGGEST_WON_ODDS:
      return filterBets(rankings, "won")
        .sort((a, b) => {
          const bOdds =
            b.data().betType === "ako"
              ? b.data().betOdds
              : b.data().bet.betOdds;
          const aOdds =
            a.data().betType === "ako"
              ? a.data().betOdds
              : a.data().bet.betOdds;
          return bOdds - aOdds;
        })
        .splice(0, 10);
    case RANKINGS_TAB.BIGGEST_WON_AMOUNT:
      return filterBets(rankings, "won")
        .sort((a, b) => {
          const bOdds =
            b.data().betType === "ako"
              ? b.data().betOdds
              : b.data().bet.betOdds;
          const aOdds =
            a.data().betType === "ako"
              ? a.data().betOdds
              : a.data().bet.betOdds;

          const aWinnings = aOdds * Number(a.data().betAmount);
          const bWinnings = bOdds * Number(b.data().betAmount);

          return bWinnings - aWinnings;
        })
        .splice(0, 10);
    case RANKINGS_TAB.BIGGEST_LOST_AMOUNT:
      return filterBets(rankings, "lost")
        .sort((a, b) => +b.data().betAmount - +a.data().betAmount)
        .splice(0, 10);
    default:
      return rankings;
  }
};
