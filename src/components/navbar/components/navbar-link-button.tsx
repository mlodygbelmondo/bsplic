import { useRouter } from "next/router";
import type { FunctionComponent } from "react";

interface Props {
  label: string;
  pathname: string;
  linkClick: (pathname: string) => void;
}

export const NavbarLinkButton: FunctionComponent<Props> = ({
  pathname,
  label,
  linkClick,
}) => {
  const { asPath } = useRouter();

  const handleClick = () => {
    linkClick(pathname);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-3.5 hover:bg-red-600 transition-colors ease-in duration-50 ${
        asPath === pathname ? "" : "text-[#ffffffaf]"
      }`}
    >
      {label}
    </button>
  );
};
