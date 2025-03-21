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
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:h-[22rem]">
        <div className="rounded-xl border border-[#EAECF0] h-full md:w-[60%] w-full">
          <ReferralSteps />
        </div>
        <div className="w-full md:w-[35%]">
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
