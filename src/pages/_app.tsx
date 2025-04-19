import "@/styles/globals.css";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import Navbar from "../components/navbar/navbar.component";
import React, { useCallback } from "react";
import Head from "next/head";
import RouteGuard from "@/components/auth/RouteGuard";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

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
  isCouponOpen: boolean;
  setIsCouponOpen: (_: boolean) => void;
}>({
  chosenBets: [],
  setChosenBets: () => {},
  chosenBetSum: [],
  setChosenBetSum: () => {},
  isCouponOpen: false,
  setIsCouponOpen: () => {},
});

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const [chosenBets, setChosenBets] = useState<ChosenBet[]>([]);
  const [chosenBetSum, setChosenBetSum] = useState<ChosenBetSum[]>([]);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);

  const handleExitComplete = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={`${montserrat.variable} font-sans`}>
      <AuthContextProvider>
        <Toaster position="top-right" containerClassName="translate-y-10" />
        <Head>
          <title>BSPLIC</title>
          <link rel="bsplic icon" href="/bsplic-icon.ico" />
        </Head>
        <RouteGuard>
          <ChosenBetsContext.Provider
            value={{
              chosenBets,
              setChosenBets,
              chosenBetSum,
              setChosenBetSum,
              isCouponOpen,
              setIsCouponOpen,
            }}
          >
            <div className="bg-[#f4f0f0] text-black min-h-screen">
              <Navbar />
              <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
                <motion.div
                  key={router.asPath}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {getLayout(<Component {...pageProps} />)}
                </motion.div>
              </AnimatePresence>
            </div>
          </ChosenBetsContext.Provider>
        </RouteGuard>
      </AuthContextProvider>
    </main>
  );
};

export default App;
