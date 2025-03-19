import React, { useState } from "react";
import AllSvgs from "../assets/AllSvgs";
import { importConfig } from "../Config/importConfig";
import GeneralSelect from "./GeneralSelect";

const platforms = [
  { id: "all", icon: "", label: "All" },
  { id: "instagram", icon: "instagramIcon", label: "Instagram" },
  { id: "facebook", icon: "facebookIcon", label: "Facebook" },
  { id: "reddit", icon: "redditIcon", label: "Reddit" },
  { id: "linkedIn", icon: "linkedInIcon", label: "LinkedIn" },
];
const sizeOptions = [
  { value: "01", label: "01x" },
  { value: "02", label: "02x" },
  { value: "03", label: "03x" },
  { value: "04", label: "04x" },
];
const imgType = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
  { value: "jpeg", label: "JPEG" },
];
const DownloadMenu = ({
  showDownLoadMenu,
  toggleDownloadMenu,
  downloadCanvas,
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selecctedImgType, setSelectedImgType] = useState(null);
  function handleSizeChange(size) {
    setSelectedSize(size);
  }
  function handleImgTypeChange(type) {
    setSelectedImgType(type);
  }
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
            {platforms?.map(
              (el, i) =>
                el.icon && (
                  <button
                    key={i}
                    className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-[500] text-[#181818] border w-fit rounded-md border-[#B0B0B0]"
                  >
                    {el.icon && (
                      <AllSvgs
                        type={el.icon}
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    )}
                  </button>
                )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#696969] text-xs font-[500]">Select size</p>
          <div className="flex items-center gap-1 px-3 py-2 border border-[#B0B0B0] rounded-md">
            <div className="w-4 h-4">
              <AllSvgs
                type={"postIcon"}
                strokeColor={"#535353"}
                iconWidth={16}
                iconHeight={16}
              />
            </div>
            <span className="text-[#535353] text-ellipsis overflow-hidden whitespace-nowrap text-xs font-[500]">
              Post size(1080x1080)
            </span>
          </div>
          <div className="flex items-center gap-1 px-3 py-2 border border-[#B0B0B0] rounded-md">
            <div className="w-4 h-4">
              <AllSvgs
                type={"landscapeIcon"}
                strokeColor={"#535353"}
                iconWidth={16}
                iconHeight={16}
              />
            </div>
            <span className="text-[#535353] text-ellipsis overflow-hidden whitespace-nowrap text-xs font-[500]">
              Landscape size(1200x628)
            </span>
          </div>
          <div className="flex items-center gap-1 px-3 py-2 border border-[#B0B0B0] rounded-md">
            <div className="w-4 h-4">
              <AllSvgs
                type={"storyIcon"}
                fillColor={"#535353"}
                iconWidth={16}
                iconHeight={16}
              />
            </div>
            <span className="text-[#535353] text-ellipsis overflow-hidden whitespace-nowrap text-xs font-[500]">
              Story size(1080x1920)
            </span>
          </div>
          <div className="flex items-center gap-1 px-3 py-2 border border-[#B0B0B0] rounded-md">
            <div className="w-4 h-4">
              <AllSvgs
                type={"verticalIcon"}
                strokeColor={"#535353"}
                iconWidth={16}
                iconHeight={16}
              />
            </div>
            <span className="text-[#535353] text-ellipsis overflow-hidden whitespace-nowrap text-xs font-[500]">
              Vertical size(1080x1350)
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="text-[#696969] text-xs font-[500]">File type</p>
          <div className="w-full flex items-center gap-1 h-8">
            <div className="h-8 w-1/2">
              <GeneralSelect
                onChange={handleSizeChange}
                options={sizeOptions}
                value={selectedSize}
                Placeholder="01x"
                selectHeight="2rem"
              />
            </div>
            <div className="h-8 w-1/2">
              <GeneralSelect
                onChange={handleImgTypeChange}
                options={imgType}
                value={selecctedImgType}
                Placeholder="PNG"
                selectHeight="2rem"
              />
            </div>
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
