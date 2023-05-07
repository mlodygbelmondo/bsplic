import Head from "next/head";
import LivepageMain from "@/components/Homepage/Live/LivepageMain";
export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Bsplic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LivepageMain />
    </>
  );
}
