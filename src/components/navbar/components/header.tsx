import type { FunctionComponent } from "react";

interface Props {
  linkClick: (pathname: string) => void;
}

export const Header: FunctionComponent<Props> = ({ linkClick }) => {
  const handleClick = () => {
    linkClick("/");
  };

  return (
    <button onClick={handleClick}>
      <span className="text-xl font-bold italic">BSPLIC.</span>
    </button>
  );
};
