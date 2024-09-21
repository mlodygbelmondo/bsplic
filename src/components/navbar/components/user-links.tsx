import type { FunctionComponent } from "react";
import { IoShieldSharp } from "react-icons/io5";
import { MdCreate } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { UserLinkButton } from "./user-link-button";

interface OwnProps {
  isUserAdmin: boolean;
  linkClick: (pathname: string) => void;
}

export const UserLinks: FunctionComponent<OwnProps> = ({
  isUserAdmin,
  linkClick,
}) => {
  /**
   *
   * hover:bg-[#d23131]
   * hover:bg-[#d43131]
   * [#de3737]
   */
  return (
    <>
      {isUserAdmin ? (
        <UserLinkButton
          label="Panel admina"
          pathname="/admin"
          icon={<IoShieldSharp className="text-lg" />}
          linkClick={linkClick}
        />
      ) : null}
      <UserLinkButton
        label="Zaproponuj zakład"
        pathname="/requestbet"
        icon={
          <MdCreate className="text-red-600 p-[1.5px] w-[16px] bg-white rounded h-5" />
        }
        linkClick={linkClick}
      />
      <UserLinkButton
        label="Moje kupony"
        pathname="/mycoupons"
        icon={
          <TiTick className="text-red-600 p w-[16px] bg-white rounded h-5" />
        }
        linkClick={linkClick}
      />
    </>
  );
};

export default UserLinks;
