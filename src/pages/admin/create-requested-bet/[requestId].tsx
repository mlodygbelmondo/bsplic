import BetCardEditable from "@/components/Homepage/Bets/BetCardEditable";
import addData from "@/server/api/addData";
import deleteData from "@/server/api/deleteData";
import { getAllRequestedBets, getRequestedBetById } from "@/server/api/queries";
import { TOAST_MESSAGES } from "@/utils/toastMessages";
import { createToast } from "@/utils/toasts";
import Link from "next/link";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { ICONS_OPTIONS } from "@/utils/consts";
import AdminLayout from "../layout";

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
  const [iconPath, setIconPath] = useState("");
  const [wasFilled, setWasFilled] = useState(false);

  const router = useRouter();
  const { requestId } = router.query;

  const [requestedBets] = useCollection(getAllRequestedBets());
  const requestedBet = requestedBets?.docs
    .find((doc) => doc.id === requestId)
    ?.data();

  useEffect(() => {
    if (!requestedBet || wasFilled) return;

    setWasFilled(true);
    setTitle(requestedBet.title);
    setSubtitle(requestedBet.subtitle);
    setBetLabel(requestedBet.betLabel);
    setCategory(requestedBet.categories[0]);
    setBet1(requestedBet.bet1);
    setBet2(requestedBet.bet2);
    setBet1Odds(requestedBet.bet1Odds);
    setBet2Odds(requestedBet.bet2Odds.toFixed(2));
    setBet1Percents(requestedBet.bet1Percents);
    setBet2Percents(requestedBet.bet2Percents);
    setDate(requestedBet.date);
    setHour(requestedBet.hour);
    setIconPath(requestedBet.icon);
  }, [requestedBet, wasFilled]);

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
      betLabel !== "" &&
      typeof requestId === "string"
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
        icon: iconPath,
        subtitle: subtitle,
        title: title,
        creationDate: new Date(),
        betsPlaced: 0,
      }).then(() => {
        deleteData("bets_requests", requestId)
          .then(() => {
            router.push("/admin/requested-bets");
          })
          .catch((err) => console.log(err));
      });
      createToast(TOAST_MESSAGES.betCreatedSuccessfully);
    } else createToast(TOAST_MESSAGES.fillAllFields);
  };

  const handleIconPathChange = (event: any, value: string | null) =>
    value && setIconPath(value);

  return (
    <div className="pt-[4.5rem] px-4 md:px-[24rem] pb-5">
      <h2 className="text-center text-2xl font-bold pb-2">Tworzenie zakładu</h2>
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
        iconPath={iconPath}
      />
      <form
        action=""
        onSubmit={submit}
        className="pt-5 flex flex-col gap-4 justify-center items-center"
      >
        <div className="flex justify-center gap-4 flex-wrap max-w-[600px]">
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
          <Select
            placeholder="Icon"
            value={iconPath}
            onChange={handleIconPathChange}
            startDecorator={
              <Image src={iconPath} alt={iconPath} width={16} height={16} />
            }
            className="mx-20"
          >
            {ICONS_OPTIONS.map((icon) => (
              <Option value={icon} key={icon}>
                <div className="flex w-full justify-center">
                  <Image src={icon} alt={icon} width={16} height={16} />
                </div>
              </Option>
            ))}
          </Select>
        </div>

        <button className="px-8 py-3 font-semibold bg-red-600 text-white border rounded-md hover:bg-red-700 transition-colors">
          Stwórz zakład
        </button>
        <Link href={`/admin/requested-bets`}>
          <button
            className="px-8 py-3 font-semibold bg-red-600 text-white border rounded-md hover:bg-red-700 transition-colors"
            type="button"
          >
            Powrót
          </button>
        </Link>
      </form>
    </div>
  );
};

Home.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;

{
  /* <button
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
</button> */
}
