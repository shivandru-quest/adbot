import React, { useState } from "react";
import AllSvgs from "../assets/AllSvgs";
import ReactSelect from "./ReactSelect";
import { importConfig } from "../Config/importConfig";

const platforms = [
  { id: "all", icon: "", label: "All" },
  { id: "instagram", icon: "instagramIcon", label: "Instagram" },
  { id: "facebook", icon: "facebookIcon", label: "Facebook" },
  { id: "reddit", icon: "redditIcon", label: "Reddit" },
  { id: "linkedIn", icon: "linkedInIcon", label: "LinkedIn" },
];

const DownloadMenu = ({
  showDownLoadMenu,
  toggleDownloadMenu,
  downloadCanvas,
}) => {
  return (
    showDownLoadMenu && (
      <div className="absolute z-10 top-14 right-9 bg-white shadow-lg w-[17rem] h-auto rounded-xl p-5 border flex flex-col gap-4">
        <div className="relative w-full flex justify-center items-center">
          <span className="text-[#535353] text-xl font-[600] tracking-[-0.01125rem]">
            Download
          </span>
          <button
            className="absolute top-0 right-0"
            onClick={toggleDownloadMenu}
          >
            <AllSvgs type={"cancelIcon"} />
          </button>
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="text-[#696969] text-xs font-[500]">Social media type</p>
          <div className="w-full flex flex-wrap items-center gap-1">
            {platforms?.map((el, i) => (
              <button
                key={i}
                className="flex items-center justify-center gap-2 p-2 text-xs font-[500] text-[#181818] border w-fit rounded-md border-[#B0B0B0]"
              >
                {el.icon && (
                  <AllSvgs
                    type={el.icon}
                    style={{ width: "1rem", height: "1rem" }}
                  />
                )}
                <span>{el.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="text-[#696969] text-xs font-[500]">File type</p>
          <div className="w-full flex items-center gap-1">
            <select
              name="imageSize"
              id="imageSize"
              className="w-1/2 px-3 py-2 border border-[#B0B0B0] rounded-md h-8 text-[#181818] text-xs font-[500] outline-none cursor-pointer"
            >
              <option value="01">01x</option>
              <option value="02">02x</option>
              <option value="03">03x</option>
              <option value="04">04x</option>
            </select>
            <select
              name="fileType"
              id="fileType"
              className="w-1/2 px-3 py-2 border border-[#B0B0B0] rounded-md h-8 text-[#181818] text-xs font-[500] outline-none cursor-pointer"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
        </div>
        <div className="w-full flex items-center gap-2">
          <input
            type="checkbox"
            name="saveDownload"
            id="saveDownload"
            className="cursor-pointer"
          />
          <label
            htmlFor="saveDownload"
            className="text-[#2C2C2C] text-xs font-[500]"
          >
            Save download settings
          </label>
        </div>
        <div className="w-full flex items-center justify-center">
          <button className="w-full" onClick={downloadCanvas}>
            <img src={importConfig.downloadButton} alt="downloadButton" />
          </button>
        </div>
      </div>
    )
  );
};

export default DownloadMenu;
