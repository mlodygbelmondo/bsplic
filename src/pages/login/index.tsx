import Head from "next/head";
import type { NextPage } from "next";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { BsGoogle } from "react-icons/bs";
import { ReactNode, useEffect } from "react";
import { ImFacebook } from "react-icons/im";

import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
import { app } from "@/server/api/firebase";
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
  useSendSignInLinkToEmail,
} from "react-firebase-hooks/auth";
import getData from "../../server/api/getData";
import addData from "../../server/api/addData";
import { createToast } from "@/utils/toasts";
import { TOAST_MESSAGES } from "@/utils/toastMessages";

export default function Home() {
  const auth = getAuth(app);
  const { user } = useAuthContext();
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  const router = useRouter();
  useEffect(() => {
    console.log(user);
    if (user !== null && user !== undefined) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatingAccount = async (success: any) => {
    console.log(success.user);

    await getData("users", success.user.uid).then((data) => {
      //TODO: OPEN MODAL IF USER LOGS FIRST TIME, U CAN MAKE IT HAPPEN USING ROUTE PARAMS
      if (!data.result?.exists()) {
        //TODO: MOVE USER TO FIRSTTIME LOGIN PAGE AND ASK HIM TO ACCEPT TERMS AND CONDITIONS AND THEN ADD DATA TO DB
        //TODO: TELL USER THAT HE WILL BE BANNED IF HE SPAMS THINGS IN ADD COUPON
        addData("users", success.user.uid, {
          balance: 1000,
          email: success.user.email,
          uid: success.user.uid,
          displayName: success.user.displayName,
          photoURL: success.user.photoURL,
          lastDailyBonus: new Date(),
        });
      } else {
        addData("users", success.user.uid, {
          balance: data.result?.data()?.balance,
        });
      }
    });
  };

  const loginOptions = [
    // {
    //   icon: <HiOutlineMail className="w-5 h-5" />,
    //   label: "Zaloguj się przez E-mail",
    //   onClick: () => {
    //     const success = false;
    //     if (success) {
    //       handleCreatingAccount(success);
    //       router.push("");
    //     }
    //   },
    //   styling:
    //     "border border-gray-700 hover:bg-gray-900 hover:text-white transition-colors ease-linear duration-150",
    //   textStyling: "text-inherit",
    // },
    {
      icon: <BsGoogle className="w-5 h-5 text-white" />,
      label: "Zaloguj się przez Google",
      onClick: async () => {
        const success = await signInWithGoogle();
        if (success) {
          handleCreatingAccount(success);
          createToast(TOAST_MESSAGES.logInSuccess());
          router.push("/");
        } else createToast(TOAST_MESSAGES.logInFailed());
      },
      styling:
        "bg-orange-600 text-white hover:bg-orange-700 transition-colors ease-linear",
      textStyling: "text-white",
    },
    {
      icon: <ImFacebook className="w-5 h-5 text-white" />,
      label: "Zaloguj się przez Facebook'a",
      onClick: async () => {
        const success = await signInWithFacebook();
        if (success) {
          handleCreatingAccount(success);
          router.push("/");
        }
      },
      styling:
        "bg-blue-600 text-white hover:bg-blue-700 transition-colors ease-linear",
      textStyling: "text-white",
    },
  ];
  return (
    <>
      <Head>
        <title>Bsplic</title>
        <meta name="description" content="Bsplic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="bsplic icon" href="/bsplic-icon.ico" />
      </Head>
      <div className="w-full min-h-screen flex flex-col justify-center bg-gradient items-center">
        <div className="-translate-y-20 select-none text-[4rem] italic font-bold text-white p-4 px-12 rounded-lg">
          BSPLIC
        </div>
        <div className="px-8 py-10 -translate-y-16 rounded-lg font-semibold bg-white flex flex-col gap-4 items-center justify-center">
          <p className="font-bold text-xl">Zaloguj</p>
          {loginOptions.map((option) => (
            <button
              key={option.label}
              className={`flex items-center rounded-full justify-start text-left w-full gap-2 p-3 ${option.styling}`}
              onClick={option.onClick}
            >
              {option.icon}
              <p className={`${option.textStyling}`}>{option.label}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

Home.getLayout = function PageLayout(page: ReactNode) {
  return <div className="bg-[#f4f0f0] text-black">{page}</div>;
};
