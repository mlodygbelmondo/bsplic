import "@/styles/globals.css";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import Navbar from "@/components/Navbar";
import React from "react";
import Sidebar from "@/components/Homepage/Leftbar/Sidebar";
import RightBar from "@/components/Homepage/Rightbar/RightBar";
import Head from "next/head";
import RouteGuard from "@/components/auth/RouteGuard";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Montserrat } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Montserrat({ subsets: ["latin"] });

export interface ChosenBet {
  icon: string;
  title: string;
  label: string;
  bet: string;
  betOdds: number;
  betId: string;
  betType: number;
  //if bet type is same, then delete it. if bet type is different, delete the old one and implement new one
}

interface ChosenBetSum {
  betId: string;
  betOdds: number;
  betSum: number;
}

export const useChosenBetsContext = () => React.useContext(ChosenBetsContext);
const ChosenBetsContext = React.createContext<{
  chosenBets: ChosenBet[];
  setChosenBets: (_: ChosenBet[]) => void;
  chosenBetSum: ChosenBetSum[];
  setChosenBetSum: (_: ChosenBetSum[]) => void;
}>({
  chosenBets: [],
  setChosenBets: () => {},
  chosenBetSum: [],
  setChosenBetSum: () => {},
});

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const [chosenBets, setChosenBets] = useState<ChosenBet[]>([]);
  const [chosenBetSum, setChosenBetSum] = useState<ChosenBetSum[]>([]);

  if (Component.getLayout) {
    return (
      <main className={inter.className}>
        <AuthContextProvider>
          <Toaster />
          {Component.getLayout(<Component {...pageProps} />)}
        </AuthContextProvider>
      </main>
    );
  }

  return (
    <main className={inter.className}>
      <AuthContextProvider>
        <Toaster />
        <RouteGuard>
          <Head>
            <link rel="bsplic icon" href="/bsplic-icon.ico" />
          </Head>
          {/* //TODO: Make ChosenBetsContext component and clean this out */}
          <ChosenBetsContext.Provider
            value={{ chosenBets, setChosenBets, chosenBetSum, setChosenBetSum }}
          >
            <div className="bg-[#f4f0f0] text-black min-h-screen">
              <Navbar />
              <Sidebar />
              <RightBar />
              <Component {...pageProps} />
            </div>
          </ChosenBetsContext.Provider>
        </RouteGuard>
      </AuthContextProvider>
    </main>
  );
};

export default App;
