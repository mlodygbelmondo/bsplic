import MyCoupon from "@/components/mycoupons/MyCoupon";
import NoMyCoupons from "@/components/mycoupons/NoMyCoupons";
import { useAuthContext } from "@/context/AuthContext";
import { getBetsPlacedByUserId } from "@/server/api/queries";
import { User } from "firebase/auth";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import dayjs from "dayjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { BETS_FILTER } from "@/utils/consts";
import { filterBets } from "@/utils/filterBets";
import BetsStatusFilter from "@/components/shared/BetsStatusFilter";
import BetsLayout from "../layout";

const Home = () => {
  const { user }: { user: User } = useAuthContext();

  const [userBets] = useCollection(getBetsPlacedByUserId(user.uid));
  const [betsFilter, setBetsFilter] = useState<keyof typeof BETS_FILTER>(
    BETS_FILTER.pending
  );

  const filteredBets = filterBets(userBets?.docs, betsFilter);

  const sortedBets = filteredBets.sort((a, b) => {
    return dayjs
      .unix(a.data().betDate.seconds)
      .isBefore(dayjs.unix(b.data().betDate.seconds))
      ? 1
      : -1;
  });

  return (
    <>
      <Head>
        <title>Bsplic</title>
        <meta name="description" content="Bsplic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="bsplic icon" href="/bsplic-icon.ico" />
      </Head>
      <div className="pt-[70px] flex flex-col pb-4 px-4 md:px-0 items-center md:pl-[15rem] md:pr-[17rem] gap-3">
        <h1 className="text-2xl mb-1 font-bold">Moje kupony</h1>
        <BetsStatusFilter
          betsFilter={betsFilter}
          setBetsFilter={setBetsFilter}
        />
        {userBets?.docs &&
          (sortedBets.length !== 0 ? (
            <>
              {sortedBets?.map((bet) => (
                <MyCoupon key={bet.id} coupon={bet.data() as any} id={bet.id} />
              ))}
            </>
          ) : (
            <NoMyCoupons betsFilter={betsFilter} />
          ))}
      </div>
    </>
  );
};

Home.getLayout = (page: ReactNode) => {
  return <BetsLayout>{page}</BetsLayout>;
};

export default Home;
