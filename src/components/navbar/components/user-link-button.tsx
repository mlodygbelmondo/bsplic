import type { FunctionComponent, ReactNode } from "react";

interface OwnProps {
  label: string;
  pathname: string;
  icon: ReactNode;
  linkClick: (pathname: string) => void;
}

export const UserLinkButton: FunctionComponent<OwnProps> = ({
  label,
  pathname,
  icon,
  linkClick,
}) => {
  const handleClick = () => {
    linkClick(pathname);
  };

  return (
    <button
      className="register text-sm p-2.5 hover:bg-[#d23131] rounded-lg transition-colors flex items-center gap-2"
      onClick={handleClick}
    >
      {icon}
      {label}
    </button>
  );
};
