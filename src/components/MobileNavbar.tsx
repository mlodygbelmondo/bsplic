import { useRouter } from "next/router";
import React from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import Modal from "./shared/Modal";
import { DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";
import UserMenu from "./UserMenu";
import { TiTick } from "react-icons/ti";
import { MdCreate } from "react-icons/md";
import { IoLogOutOutline, IoShieldSharp } from "react-icons/io5";

interface OwnProps {
  isMobileNavbarOpen: boolean;
  setIsMobileNavbarOpen: (isMobileNavbarOpen: boolean) => void;
  userAccount: DocumentData | undefined;
  toggleDailyBonusModalVisibility: () => void;
  isDailyBonusModalOpen: boolean;
  claimBonus: () => void;
  normalizedNow: string;
  isDailyBonusClaimed: boolean;
  user: User;
  isUserAdmin: boolean;
  loggingOut: () => void;
}

const MobileNavbar = ({
  isMobileNavbarOpen,
  setIsMobileNavbarOpen,
  userAccount,
  toggleDailyBonusModalVisibility,
  isDailyBonusModalOpen,
  claimBonus,
  normalizedNow,
  isDailyBonusClaimed,
  user,
  isUserAdmin,
  loggingOut,
}: OwnProps) => {
  const closeMobileNavbar = () => setIsMobileNavbarOpen(false);

  const router = useRouter();

  return (
    <div
      className={`fixed w-full h-full left-0 top-0 ${
        isMobileNavbarOpen ? "" : "left-[100%]"
      }`}
    >
      <div
        className={`bg-black fixed left-0 top-0 z-10 opacity-70 w-full h-full ${
          isMobileNavbarOpen ? "" : "left-[100%]"
        }`}
        onClick={closeMobileNavbar}
      />
      <div
        className={`bg-red-700 w-[70%] fixed flex flex-col items-center justify-between ${
          isMobileNavbarOpen ? "right-0" : "-right-[70%]"
        } top-0 transition-all z-20 h-full p-4`}
      >
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full justify-between items-center">
            <span className="text-2xl font-bold italic flex items-center justify-center">
              BSPLIC
            </span>
            <button
              onClick={toggleDailyBonusModalVisibility}
              className="flex gap-1 items-center my-3 text-xs font-semibold bg-red-800 p-1 rounded-full
          "
            >
              <FaPlus className="text-red-500 p-1 bg-white rounded-full text-xl" />
              <p>{userAccount?.balance.toFixed(2).replace(".", ",")}&nbsp;zł</p>
            </button>
          </div>
          {isUserAdmin && (
            <button
              className={`p-3 hover:bg-red-600 transition-colors ease-in duration-50 ${
                router.asPath === "/admin" ? "" : "text-[#ffffffaf]"
              }`}
              onClick={() =>
                router.asPath !== "/admin" && router.push("/admin")
              }
            >
              Panel admina
            </button>
          )}
          <button
            onClick={() => router.asPath !== "/" && router.push("/")}
            className={`p-3 hover:bg-red-600 transition-colors ease-in duration-50 ${
              router.asPath === "/" ? "" : "text-[#ffffffaf]"
            }`}
          >
            Zakłady
          </button>
          <button
            onClick={() => router.asPath !== "/live" && router.push("/live")}
            className={`p-3 relative hover:bg-red-600 transition-colors ease-in duration-50 live-category ${
              router.asPath === "/live" ? "" : "text-[#ffffffaf]"
            }`}
          >
            Na żywo
          </button>
          <button
            onClick={() =>
              router.asPath !== "/promotions" && router.push("/promotions")
            }
            className={`p-3 hover:bg-red-600 transition-colors ease-in duration-50 ${
              router.asPath === "/promotions" ? "" : "text-[#ffffffaf]"
            }`}
          >
            Promocje
          </button>
          <Modal
            isVisible={isDailyBonusModalOpen}
            toggleVisibility={toggleDailyBonusModalVisibility}
            title="Dzienny bonus"
            date={normalizedNow}
            callToActionButtons={[
              {
                text: "Anuluj",
                onClick: toggleDailyBonusModalVisibility,
                variant: "secondary",
              },
              {
                text: "Odbierz",
                onClick: claimBonus,
                variant: "primary",
                disabled: isDailyBonusClaimed,
              },
            ]}
          >
            <p className="font-medium py-4 text-gray-800">
              {isDailyBonusClaimed
                ? "Dzienny bonus został już dzisiaj odebrany."
                : "Czy chciałbyś odebrać dzienny bonus o wysokości 200zł?"}
            </p>
          </Modal>
          <button
            className={`p-3 hover:bg-red-600 transition-colors ease-in duration-50 ${
              router.asPath === "/requestbet" ? "" : "text-[#ffffffaf]"
            }`}
            onClick={() =>
              router.asPath !== "/requestbet" && router.push("/requestbet")
            }
          >
            Zaproponuj zakład
          </button>
          {/* TODO: Add my coupons page */}
          <button
            className={`p-3 hover:bg-red-600 transition-colors ease-in duration-50 ${
              router.asPath === "/mycoupons" ? "" : "text-[#ffffffaf]"
            }`}
            onClick={() =>
              router.asPath !== "/mycoupons" && router.push("/mycoupons")
            }
          >
            Moje kupony
          </button>
        </div>
        <button
          onClick={loggingOut}
          className="p-2 flex gap-[10px] text-[#ffffffaf] items-center transition-colors"
        >
          <IoLogOutOutline className="text-[24px]" />
          <p>Wyloguj się</p>
        </button>
      </div>
    </div>
  );
};

export default MobileNavbar;
