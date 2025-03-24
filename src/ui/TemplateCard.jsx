import React from "react";

const TemplateCard = ({ imgFile, title, platform, idx }) => {
  return (
    <div
      className="w-[20rem] h-[21rem] rounded-lg p-4 flex flex-col gap-2 cursor-pointer"
      key={idx}
    >
      <div className="w-full h-[13rem] rounded-lg border border-[#E2E2E2]">
        <img
          src={imgFile}
          alt="imgFile"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-[0.25rem]">
        <p className="text-[#181818] text-sm font-[600]">{title}</p>
        <p className="text-[#B0B0B0] text-xs font-[400]">{platform}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
