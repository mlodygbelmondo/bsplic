import Head from "next/head";
import Bets from "@/components/Homepage/Bets/Bets";
import BetsLayout from "./layout";
import { ReactNode } from "react";

export default function Home() {
  return <Bets />;
}

Home.getLayout = (page: ReactNode) => {
  return <BetsLayout>{page}</BetsLayout>;
};
