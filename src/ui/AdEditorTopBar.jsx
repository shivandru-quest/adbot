import React, { useContext, useState } from "react";
import AllSvgs from "../assets/AllSvgs";
import { importConfig } from "../Config/importConfig";
import { useNavigate } from "react-router-dom";
import DownloadMenu from "./DownloadMenu";
import ShareTemplateMenu from "./ShareTemplateMenu";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
const AdEditorTopBar = ({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  downloadCanvas,
  publishTemplate,
  updateTemplate,
  setDownLoadFormat,
  downloadFormat,
  setSocialMediaPlatform,
  socialMediaPlatForm,
  shareToSocialMedia,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { templateId } = useParams();
  const [showDownLoadMenu, setShowDownloadMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { formData } = location?.state || {};
  const { state, dispatch } = useContext(AppContext);

  function toggleDownloadMenu() {
    setShowShareMenu(false);
    setShowDownloadMenu((prev) => !prev);
  }
  function toggleShareMenu() {
    setShowDownloadMenu(false);
    setShowShareMenu((prev) => !prev);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({
      type: `user/adData`,
      payload: { ...state.adData, [name]: value },
    });
    // setAdData((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  }
  return (
    <div className="relative flex items-center justify-between h-[3.75rem] w-full py-4 px-4 border-b border-[#E2E2E2]">
      <div className="flex items-center justify-center gap-2">
        <button onClick={() => navigate(-1)}>
          <AllSvgs type={"leftArrowIcon"} />
        </button>
        {!isEditing ? (
          <span className="text-[#3E3E3E] text-sm font-[500]">
            {formData?.title ||
              state.adData?.title ||
              "Enter your canvas title"}
          </span>
        ) : (
          <input
            type="title"
            name="title"
            id="title"
            value={formData?.title || state?.adData?.title || ""}
            placeholder="Enter your canvas title"
            className="text-[#3E3E3E] text-sm font-[500] placeholder:text-sm placeholder:font-[400] outline-none w-32 text-ellipsis overflow-hidden whitespace-nowrap"
            onChange={handleChange}
          />
        )}
        <button onClick={() => setIsEditing((prev) => !prev)}>
          <AllSvgs type={"pencilIcon"} />
        </button>
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
        <button
          className="flex items-center gap-1 px-[0.625rem] py-[0.375rem] border border-[#E2E2E2] rounded-md"
          onClick={() => navigate("/settings?tab=pricing")}
        >
          <AllSvgs type={"crownIcon"} />
          <span className="text-[#535353] text-xs font-[500]">Upgrade now</span>
        </button>
        <button
          className="flex items-center gap-1 px-[0.625rem] py-[0.375rem] border border-[#E2E2E2] rounded-md"
          onClick={toggleDownloadMenu}
        >
          <AllSvgs type={"downLoadIcon"} />
          <span className="text-[#535353] text-xs font-[500]">Download</span>
        </button>
        <button
          className="flex items-center gap-1 px-[0.625rem] py-[0.375rem] border border-[#E2E2E2] rounded-md"
          onClick={templateId ? updateTemplate : publishTemplate}
        >
          <AllSvgs type={"saveIcon"} />
          <span className="text-[#535353] text-xs font-[500]">Save</span>
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
        downloadCanvas={downloadCanvas}
        setDownLoadFormat={setDownLoadFormat}
        downloadFormat={downloadFormat}
      />
      <ShareTemplateMenu
        showShareMenu={showShareMenu}
        toggleShareMenu={toggleShareMenu}
        publishTemplate={publishTemplate}
        updateTemplate={updateTemplate}
        setSocialMediaPlatform={setSocialMediaPlatform}
        socialMediaPlatForm={socialMediaPlatForm}
        shareToSocialMedia={shareToSocialMedia}
      />
    </div>
  );
};

export default AdEditorTopBar;
