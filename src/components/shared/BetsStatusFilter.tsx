import { BETS_FILTER } from "@/utils/consts";
import { STATUS_FILTER_BUTTONS } from "@/utils/statusFilterButtons";
import React from "react";
import BetsFilterButton from "./BetsFilterButton";

interface OwnProps {
  betsFilter: keyof typeof BETS_FILTER;
  setBetsFilter: (betsFilter: keyof typeof BETS_FILTER) => void;
}

const BetsStatusFilter = ({ betsFilter, setBetsFilter }: OwnProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {STATUS_FILTER_BUTTONS.map((btn) => {
        const onClick = () => setBetsFilter(btn.filter);
        const isActive = betsFilter === btn.filter;

        return (
          <BetsFilterButton
            isActive={isActive}
            key={btn.filter}
            onClick={onClick}
            label={btn.label}
            icon={btn.icon}
          />
        );
      })}
    </div>
  );
};

export default BetsStatusFilter;
