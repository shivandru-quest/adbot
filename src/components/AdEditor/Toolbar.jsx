import React, { useEffect } from "react";
import AllSvgs from "../../assets/AllSvgs";
import { useSearchParams } from "react-router-dom";

const Toolbar = ({
  onAddText,
  toolbarSelectedElement,
  handleToolBarClick
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (toolbarSelectedElement === "text") {
      onAddText();
    }
  }, [toolbarSelectedElement]);

  return (
    <div className="w-[6.5rem] min-w-[6.5rem] max-w-[6.5rem] p-3 flex flex-col items-center h-[calc(100vh-120px)] space-y-4 gap-1">
      <div
        className={`w-full flex flex-col items-center justify-center cursor-pointer py-2 ${
          toolbarSelectedElement === "text" ? "rounded-md bg-[#E2E2E2]" : ""
        }`}
        onClick={() => handleToolBarClick("text")}
      >
        <div className="w-full p-2 flex justify-center">
          <AllSvgs
            type={"textIcon"}
            fillColor={
              toolbarSelectedElement === "text" ? "#181818" : "#535353"
            }
          />
        </div>
        <span
          className={`${
            toolbarSelectedElement === "text"
              ? "text-[#181818] font-[600]"
              : "text-[#535353] font-[500]"
          } text-sm `}
        >
          Text
        </span>
      </div>
      <div
        className={`w-full flex flex-col items-center justify-center cursor-pointer py-2 ${
          toolbarSelectedElement === "chat" ? "rounded-md bg-[#E2E2E2]" : ""
        }`}
        onClick={() => handleToolBarClick("chat")}
      >
        <div className="w-full p-2 flex justify-center">
          <AllSvgs
            type={"messageIcon"}
            fillColor={
              toolbarSelectedElement === "chat" ? "#181818" : "#535353"
            }
          />
        </div>
        <span
          className={`${
            toolbarSelectedElement === "chat"
              ? "text-[#181818] font-[600]"
              : "text-[#535353] font-[500]"
          } text-sm `}
        >
          Chat
        </span>
      </div>
      <div
        className={`w-full flex flex-col items-center justify-center cursor-pointer py-2 ${
          toolbarSelectedElement === "media" ? "rounded-md bg-[#E2E2E2]" : ""
        }`}
        onClick={() => handleToolBarClick("media")}
      >
        <div className="w-full p-2 flex justify-center">
          <AllSvgs
            type={"mediaIcon"}
            fillColor={
              toolbarSelectedElement === "media" ? "#181818" : "#535353"
            }
          />
        </div>
        <span
          className={`${
            toolbarSelectedElement === "media"
              ? "text-[#181818] font-[600]"
              : "text-[#535353] font-[500]"
          } text-sm `}
        >
          Media
        </span>
      </div>
      <div
        className={`w-full flex flex-col items-center justify-center cursor-pointer py-2 ${
          toolbarSelectedElement === "elements" ? "rounded-md bg-[#E2E2E2]" : ""
        }`}
        onClick={() => handleToolBarClick("elements")}
      >
        <div className="w-full p-2 flex justify-center">
          <AllSvgs
            type={"elementsIcon"}
            fillColor={
              toolbarSelectedElement === "elements" ? "#181818" : "#535353"
            }
          />
        </div>
        <span
          className={`${
            toolbarSelectedElement === "elements"
              ? "text-[#181818] font-[600]"
              : "text-[#535353] font-[500]"
          } text-sm `}
        >
          Elements
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
