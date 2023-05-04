import type { User } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getUserById = (userId: string) => {
  return userId
    ? query(collection(db, "users"), where("uid", "==", userId))
    : undefined;
};

export const getAllBets = () => {
  return collection(db, "bets");
};

export const getAllAdmins = () => {
  return collection(db, "admins");
};

export const getAdminById = (userId: string) => {
  return userId
    ? query(collection(db, "admins"), where("uid", "==", userId))
    : undefined;
};

export const getBetsPlacedByUserId = (userId: string) => {
  return userId
    ? query(collection(db, "bets_placed"), where("userId", "==", userId))
    : undefined;
};
