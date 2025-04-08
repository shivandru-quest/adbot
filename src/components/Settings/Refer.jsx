import React from "react";
import { ReferralSteps } from "./ReferralSteps";
import { ReferralLink } from "./ReferralLink";
import { InvitedFriendsTable } from "./InvitedFriendsTable";
import { motion } from "framer-motion";

const Refer = () => {
  return (
    <motion.div
      className="flex flex-col gap-8 rounded-[10px] px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="text-[#0D0D0D] text-[2.25rem] leading-[2.75rem] tracking-[-0.045rem] font-[600]">
        Refer Friends
      </p>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:h-[22rem]">
        <div className="rounded-xl border border-[#EAECF0] h-full md:w-[67%] w-full">
          <ReferralSteps />
        </div>
        <div className="w-full md:w-[33%]">
          <ReferralLink />
        </div>
      </div>
      <div>
        <InvitedFriendsTable />
      </div>
    </motion.div>
  );
};

export default Refer;
