import React, { useState } from "react";
import AllSvgs from "../assets/AllSvgs";
import { importConfig } from "../Config/importConfig";
import { useNavigate } from "react-router-dom";
import DownloadMenu from "./DownloadMenu";
import ShareTemplateMenu from "./ShareTemplateMenu";
const AdEditorTopBar = ({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  downloadCanvas,
}) => {
  const navigate = useNavigate();
  const [showDownLoadMenu, setShowDownloadMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  function toggleDownloadMenu() {
    setShowShareMenu((prev) => false);
    setShowDownloadMenu((prev) => !prev);
  }
  function toggleShareMenu() {
    setShowDownloadMenu((prev) => false);
    setShowShareMenu((prev) => !prev);
  }
  return (
    <div className="relative flex items-center justify-between h-[3.75rem] w-full py-4 px-4 border-b border-[#E2E2E2]">
      <div className="flex items-center justify-center gap-2">
        <button onClick={() => navigate(-1)}>
          <AllSvgs type={"leftArrowIcon"} />
        </button>
        <span className="text-[#3E3E3E] text-sm font-[400]">
          Super sell 50% off
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`px-[0.625rem] py-[0.375rem] border border-[#E2E2E2] rounded-md ${
            canUndo ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={onUndo}
          disabled={!canUndo}
        >
          <AllSvgs type={"leftCurveIcon"} />
        </button>
        <button
          className={`px-[0.625rem] py-[0.375rem] border border-[#E2E2E2] rounded-md ${
            canRedo ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={onRedo}
          disabled={!canRedo}
        >
          <AllSvgs type={"rightCurveIcon"} />
        </button>
        <button className="flex items-center gap-1 px-[0.625rem] py-[0.375rem] border border-[#E2E2E2] rounded-md">
          <AllSvgs type={"crownIcon"} />
          <span className="text-[#535353] text-xs font-[500]">Upgrade now</span>
        </button>
        <button
          className="flex items-center gap-1 px-[0.625rem] py-[0.375rem] border border-[#E2E2E2] rounded-md"
          onClick={toggleDownloadMenu}
          // onClick={downloadCanvas}
        >
          <AllSvgs type={"downLoadIcon"} />
          <span className="text-[#535353] text-xs font-[500]">Download</span>
        </button>
        <button
          className="flex items-center h-[1.75rem] w-[4.25rem] border border-[#E2E2E2] rounded-md"
          onClick={toggleShareMenu}
        >
          <img src={importConfig.earthButtonIcon} alt="earthButtonIcon" />
        </button>
      </div>
      <DownloadMenu
        showDownLoadMenu={showDownLoadMenu}
        toggleDownloadMenu={toggleDownloadMenu}
      />
      <ShareTemplateMenu
        showShareMenu={showShareMenu}
        toggleShareMenu={toggleShareMenu}
      />
    </div>
  );
};

export default AdEditorTopBar;
