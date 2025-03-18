import React from "react";
import { ReferralSteps } from "./ReferralSteps";
import { ReferralLink } from "./ReferralLink";
import { InvitedFriendsTable } from "./InvitedFriendsTable";

const Refer = () => {
  return (
    <div className="flex flex-col gap-8 rounded-[10px] px-8">
      <p className="text-[#0D0D0D] text-[2.25rem] leading-[2.75rem] tracking-[-0.045rem] font-[600]">
        Refer Friends
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-xl border border-[#EAECF0] h-[20.5rem]">
          <ReferralSteps />
        </div>
        <div>
          <ReferralLink />
        </div>
      </div>
      <div>
        <InvitedFriendsTable />
      </div>
    </div>
  );
};

export default Refer;
