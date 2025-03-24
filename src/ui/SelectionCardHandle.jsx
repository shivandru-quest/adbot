import React from "react";
import AllSvgs from "../assets/AllSvgs";

const SelectionCardHandle = ({ setSelectedTemplateId }) => {
  return (
    <div className="w-[25rem] h-[4.5rem] p-4 flex items-center justify-between rounded-xl border border-[#E2E2E2]">
      <div className="flex items-center gap-5">
        <button
          className="p-2 rounded-[3rem] bg-[#E2E2E2] flex items-center justify-center"
          onClick={() => setSelectedTemplateId([])}
        >
          <AllSvgs type={"cancelIcon"} />
        </button>
        <span className="text-[#181818] text-base font-[600]">Selected</span>
      </div>
      <div className="flex justify-center items-center gap-5">
        <button className="flex items-center gap-1 px-3 py-2 border border-[#C9C9C9] rounded-md">
          <AllSvgs type={"deleteIcon"} />{" "}
          <span className="text-sm font-[600] text-[#A60724]">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default SelectionCardHandle;
