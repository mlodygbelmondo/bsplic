import type { User } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getUserById = (userId: string) => {
  return userId
    ? query(collection(db, "users"), where("uid", "==", userId))
    : undefined;
};

export const getAllUsers = () => {
  return collection(db, "users");
};

export const getAllBets = () => {
  return collection(db, "bets");
};

export const getAllRequestedBets = () => {
  return collection(db, "bets_requests");
};

export const getAllAdmins = () => {
  return collection(db, "admins");
};

export const getAdminById = (userId: string) => {
  return query(collection(db, "admins"), where("uid", "==", userId));
};

export const getRequestedBetById = (betId: string) => {
  return query(collection(db, "bets_requests"), where("id", "==", betId));
};

export const getBetsPlacedByUserId = (userId: string) => {
  return query(collection(db, "bets_placed"), where("userId", "==", userId));
};

export const getRouletteBetById = (betId: string) => {
  return query(collection(db, "roulette_bets"), where("id", "==", betId));
};

export const getAllPlacedBets = () => {
  return collection(db, "bets_placed");
};
