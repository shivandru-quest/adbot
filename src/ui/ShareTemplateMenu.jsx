import React from "react";
import AllSvgs from "../assets/AllSvgs";
import { importConfig } from "../Config/importConfig";


const ShareTemplateMenu = ({
  showShareMenu,
  toggleShareMenu,
  publishTemplate,
  updateTemplate,
  setSocialMediaPlatform,
  socialMediaPlatForm,
  shareToSocialMedia,
}) => {
  
  return (
    showShareMenu && (
      <div className="absolute z-10 top-14 right-9 bg-white shadow-lg w-[21rem] h-auto rounded-xl p-5 border flex flex-col gap-4">
        <div className="relative w-full flex justify-center items-center">
          <span className="text-[#535353] text-xl font-[600] tracking-[-0.01125rem]">
            Ready to Share Your Ad?
          </span>
          <button className="absolute top-0 right-0" onClick={toggleShareMenu}>
            <AllSvgs type={"cancelIcon"} />
          </button>
        </div>
        <div
          className="w-full flex items-center justify-center cursor-pointer"
          onClick={shareToSocialMedia}
        >
          <button className="w-full">
            <img src={importConfig.shareNowButton} alt="shareNowButton" />
          </button>
        </div>
        <div className="w-full flex items-center justify-center gap-2">
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#E2E2E2] ${
              socialMediaPlatForm === "instagram"
                ? "border-2 border-[#181818]"
                : ""
            }`}
            onClick={() => setSocialMediaPlatform("instagram")}
          >
            <AllSvgs
              type={"instagramIcon"}
              fillColor={socialMediaPlatForm === "instagram" ? "#181818" : ""}
            />
          </button>
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#E2E2E2] ${
              socialMediaPlatForm === "facebook"
                ? "border-2 border-[#181818]"
                : ""
            }`}
            onClick={() => setSocialMediaPlatform("facebook")}
          >
            <AllSvgs
              type={"facebookIcon"}
              fillColor={socialMediaPlatForm === "facebook" ? "#181818" : ""}
            />
          </button>
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#E2E2E2] ${
              socialMediaPlatForm === "reddit"
                ? "border-2 border-[#181818]"
                : ""
            }`}
            onClick={() => setSocialMediaPlatform("reddit")}
          >
            <AllSvgs
              type={"redditIcon"}
              fillColor={socialMediaPlatForm === "reddit" ? "#181818" : ""}
            />
          </button>
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#E2E2E2] ${
              socialMediaPlatForm === "linkedIn"
                ? "border-2 border-[#181818]"
                : ""
            }`}
            onClick={() => setSocialMediaPlatform("linkedIn")}
          >
            <AllSvgs
              type={"linkedInIcon"}
              fillColor={socialMediaPlatForm === "linkedIn" ? "#181818" : ""}
            />
          </button>
        </div>
      </div>
    )
  );
};

export default ShareTemplateMenu;
