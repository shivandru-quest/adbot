import React from "react";
import { importConfig } from "../Config/importConfig";
import AllSvgs from "../assets/AllSvgs";
const NoDataYet = ({
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className="w-12 h-12 flex justify-center items-center">
        <img src={importConfig.emptyBoxIcon} alt="emptyBoxIcon" />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-[#181818] text-sm font-[600] mt-[10px]">
          No ads templates made yet
        </h2>
        <p className="text-[#535353] text-xs font-[400]">
          Stand out with professional templates
        </p>
      </div>
      <button
        onClick={onAction}
        className="px-3 py-2 flex items-center justify-center gap-1 rounded-md border border-[#E2E2E2] mt-5"
      >
        <span className="text-[#181818] text-xs font-[600]">
          Explore Templates
        </span>
        <AllSvgs type={"plusIcon"} />
      </button>
    </div>
  );
};

export default NoDataYet;
