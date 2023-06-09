import Image from "next/image";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import getData from "../../server/api/getData";
import { useAuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";

interface CouponBasic {
  bet: any | undefined;
  bets: any[] | undefined;
  betAmount: number;
  betOdds: number;
  betDate: {
    nanoseconds: number;
    seconds: number;
  };
  betResult: string | null;
  betResultDate: {
    nanoseconds: number;
    seconds: number;
  } | null;
  betStatus: "pending" | "won" | "lost";
  betType: "single" | "ako";
  userId: string;
}

interface CouponProps<Coupon> {
  coupon: Coupon;
  id: string;
}
const MyCoupon = <Coupon extends CouponBasic>({
  coupon,
  id,
}: CouponProps<Coupon>) => {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { user }: { user: User } = useAuthContext();

  useEffect(() => {
    const getAdmins = async () => {
      if (user)
        await getData("admins", user.uid).then((data) => {
          if (data.result?.exists()) {
            return setIsUserAdmin(true);
          } else return setIsUserAdmin(false);
        });
    };
    getAdmins();
  }, [user]);

  const {
    bet,
    bets,
    betOdds,
    betAmount,
    betDate,
    betResult,
    betResultDate,
    betType,
    betStatus,
    userId,
  } = coupon;

  return (
    <div className="bg-[#fffefe] w-full md:w-[600px] text-[13px] rounded-2xl flex-col flex ">
      <div className="flex items-center  justify-between p-3 border-b border-gray-200">
        <p className="text-gray-500 font-medium">
          {betType === "ako" ? "Łączony" : "Pojedynczy"}
        </p>
        {betStatus === "pending" && <p className="font-bold">Trwa</p>}
        {betStatus === "lost" && (
          <p className="font-bold text-red-500">Przegrany</p>
        )}
        {betStatus === "won" && (
          <p className="font-bold text-green-500">Wygrany</p>
        )}
      </div>
      {betType === "ako" ? (
        bets?.map((b) => (
          <div
            key={b.betId}
            className="px-3 py-2.5 border-b border-gray-200 flex flex-col"
          >
            <div className="justify-between items-center">
              <div className="flex items-center gap-2">
                <Image src={b.icon} alt="Icon Image" width={16} height={16} />
                <p className="font-bold text-[15px] text-gray-900">{b.title}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-gray-900">{b.label}:</p>
                <p className="text-sm font-bold text-gray-900">{b.bet}</p>
              </div>
              <p className="p-1.5 bg-yellow-400 rounded-md text-[13px] font-semibold">
                {b.betOdds.toString().replace(".", ",")}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="px-3 py-2 border-b border-gray-200 flex flex-col">
          <div className="justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src={bet.icon} alt="Icon Image" width={16} height={16} />
              <p className="font-bold text-[15px] text-gray-900">{bet.title}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-gray-900">{bet.label}:</p>
              <p className="text-sm font-bold text-gray-900">{bet.bet}</p>
            </div>
            <p className="p-1.5 bg-yellow-400 rounded-md text-[13px] font-semibold">
              {bet.betOdds.toString().replace(".", ",")}
            </p>
          </div>
        </div>
      )}
      <div className="px-3 py-2 gap-1 border-b border-gray-200 font-medium flex flex-col">
        {betType === "ako" && (
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Łączny kurs</p>
            <p className="p-1.5 bg-yellow-400 rounded-md text-[13px] font-semibold">
              {betOdds.toFixed(2).replace(".", ",")}
            </p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <p>Stawka</p>
          <p>{Number(betAmount).toFixed(2).replace(".", ",")}&nbsp;zł</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[15px] font-semibold">Potencjalna wygrana</p>
          <p className="text-red-500 font-extrabold">
            {(betType === "ako" ? betOdds * betAmount : bet.betOdds * betAmount)
              .toFixed(2)
              .replace(".", ",")}
            &nbsp;zł
          </p>
        </div>
      </div>
      <div className="px-3 py-2 flex flex-col md:flex-row justify-between md:items-center text-[10px] text-gray-400">
        <p>
          Data złożenia:
          <span> {dayjs.unix(betDate.seconds).format("DD.MM.YYYY HH:mm")}</span>
        </p>
        {isUserAdmin && <p>{id}</p>}
      </div>
    </div>
  );
};

export default MyCoupon;
