import Head from "next/head";
import Sidebar from "@/components/Homepage/Leftbar/Sidebar";
import Bets from "@/components/Homepage/Bets/Bets";
import RightBar from "@/components/Homepage/Rightbar/RightBar";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Bsplic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Bets />
    </>
  );
}
