import MyCoupon from "@/components/mycoupons/MyCoupon";
import NoMyCoupons from "@/components/mycoupons/NoMyCoupons";
import { useAuthContext } from "@/context/AuthContext";
import { getBetsPlacedByUserId } from "@/server/api/queries";
import { User } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import { useCollection } from "react-firebase-hooks/firestore";

const Home = () => {
  const { user }: { user: User } = useAuthContext();

  const [userBets] = useCollection(getBetsPlacedByUserId(user.uid));
  console.log(userBets?.docs[0]?.data());
  const sortedBets = userBets?.docs.sort((a, b) => {
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
      {userBets?.docs &&
        (userBets?.docs.length !== 0 ? (
          <div className="pt-[70px] flex flex-col pb-4 items-center pl-[15rem] pr-[17rem] gap-3">
            <h1 className="pl-[11.3rem] w-full text-2xl font-bold">
              Moje kupony
            </h1>
            {sortedBets?.map((bet) => (
              <MyCoupon key={bet.id} coupon={bet.data() as any} />
            ))}
          </div>
        ) : (
          <NoMyCoupons />
        ))}
    </>
  );
};

export default Home;
