import { TOAST_MESSAGES } from "@/utils/toastMessages";
import { createToast } from "@/utils/toasts";
import React from "react";
import { FaUser } from "react-icons/fa";
import type { User } from "firebase/auth";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
interface OwnProps {
  loggingOut: () => void;
  user: User;
}

const UserMenu = ({ loggingOut, user }: OwnProps) => {
  return (
    <div
      className=" absolute w-44 text-base text-left flex top-14 cursor-pointer rounded-md text-gray-900  bg-gray-50 right-3 flex-col shadow shadow-gray-400"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        onClick={() => {
          createToast(TOAST_MESSAGES.functionUnderDevelopment);
        }}
        className="flex p-2 gap-3 items-center rounded-tl-md rounded-tr-md hover:bg-[#eeebeb] transition-colors
      "
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
        <p>Mój profil</p>
      </div>
      <div
        onClick={() => {
          createToast(TOAST_MESSAGES.functionUnderDevelopment);
        }}
        className="p-2 flex gap-3 items-center hover:bg-[#eeebeb]  transition-colors"
      >
        <IoMdSettings className="text-[24px]" />
        <p>Ustawienia</p>
      </div>
      <div
        onClick={loggingOut}
        className="p-2 pl-2.5 flex gap-[10px] items-center rounded-bl-md rounded-br-md hover:bg-[#eeebeb]  transition-colors"
      >
        <IoLogOutOutline className="text-[24px]" />
        <p>Wyloguj się</p>
      </div>
    </div>
  );
};

export default UserMenu;
