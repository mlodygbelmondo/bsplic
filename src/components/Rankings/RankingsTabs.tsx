import { RANKINGS_TAB } from "@/utils/consts";
import React from "react";
import BetsFilterButton from "../shared/BetsFilterButton";
import { RANKINGS_TAB_BUTTONS } from "@/utils/rankingsTabButtons";

interface OwnProps {
  rankingsTab: keyof typeof RANKINGS_TAB;
  setRankingsTab: (rankingsTab: keyof typeof RANKINGS_TAB) => void;
}

const RankingsTab = ({ rankingsTab, setRankingsTab }: OwnProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {RANKINGS_TAB_BUTTONS.map((btn) => {
        const onClick = () => setRankingsTab(btn.filter);
        const isActive = rankingsTab === btn.filter;

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

export default RankingsTab;
