import React from "react";
import AllSvgs from "../../assets/AllSvgs";

const Pills = ({ icon, text }) => {
  return (
    <div
      className="p-3 flex items-center justify-between gap-[0.62rem] rounded-lg cursor-pointer"
      style={{
        border: "0.5px solid rgba(255, 255, 255, 0.20)",
        background: "rgba(255, 255, 255, 0.00)",
      }}
    >
      <div>
        <AllSvgs type={icon} />
      </div>
      <span className="text-[#808080] text-xs font-[400]">{text}</span>
    </div>
  );
};

export default Pills;
