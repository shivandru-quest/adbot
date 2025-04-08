import React, { useState } from "react";
import AllSvgs from "../assets/AllSvgs";
import EditMenu from "./EditMenu";
import SelectionModal from "./SelectionModal";
import {
  createUrlBackend,
  loadImageAsBase64,
} from "../Config/generalFunctions";
import axios from "axios";
import { Toast } from "@questlabs/react-sdk";
import { useNavigate } from "react-router-dom";

const TemplateCard = ({
  imgFile,
  title,
  platform,
  idx,
  onClick,
  fetchTemplates,
}) => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function toggleSelectionModal() {
    setIsOpen((prev) => !prev);
  }
  function toggleEditMenu() {
    setEditMenu((prev) => !prev);
  }
  async function handleDelete() {
    setIsLoading(true);
    try {
      const payload = {
        isDeleted: true,
      };
      const { url, headers } = createUrlBackend(`delete/${idx}`);
      const res = await axios.patch(url, { payload }, { headers });
      setIsLoading(false);
      await fetchTemplates();
      Toast.success({
        text: "Ad deleted successfully",
      });
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.log("error", error.message);
    }
  }

  async function handleDownloadImage() {
    try {
      const base64Data = await loadImageAsBase64(imgFile);

      if (!base64Data) {
        console.error("Failed to convert image to Base64.");
        return;
      }
      const link = document.createElement("a");
      link.href = base64Data;
      link.download = "downloaded-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  }
  function handleEdit() {
    navigate(`/editor/${idx}`);
  }

  return (
    <div
      className="w-[20rem] h-[21rem] rounded-lg p-4 flex flex-col gap-2 cursor-pointer relative"
      key={idx}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className="w-full h-[13rem] rounded-lg border border-[#E2E2E2]">
        <img
          src={imgFile}
          alt="imgFile"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-[0.25rem]">
          <p className="text-[#181818] text-sm font-[600]">{title}</p>
          <p className="text-[#B0B0B0] text-xs font-[400]">{platform}</p>
        </div>
        {showButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleEditMenu();
            }}
          >
            <AllSvgs type={"threeDotsSvg"} />
          </button>
        )}
      </div>
      <div className="absolute z-10 bottom-[-4rem] right-[-7rem]">
        <EditMenu
          editMenu={editMenu}
          setEditMenu={setEditMenu}
          onEdit={handleEdit}
          // onEdit={toggleSelectionModal}
          onDelete={handleDelete}
          onDownload={handleDownloadImage}
        />
      </div>
      {/* <SelectionModal
        isOpen={isOpen}
        onClose={toggleSelectionModal}
        selectedTemplateId={idx}
      /> */}
    </div>
  );
};

export default TemplateCard;
