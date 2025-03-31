import React, { useState } from "react";
import AllSvgs from "../assets/AllSvgs";
import { useNavigate } from "react-router-dom";

const EditMenu = ({ editMenu, setEditMenu, onEdit, onDownload, onDelete }) => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    editMenu && (
      <div
        className="bg-white shadow-lg w-[9rem] h-[9rem] rounded-xl px-2 py-3 border flex flex-col gap-1"
        onMouseLeave={() => setEditMenu(false)}
      >
        <div
          className="w-full flex items-center justify-start gap-2 cursor-pointer p-2 hover:bg-[#E2E2E2] text-[#535353] hover:text-[#181818] text-sm rounded-md hover:font-[500] font-[400]"
          onMouseEnter={() => setHoveredItem("edit")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit();
          }}
        >
          <AllSvgs
            type={"filledPenIcon"}
            fillColor={hoveredItem === "edit" ? "#181818" : "#808080"}
          />
          <span className="text-sm">Edit</span>
        </div>
        <div
          className="w-full flex items-center justify-start gap-2 cursor-pointer p-2 rounded-md hover:bg-[#E2E2E2] hover:text-[#181818] text-[#535353] hover:font-[500] font-[400]"
          onMouseEnter={() => setHoveredItem("download")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDownload();
          }}
        >
          <AllSvgs
            type={"downLoadIconEditMenu"}
            fillColor={hoveredItem === "download" ? "#181818" : "#808080"}
          />
          <span className="text-sm">Download</span>
        </div>
        <div
          className="w-full flex items-center justify-start gap-2 cursor-pointer p-2 rounded-md hover:bg-[#E2E2E2] hover:text-[#181818] text-[#535353] hover:font-[500] font-[400]"
          onMouseEnter={() => setHoveredItem("delete")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <AllSvgs
            type={"deleteIcon"}
            fillColor={hoveredItem === "delete" ? "#181818" : "#808080"}
          />
          <span className="text-sm">Delete</span>
        </div>
      </div>
    )
  );
};

export default EditMenu;
