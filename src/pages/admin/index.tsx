import addData from "@/server/api/addData";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { User } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";

import { useRouter } from "next/router";
import getData from "../../server/api/getData";
import BetCardEditable from "@/components/Homepage/Bets/BetCardEditable";
import { useCollection } from "react-firebase-hooks/firestore";
import { getAllPlacedBets, getAllUsers } from "@/server/api/queries";
import dayjs from "dayjs";
import MyCoupon from "@/components/mycoupons/MyCoupon";
import { createToast } from "@/utils/toasts";
import { TOAST_MESSAGES } from "@/utils/toastMessages";
const Home = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [betLabel, setBetLabel] = useState("");
  const [category, setCategory] = useState("");
  const [bet1, setBet1] = useState("");
  const [bet2, setBet2] = useState("");
  const [bet1Odds, setBet1Odds] = useState("");
  const [bet2Odds, setBet2Odds] = useState("");
  const [bet1Percents, setBet1Percents] = useState("");
  const [bet2Percents, setBet2Percents] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [userAdminRole, setUserAdminRole] = useState<
    "" | "admin" | "moderator"
  >("");

  const { user }: { user: User } = useAuthContext();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const betId = uuidv4();
    if (
      bet1 !== "" &&
      bet2 !== "" &&
      bet1Odds !== "" &&
      bet2Odds !== "" &&
      bet1Percents !== "" &&
      bet2Percents !== "" &&
      subtitle !== "" &&
      category !== "" &&
      date !== "" &&
      hour !== "" &&
      title !== "" &&
      betLabel !== ""
    ) {
      addData("bets", betId, {
        bet1: bet1,
        bet1Odds: parseFloat(bet1Odds),
        bet1Percents: parseInt(bet1Percents),
        bet2: bet2,
        bet2Odds: parseFloat(bet2Odds),
        bet2Percents: parseInt(bet2Percents),
        betLabel: betLabel,
        categories: [category],
        date: date,
        hour: hour,
        //icon: "/categories/school.png",
        //icon: "/categories/youtube.png",
        icon: "/popularbets/dice.png",
        //icon: "/popularbets/shooting.png",
        subtitle: subtitle,
        title: title,
        creationDate: new Date(),
        betsPlaced: 0,
      });
      createToast(TOAST_MESSAGES.betCreatedSuccessfully);
    } else {
      createToast(TOAST_MESSAGES.fillAllFields);
      // addData("bets", betId, {
      //   bet1: "Poniżej 59.5%",
      //   bet1Odds: 1.75,
      //   bet1Percents: 54,
      //   bet2: "Powyżej 57.5%",
      //   bet2Odds: 1.85,
      //   bet2Percents: 46,
      //   betLabel: "Wynik matury",
      //   categories: ["final exam", "school"],
      //   date: "04.05.2023",
      //   hour: "9:00",
      //   icon: "/categories/school.png",
      //   subtitle: "Matura - j.polski, podstawa",
      //   title: title,
      // });
    }
  };
  const router = useRouter();

  useEffect(() => {
    const getAdmins = async () => {
      if (user) {
        const admin = await getData("admins", user.uid).then((data) => {
          if (!data.result?.exists()) {
            return router.push("/");
          } else {
            if (data.result.data()?.role === "admin") setUserAdminRole("admin");
            else setUserAdminRole("moderator");
          }
        });
      } else return router.push("/");
    };
    getAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const [users] = useCollection(getAllUsers());
  const [userBets] = useCollection(getAllPlacedBets());
  const sortedBets = userBets?.docs.sort((a, b) => {
    return dayjs
      .unix(a.data().betDate.seconds)
      .isBefore(dayjs.unix(b.data().betDate.seconds))
      ? 1
      : -1;
  });

  return (
    <>
      {userAdminRole === "admin" && (
        <div className="pt-[4.5rem] px-[24rem] pb-5">
          <h2 className="text-center text-2xl font-bold pb-4">
            Tworzenie zakładu
          </h2>
          <BetCardEditable
            bet1={bet1}
            bet1Odds={bet1Odds}
            bet1Percents={bet1Percents}
            bet2={bet2}
            bet2Odds={bet2Odds}
            bet2Percents={bet2Percents}
            betLabel={betLabel}
            category={category}
            date={date}
            hour={hour}
            subtitle={subtitle}
            title={title}
            setBet1={setBet1}
            setBet1Odds={setBet1Odds}
            setBet1Percents={setBet1Percents}
            setBet2={setBet2}
            setBet2Odds={setBet2Odds}
            setBet2Percents={setBet2Percents}
            setBetLabel={setBetLabel}
            setCategory={setCategory}
            setDate={setDate}
            setHour={setHour}
            setSubtitle={setSubtitle}
            setTitle={setTitle}
          />
          <form
            action=""
            onSubmit={submit}
            className="pt-5 flex flex-col gap-4 justify-center items-center"
          >
            <div className="flex justify-center gap-4 flex-wrap">
              <input
                type="text"
                value={title}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  setTitle(e.target.value.slice(0, 70));
                }}
                placeholder="Tytuł zakładu"
              />
              <input
                type="text"
                value={subtitle}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  setSubtitle(e.target.value.slice(0, 19));
                }}
                placeholder="Podtytuł zakładu"
              />
              <input
                type="text"
                value={betLabel}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  setBetLabel(e.target.value.slice(0, 30));
                }}
                placeholder="Etykieta zakładu"
              />
              {/* //TODO: Add select */}
              <input
                type="text"
                value={category}
                className="p-3 rounded-md border w-64"
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Kategoria zakładu"
              />
              <input
                type="text"
                value={bet1}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  setBet1(e.target.value.slice(0, 19));
                }}
                placeholder="Pierwszy zakład"
              />
              <input
                type="text"
                value={bet2}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  setBet2(e.target.value.slice(0, 19));
                }}
                placeholder="Drugi zakład"
              />
              <input
                type="number"
                value={bet1Odds}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  const temp = e.target.value.slice(0, 6);
                  setBet1Odds(temp);
                  if (
                    temp !== "" &&
                    temp !== "0" &&
                    !Number.isNaN(parseFloat(temp)) &&
                    parseFloat(temp) > 1
                  ) {
                    const bet1NumberOdds = parseFloat(temp);
                    const bet1NumberPercents = Math.round(
                      (1 / bet1NumberOdds) * 100
                    );
                    const bet2NumberPercents = 100 - bet1NumberPercents;
                    const bet2NumberOdds = (
                      Math.round((100 / bet2NumberPercents) * 100) / 100
                    ).toFixed(2);
                    setBet1Percents(bet1NumberPercents + "");
                    setBet2Percents(bet2NumberPercents + "");
                    setBet2Odds(bet2NumberOdds + "");
                  } else {
                    setBet2Odds("Błędny kurs");
                  }
                }}
                placeholder="Kurs na 1szy zakład"
              />
              <input
                type="number"
                value={bet1Percents}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  const temp = e.target.value.slice(0, 2);
                  setBet1Percents(temp);
                  if (
                    temp !== "" &&
                    temp !== "0" &&
                    !Number.isNaN(parseFloat(temp)) &&
                    parseFloat(temp) >= 1 &&
                    parseFloat(temp) <= 99
                  ) {
                    const bet1NumberPercents = parseFloat(temp);
                    const bet2NumberPercents = 100 - bet1NumberPercents;
                    const bet2NumberOdds = (
                      Math.round((100 / bet2NumberPercents) * 100) / 100
                    ).toFixed(2);
                    const bet1NumberOdds = (
                      Math.round((100 / bet1NumberPercents) * 100) / 100
                    ).toFixed(2);
                    setBet1Odds(bet1NumberOdds + "");
                    setBet2Percents(bet2NumberPercents + "");
                    setBet2Odds(bet2NumberOdds + "");
                  } else {
                    setBet2Odds("Błędny %");
                  }
                }}
                placeholder="Szansa na 1szy zakład (%)"
              />
              <input
                type="text"
                value={date}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  setDate(e.target.value.slice(0, 10));
                }}
                placeholder="Data zakładu"
              />
              <input
                type="text"
                value={hour}
                className="p-3 rounded-md border w-64"
                onChange={(e) => {
                  setHour(e.target.value.slice(0, 5));
                }}
                placeholder="Godzina zakładu"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 font-semibold bg-red-600 text-white border rounded-md hover:bg-red-700 transition-colors"
            >
              Stwórz zakład
            </button>
            <button
              type="button"
              onClick={() => {
                setBet1("Poniżej 59.5%");
                setBet2("Powyżej 59.5%");
                setCategory("school");
                setBetLabel("Wynik matury (j. polski p.p.)");
                setSubtitle("Egzamin maturalny");
                setDate("04.05.2023");
                setHour("9:00");
              }}
              className="px-8 py-3 font-semibold bg-white text-orange-600 border rounded-md hover:bg-orange-600 hover:text-white transition-colors"
            >
              Wypełnij formularz do matury
            </button>
          </form>
          <h1 className="mt-10 text-2xl font-bold text-center">
            Postawione zakłady
          </h1>
          <div className="flex flex-col gap-7  items-center mt-4">
            {sortedBets?.map((bet) => (
              <div key={bet.id} className="flex flex-col gap-2">
                <p className="pl-[0.5rem] font-bold text-lg">
                  {
                    users?.docs
                      .find((user) => user.id === bet.data().userId)
                      ?.data().displayName
                  }
                </p>
                <MyCoupon coupon={bet.data() as any} />
              </div>
            ))}
          </div>
        </div>
      )}
      {userAdminRole === "moderator" && (
        <div className="pt-[100px] px-[24rem]">Widok moderatora :D</div>
      )}
    </>
  );
};

export default Home;
