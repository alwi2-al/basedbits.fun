"use client";

import { CheckInButton } from "@/app/lib/components/CheckInButton";
import { DateTime } from "luxon";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckin } from "@/app/lib/hooks/useCheckin";
import { CheckInGoodies } from "@/app/lib/components/CheckInGoodies";
import { useCheckinAbility } from "@/app/lib/hooks/useCheckinAbility";
import { useSocialDisplay } from "@/app/lib/hooks/useSocialDisplay";
import { useRevalidateTags } from "@/app/lib/hooks/useRevalidateTags";
import { useCheckinEligibility } from "@/app/lib/hooks/useCheckinEligibility";

interface Props {
  address: string;
}

export const MyStreak = ({ address }: Props) => {
  const queryClient = useQueryClient();
  const { call: revalidateTags } = useRevalidateTags();

  const { data: isEligible } = useCheckinEligibility({
    address,
    enabled: true,
  });
  const { data: checkIn } = useCheckin({ address, enabled: true });
  const { data: canChecking } = useCheckinAbility({ address, enabled: true });

  const { show } = useSocialDisplay({
    message: "I just checked-in into Based Bits!",
    title: "You are checked-in! Spread the word 🙏",
    url: "https://basedbits.fun",
  });

  const invalidate = () => {
    Promise.all([
      // Server
      revalidateTags([`checkIns-${address}`]), // User checkin data
      revalidateTags(["checkins"]), // Indexed checkins
      // Client
      queryClient.invalidateQueries({ queryKey: ["checkIns", address] }), //User checkin data in hook
      queryClient.invalidateQueries({ queryKey: ["canCheckIn", address] }), // Can checkin hook
      queryClient.invalidateQueries({ queryKey: ["checkins", address] }), // Indexed checkins hook
    ]).finally(() => {
      show();
    });
  };

  if (checkIn) {
    const lastCheckinTime = DateTime.fromMillis(
      Number(checkIn.lastCheckin) * 1000,
    );
    const nextCheckinTime = lastCheckinTime.plus({ days: 1 });

    if (canChecking) {
      return (
        <div className="flex flex-col gap-2 text-[#677467]">
          <CheckInGoodies streak={checkIn.streak} address={address} />
          <CheckInButton onSuccess={invalidate} />
        </div>
      );
    } else {
      const comeBackTime = `${lastCheckinTime.toFormat("t")} on ${nextCheckinTime.toFormat("LLL dd")} `;
      return (
        <div className="flex flex-col text-[#677467]">
          <CheckInGoodies streak={checkIn.streak} address={address} />
          {isEligible ? (
            <div>
              Come back after{" "}
              <span className="font-semibold test-sm">{comeBackTime}</span> to
              protect your streak.
            </div>
          ) : (
            "Mint a Burned Bit and start checking in."
          )}
        </div>
      );
    }
  }
};
