"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { app } from "../../server/api/firebase";
import { getAuth } from "firebase/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import { useAuthContext } from "@/context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import type { User } from "firebase/auth";
import { getUserById } from "@/server/api/queries";
import { createToast } from "@/utils/toasts";
import { TOAST_MESSAGES } from "@/utils/toastMessages";
import getData from "../../server/api/getData";
import dayjs from "dayjs";
import addData from "@/server/api/addData";
import {
  MobileSidebar,
  Header,
  MobileNavbar,
  MoneyCounter,
  NavbarLinks,
  UserMenuContainer,
  UserLinks,
} from "./components";
import { useToggle } from "@/hooks";

const Navbar = () => {
  const { user }: { user: User } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(app);

  const [userData] = useCollection(getUserById(user?.uid));
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  const [signOut] = useSignOut(auth);

  const {
    close: closeUserMenu,
    toggle: toggleUserMenu,
    isOpen: isUserMenuOpen,
  } = useToggle();

  const {
    toggle: toggleMobileSidebar,
    isOpen: isMobileSidebarOpen,
    close: closeMobileSidebar,
  } = useToggle();

  document.addEventListener("click", closeUserMenu);

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

  const loggingOut = async () => {
    const success = await signOut();
    if (success) {
      router.push("/login");
      createToast(TOAST_MESSAGES.signOutSuccess());
    }
  };

  const userAccount = userData?.docs[0]?.data();

  const { userBalance, userDisplayName, userPhotoURL, userProviderId } =
    useMemo(() => {
      const userBalance = userData?.docs[0]?.data()?.balance
        ? (userData?.docs[0]?.data().balance as number)
        : 0;
      const userPhotoURL = user.photoURL ?? "";
      const userProviderId = user.providerData[0].providerId;
      const userDisplayName = user.displayName
        ? user.displayName.split(" ")[0]
        : "Profil";

      return {
        userBalance,
        userPhotoURL,
        userProviderId,
        userDisplayName,
      };
    }, [userData, user]);

  const isMonthlyBonusClaimed = !dayjs()
    .startOf("month")
    .isAfter(
      dayjs.unix(userAccount?.lastDailyBonus.seconds).startOf("month"),
      "day"
    );

  const [moneyIcon, setMoneyIcon] = useState<"plus" | "none" | "animatedTick">(
    () => {
      return "plus";
    }
  );

  const claimBonus = async () => {
    if (isMonthlyBonusClaimed || !userAccount?.lastDailyBonus) {
      return;
    }

    setMoneyIcon("animatedTick");
    if (userAccount) {
      addData("users", user.uid, {
        lastDailyBonus: new Date(),
        balance: userAccount.balance + 30000,
      });
      createToast(TOAST_MESSAGES.monthlyBonusClaimed());
    }
  };

  const completeAnimation = () => {
    setMoneyIcon("none");
  };

  const linkClick = (pathname: string) => {
    if (router.asPath !== pathname) {
      router.push(pathname);
    }
  };

  return (
    <nav className="bg-gradient2 text-white fixed h-12 left-0 top-0 w-full z-10">
      <div className="flex justify-between h-full items-center mx-4">
        <div className="flex gap-3 items-center">
          <Header linkClick={linkClick} />
          <NavbarLinks linkClick={linkClick} />
        </div>
        <MobileNavbar
          userBalance={userBalance}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        <div
          className="pr-3 hidden xl:flex items-center gap-4 text-xs font-semibold"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoneyCounter
            isMonthlyBonusClaimed={isMonthlyBonusClaimed}
            userBalance={userBalance}
            moneyIcon={moneyIcon}
            claimBonus={claimBonus}
            completeAnimation={completeAnimation}
          />
          <UserLinks isUserAdmin={isUserAdmin} linkClick={linkClick} />
          <UserMenuContainer
            loggingOut={loggingOut}
            user={user}
            userDisplayName={userDisplayName}
            userPhotoURL={userPhotoURL}
            userProviderId={userProviderId}
            toggleUserMenu={toggleUserMenu}
            isUserMenuOpen={isUserMenuOpen}
          />
        </div>
      </div>
      <MobileSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
        isUserAdmin={isUserAdmin}
        loggingOut={loggingOut}
      />
    </nav>
  );
};

export default Navbar;
