import type { FunctionComponent } from "react";
import { NavbarLinkButton } from "./";

interface Props {
  linkClick: (pathname: string) => void;
}

export const NavbarLinks: FunctionComponent<Props> = ({ linkClick }) => {
  return (
    <div className="links pl-3">
      <div className="hidden xl:flex justify-center items-center font-medium text-sm ">
        <NavbarLinkButton pathname="/" label="Zakłady" linkClick={linkClick} />
        <NavbarLinkButton
          pathname="/roulette"
          label="Ruletka"
          linkClick={linkClick}
        />
        <NavbarLinkButton
          pathname="/rankings"
          label="Rankingi"
          linkClick={linkClick}
        />
      </div>
    </div>
  );
};
