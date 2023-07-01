import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { BETS_FILTER, BET_TYPE } from "./consts";

const filterBetsByStatus = (
  bets: QueryDocumentSnapshot<DocumentData>[],
  status: keyof typeof BETS_FILTER
) => bets.filter((bet) => bet.data().betStatus === status);

const filterBetsByTitleAndBet = (
  bets: QueryDocumentSnapshot<DocumentData>[],
  title: string,
  betUserMade: string
) => {
  return bets.filter((bet) => {
    if (bet.data().betType === "single")
      return (
        bet.data().bet.title.toLowerCase().includes(title.toLowerCase()) &&
        bet.data().bet.bet.toLowerCase().includes(betUserMade.toLowerCase())
      );
    return bet
      .data()
      .bets.some(
        (bet: any) =>
          bet.title.toLowerCase().includes(title.toLowerCase()) &&
          bet.bet.toLowerCase().includes(betUserMade.toLowerCase())
      );
  });
};

const filterBetsByTitle = (
  bets: QueryDocumentSnapshot<DocumentData>[],
  title: string
) => {
  return bets.filter((bet) => {
    if (bet.data().betType === "single")
      return bet.data().bet.title.toLowerCase().includes(title.toLowerCase());
    return bet
      .data()
      .bets.some((bet: any) =>
        bet.title.toLowerCase().includes(title.toLowerCase())
      );
  });
};

const filterBetsByBet = (
  bets: QueryDocumentSnapshot<DocumentData>[],
  betUserMade: string
) => {
  return bets.filter((bet) => {
    if (bet.data().betType === "single")
      return bet
        .data()
        .bet.bet.toLowerCase()
        .includes(betUserMade.toLowerCase());
    return bet
      .data()
      .bets.some((bet: any) =>
        bet.bet.toLowerCase().includes(betUserMade.toLowerCase())
      );
  });
};

export const filterBets = (
  bets: QueryDocumentSnapshot<DocumentData>[] | undefined,
  filter: keyof typeof BETS_FILTER,
  title?: string,
  bet?: string
) => {
  if (!bets) return [];

  let filteredBets = filterBetsByStatus(bets, filter);

  if (title && bet)
    filteredBets = filterBetsByTitleAndBet(filteredBets, title, bet);

  if (title) filteredBets = filterBetsByTitle(filteredBets, title);

  if (bet) filteredBets = filterBetsByBet(filteredBets, bet);

  return filteredBets;
};
