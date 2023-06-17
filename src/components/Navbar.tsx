"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { app } from "../server/api/firebase";
import { getAuth } from "firebase/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import { useAuthContext } from "@/context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import type { User } from "firebase/auth";
import { getAdminById, getUserById } from "@/server/api/queries";
import { FaPlus } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { createToast } from "@/utils/toasts";
import { TOAST_MESSAGES } from "@/utils/toastMessages";
import getData from "../server/api/getData";
import { IoShieldSharp } from "react-icons/io5";
import UserMenu from "./UserMenu";
import Modal from "./shared/Modal";
import { useModal } from "./shared/useModal";
import dayjs from "dayjs";
import addData from "@/server/api/addData";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import MobileNavbar from "./MobileNavbar";
type CurrentPage = "home" | "live" | "promo";

interface NavProps {
  currentPage?: CurrentPage;
}

const Navbar = ({ currentPage }: NavProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const { user }: { user: User } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(app);

  const now = dayjs();
  const normalizedNow = now.format("DD.MM.YYYY");

  const [userData, loading, err] = useCollection(getUserById(user?.uid));
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  // useEffect(() => {
  //   const getUserData = async () => {
  //     return (await getData("users", user)).result?.data();
  //   };
  //   getUserData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // const [admins, loadingAdmins, errorAdmins] = useCollection(
  //   getAdminById(user?.uid)
  // );
  // console.log(userData?.docs[0]?.data());
  // console.log(admins?.docs[0]?.data());

  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  document.addEventListener("click", (e) => {
    setIsUserMenuOpen(false);
  });

  useEffect(() => {
    const getAdmins = async () => {
      if (user) {
        const admin = await getData("admins", user.uid).then((data) => {
          if (data.result?.exists()) {
            return setIsUserAdmin(true);
          } else return setIsUserAdmin(false);
        });
      }
    };
    getAdmins();
  }, [user]);

  const loggingOut = async () => {
    const success = await signOut();
    if (success) {
      router.push("/login");
      createToast(TOAST_MESSAGES.signOutSuccess());
    }
  };

  const [isDailyBonusModalOpen, toggleDailyBonusModalVisibility] = useModal();

  const userAccount = userData?.docs[0]?.data();

  const isDailyBonusClaimed = !now.isAfter(
    dayjs.unix(userAccount?.lastDailyBonus.seconds),
    "day"
  );

  const claimBonus = async () => {
    addData("users", user.uid, {
      lastDailyBonus: new Date(),
      balance: userAccount?.balance + 200,
    });
  };

  return (
    <nav className="bg-gradient2 text-white fixed h-12 left-0 top-0 w-full z-10">
      <div className="flex justify-between h-full items-center mx-4">
        <div className="flex gap-3 items-center">
          <button onClick={() => router.asPath !== "/" && router.push("/")}>
            <span className="text-xl font-bold italic">BSPLIC.</span>
          </button>
          <div className="links pl-3">
            <div className="hidden xl:flex justify-center items-center font-medium text-sm ">
              <button
                onClick={() => router.asPath !== "/" && router.push("/")}
                className={`p-3.5 hover:bg-red-600 transition-colors ease-in duration-50 ${
                  router.asPath === "/" ? "" : "text-[#ffffffaf]"
                }`}
              >
                Zakłady
              </button>

              <button
                onClick={() =>
                  router.asPath !== "/live" && router.push("/live")
                }
                className={`p-3.5 relative hover:bg-red-600 transition-colors ease-in duration-50 live-category ${
                  router.asPath === "/live" ? "" : "text-[#ffffffaf]"
                }`}
              >
                Na żywo
                <div className="absolute top-1 right-[2px] h-[0.875rem] px-[5px] rounded-2xl flex justify-center items-center bg-black text-[10px] ">
                  <p className="text-white">0</p>
                </div>
              </button>

              <button
                onClick={() =>
                  router.asPath !== "/promotions" && router.push("/promotions")
                }
                className={`p-3.5 hover:bg-red-600 transition-colors ease-in duration-50 ${
                  router.asPath === "/promotions" ? "" : "text-[#ffffffaf]"
                }`}
              >
                Promocje
              </button>
            </div>
          </div>
        </div>
        <div className="flex xl:hidden">
          <FiMenu
            className="text-[26px]"
            onClick={() => setIsMobileNavbarOpen(!isMobileNavbarOpen)}
          />
        </div>
        <div
          className="pr-3 hidden xl:flex items-center gap-4 text-xs font-semibold"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            onClick={toggleDailyBonusModalVisibility}
            className="flex gap-1 items-center text-xs font-semibold bg-red-800 p-1 rounded-full
          "
          >
            <FaPlus className="text-red-500 p-1 bg-white rounded-full text-xl" />
            <p>{userAccount?.balance.toFixed(2).replace(".", ",")}&nbsp;zł</p>
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

          {isUserAdmin && (
            <button
              className="register text-sm p-2.5 hover:bg-[#d23131] rounded-lg transition-colors flex items-center gap-2"
              onClick={() =>
                router.asPath !== "/admin" && router.push("/admin")
              }
            >
              <IoShieldSharp className="text-lg" />
              Panel admina
            </button>
          )}
          <button
            className="register text-sm p-2.5 hover:bg-[#d43131] rounded-lg transition-colors flex items-center gap-2"
            onClick={() =>
              router.asPath !== "/requestbet" && router.push("/requestbet")
            }
          >
            <MdCreate className="text-red-600 p-[1.5px] w-[16px] bg-white rounded h-5" />
            Zaproponuj zakład
          </button>
          {/* TODO: Add my coupons page */}
          <button
            className="register text-sm p-2.5 hover:bg-[#de3737] rounded-lg transition-colors flex items-center gap-2"
            onClick={() =>
              router.asPath !== "/mycoupons" && router.push("/mycoupons")
            }
          >
            <TiTick className="text-red-600 p w-[16px] bg-white rounded h-5" />
            Moje kupony
          </button>
          <div>
            <button
              className="login text-sm relative p-2.5 hover:bg-[#e13b3b] rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              {user?.photoURL &&
              user?.providerData[0].providerId !== "facebook.com" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  width={24}
                  height={24}
                  src={user.photoURL || "/user.png"}
                  alt="user img"
                  className="rounded-full"
                />
              ) : (
                <FaUser className="text-lg" />
              )}
              {user ? user?.displayName?.split(" ")[0] : "Profil"}
            </button>
            {isUserMenuOpen && <UserMenu loggingOut={loggingOut} user={user} />}
          </div>
        </div>
      </div>
      {isMobileNavbarOpen && (
        <MobileNavbar
          setIsMobileNavbarOpen={setIsMobileNavbarOpen}
          isDailyBonusClaimed={isDailyBonusClaimed}
          claimBonus={claimBonus}
          isDailyBonusModalOpen={isDailyBonusModalOpen}
          normalizedNow={normalizedNow}
          toggleDailyBonusModalVisibility={toggleDailyBonusModalVisibility}
          userAccount={userAccount}
          isUserAdmin={isUserAdmin}
          loggingOut={loggingOut}
          user={user}
        />
      )}
    </nav>
  );
};

export default Navbar;
