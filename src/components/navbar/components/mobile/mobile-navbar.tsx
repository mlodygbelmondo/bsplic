import type { FunctionComponent } from "react";
import { FaPlus } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { formatBalance } from "../../navbar.utils";

interface Props {
  toggleMobileSidebar: () => void;
  userBalance: number;
}

export const MobileNavbar: FunctionComponent<Props> = ({
  toggleMobileSidebar,
  userBalance,
}) => {
  return (
    <div className="flex items-center gap-4 xl:hidden">
      <button
        className="flex gap-1 items-center my-3 text-xs font-semibold bg-red-800 p-1 rounded-full
  "
      >
        <FaPlus className="text-red-500 p-1 bg-white rounded-full text-xl" />
        <p>{formatBalance(userBalance)}</p>
      </button>
      <FiMenu className="text-[26px]" onClick={toggleMobileSidebar} />
    </div>
  );
};
