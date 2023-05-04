import Head from "next/head";
import PromotionpageMain from "@/components/Homepage/Promotions/PromotionpageMain";
export default function Home() {
  return (
    <>
      <Head>
        <title>Bsplic</title>
        <meta name="description" content="Bsplic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PromotionpageMain />
    </>
  );
}
