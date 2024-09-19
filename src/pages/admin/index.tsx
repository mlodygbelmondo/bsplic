import React, { ReactNode, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";

import { useRouter } from "next/router";
import getData from "../../server/api/getData";
import { useCollection } from "react-firebase-hooks/firestore";
import { getAllPlacedBets, getAllUsers } from "@/server/api/queries";

import dayjs from "dayjs";
import Link from "next/link";
import BetsLayout from "../layout";
import { AdminContextProvider, useAdminContext } from "@/context/AdminContext";
import AdminLayout from "./layout";
const Home = () => {
  const [userBets] = useCollection(getAllPlacedBets());
  const { userAdminRole } = useAdminContext();

  return (
    <>
      {userAdminRole === "admin" && (
        <div className="pt-[4.5rem] px-2 md:px-[24rem] pb-5 items-center flex flex-col gap-2">
          <Link href="/admin/create-bet">
            <button className="px-8 py-3 font-semibold bg-red-600 text-white border rounded-md hover:bg-red-700 transition-colors">
              Stwórz zakład
            </button>
          </Link>
          <Link href="/admin/manage-bets">
            <button className="px-8 py-3 font-semibold bg-green-600 text-white border rounded-md hover:bg-green-700 transition-colors">
              Zarządzaj zakładami
            </button>
          </Link>
          <Link href="/admin/placed-bets">
            <button className="px-8 py-3 font-semibold bg-cyan-600 text-white border rounded-md hover:bg-cyan-700 bg- transition-colors">
              Postawione zakłady
            </button>
          </Link>
          <Link href="/admin/requested-bets">
            <button className="px-8 py-3 font-semibold bg-purple-600 text-white border rounded-md hover:bg-purple-700 bg- transition-colors">
              Propozycje zakładów
            </button>
          </Link>
        </div>
      )}
      {userAdminRole === "moderator" && (
        <div className="pt-[100px] px-[24rem]">Widok moderatora :D</div>
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;
