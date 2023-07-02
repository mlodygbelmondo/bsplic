import Head from "next/head";
import Bets from "@/components/Homepage/Bets/Bets";
import Rankings from "@/components/Rankings/Rankings";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Bsplic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Rankings />
    </>
  );
}
