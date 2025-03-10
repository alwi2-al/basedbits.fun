"use client";

import { useEffect, useState } from "react";
import { Racer } from "@/app/baserace/components/Racer";
import { BaseRace, BaseRaceEntry } from "@/app/lib/types/types";

interface Props {
  entries: BaseRaceEntry[];
  eliminated: number;
  race: BaseRace;
  onClick: (idx: number) => void;
}

export const Racers = ({ entries, onClick, eliminated, race }: Props) => {
  return (
    <div>
      <div className="flex flex-wrap">
        {entries.map((entry, i) => (
          <Racer
            key={i}
            tokenId={entry.tokenId}
            race={race}
            eliminated={i < entries.length - eliminated}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};
