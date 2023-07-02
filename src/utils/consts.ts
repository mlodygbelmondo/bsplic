export const PLUS_INDICATOR = "+";

export const BET_TYPE = {
  BET_SINGLE: "BET_SINGLE",
  BET_AKO: "BET_AKO",
  BET_SYSTEM: "BET_SYSTEM",
} as const;

export const BETS_FILTER = {
  pending: "pending",
  lost: "lost",
  won: "won",
} as const;

export const RANKINGS_TAB = {
  BIGGEST_WON_ODDS: "BIGGEST_WON_ODDS",
  BIGGEST_WON_AMOUNT: "BIGGEST_WON_AMOUNT",
  BIGGEST_LOST_AMOUNT: "BIGGEST_LOST_AMOUNT",
} as const;
