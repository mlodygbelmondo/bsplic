import { User } from "firebase/auth";
import type { FunctionComponent } from "react";
import { FaUser } from "react-icons/fa";
import { UserMenu } from "./";
interface OwnProps {
  isUserMenuOpen: boolean;
  userPhotoURL: string;
  userProviderId: string;
  userDisplayName: string;
  user: User;
  toggleUserMenu: () => void;
  loggingOut: () => void;
}

export const UserMenuContainer: FunctionComponent<OwnProps> = ({
  isUserMenuOpen,
  userDisplayName,
  user,
  userPhotoURL,
  userProviderId,
  toggleUserMenu,
  loggingOut,
}) => {
  return (
    <div>
      <button
        className="login text-sm relative p-2.5 hover:bg-[#e13b3b] rounded-lg transition-colors flex items-center gap-2"
        onClick={toggleUserMenu}
      >
        {userPhotoURL && userProviderId !== "facebook.com" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            width={24}
            height={24}
            src={userPhotoURL || "/user.png"}
            alt="user img"
            className="rounded-full"
          />
        ) : (
          <FaUser className="text-lg" />
        )}
        {userDisplayName}
      </button>
      {isUserMenuOpen ? <UserMenu loggingOut={loggingOut} user={user} /> : null}
    </div>
  );
};
