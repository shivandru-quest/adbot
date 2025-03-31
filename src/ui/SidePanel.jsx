import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AllSvgs from "../assets/AllSvgs";
import { HexColorPicker } from "react-colorful";
import { FiHexagon, FiStar, FiOctagon } from "react-icons/fi";
import { LiaRingSolid } from "react-icons/lia";

const SidePanel = ({
  toolbarSelectedElement,
  onAddShape,
  setElements,
  setHistory,
  selectedElement,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newImage = {
          elementId: `ele-${uuidv4()}`,
          name: file.name,
          url: URL.createObjectURL(file),
          src: reader.result,
          type: "image",
          width: 200,
          height: 200,
          x: 100,
          y: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        };

        setSelectedImages((prev) => [...prev, newImage]);
      };
    });
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleButtonClick = (e) => {
    document.getElementById("file-upload").click();
  };
  function handleAddElements() {
    setElements((els) => [...els, ...selectedImages]);
    setHistory((history) => [...history, ...selectedImages]);
    setSelectedImages([]);
  }
  return (
    <div className="w-80 flex flex-col bg-[#FAFAFA] rounded overflow-y-auto h-[calc(100vh-6rem)]">
      <div className="px-4 py-[1.13rem] text-[#181818] text-base font-[600]">
        {toolbarSelectedElement === "media"
          ? "Media"
          : toolbarSelectedElement === "elements"
          ? "Elements"
          : "Theme"}
      </div>
      {toolbarSelectedElement === "media" ? (
        <div className="w-full h-full flex flex-col items-start justify-between p-4">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full h-56 border border-dashed rounded-[0.625rem] border-[#E0E0E0] flex flex-col items-center justify-center gap-3">
              <div
                className="rounded-full bg-[#E2E2E2] p-3 flex items-center justify-center cursor-pointer"
                onClick={handleButtonClick}
              >
                <AllSvgs type={"uploadIcon"} />
              </div>
              <p className="text-[#2C2C2C] font-[500] text-sm">add Images</p>
            </div>
            <div className="w-full grid grid-cols-3 gap-x-2 gap-y-4">
              {selectedImages?.map((el, i) => (
                <div key={i} className="relative rounded-md w-20 h-20 p-2">
                  <img
                    src={el.url}
                    alt={`Upload ${i + 1}`}
                    className="w-full object-cover rounded-md"
                  />
                  {/* <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ❌
                </button> */}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              className="w-full px-3 py-2 rounded-md border border-[#535353] flex justify-center items-center text-sm font-[600] text-[#535353]"
              onClick={handleAddElements}
            >
              Upload
            </button>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
          </div>
        </div>
      ) : toolbarSelectedElement === "elements" ? (
        <div className="w-full h-full flex flex-col items-start justify-between p-4">
          <div className="w-full grid grid-cols-3 gap-x-2 gap-y-4">
            <div
              className="h-20 w-20 p-2 rounded-md border border-[#E2E2E2] flex items-center justify-center cursor-pointer"
              onClick={() => onAddShape("rectangle")}
            >
              <AllSvgs type={"squareIcon"} />
            </div>
            <div
              className="h-20 w-20 p-2 rounded-md border border-[#E2E2E2] flex items-center justify-center cursor-pointer"
              onClick={() => onAddShape("circle")}
            >
              <AllSvgs type={"circleIcon"} />
            </div>
            <div
              className="h-20 w-20 p-2 rounded-md border border-[#E2E2E2] flex items-center justify-center cursor-pointer"
              onClick={() => onAddShape("pentagon")}
            >
              <AllSvgs type={"polygonIcon"} />
            </div>
            {/* <div
              className="h-20 w-20 p-2 rounded-md border border-[#E2E2E2] flex items-center justify-center cursor-pointer"
              onClick={() => onAddShape("line")}
            >
              <AllSvgs type={"randomShape"} />
            </div> */}
            <div
              className="h-20 w-20 p-2 rounded-md border border-[#E2E2E2] flex items-center justify-center cursor-pointer"
              onClick={() => onAddShape("hexagon")}
            >
              <FiHexagon
                style={{ height: "2rem", width: "2rem", color: "#696969" }}
              />
            </div>
            <div
              className="h-20 w-20 p-2 rounded-md border border-[#E2E2E2] flex items-center justify-center cursor-pointer"
              onClick={() => onAddShape("star")}
            >
              <FiStar
                style={{ height: "2rem", width: "2rem", color: "#696969" }}
              />
            </div>
            <div
              className="h-20 w-20 p-2 rounded-md border border-[#E2E2E2] flex items-center justify-center cursor-pointer"
              onClick={() => onAddShape("octagon")}
            >
              <FiOctagon
                style={{ height: "2rem", width: "2rem", color: "#696969" }}
              />
            </div>
            <div
              className="h-20 w-20 p-2 rounded-md border border-[#E2E2E2] flex items-center justify-center cursor-pointer"
              onClick={() => onAddShape("ring")}
            >
              <LiaRingSolid
                style={{ height: "2rem", width: "2rem", color: "#696969" }}
              />
            </div>
          </div>
        </div>
      ) : (
        toolbarSelectedElement === "theme" && (
          <div className="w-full h-full flex flex-col items-start gap-5 p-4">
            <div className="w-full flex flex-col gap-2">
              <span className="text-[#181818] text-sm font-[500]">
                Border radius
              </span>
              <div className="w-full flex items-center justify-between gap-4">
                <button className="px-3 py-2 rounded-md border border-[#B0B0B0] flex items-center justify-center text-[#535353] text-sm font-[500] w-[3.45rem]">
                  4
                </button>
                <button className="px-3 py-2 rounded-md border border-[#B0B0B0] flex items-center justify-center text-[#535353] text-sm font-[500] w-[3.45rem]">
                  8
                </button>
                <button className="px-3 py-2 rounded-md border border-[#B0B0B0] flex items-center justify-center text-[#535353] text-sm font-[500] w-[3.45rem]">
                  12
                </button>
                <button className="px-3 py-2 rounded-md border border-[#B0B0B0] flex items-center justify-center text-[#535353] text-sm font-[500] w-[3.45rem]">
                  16
                </button>
              </div>
            </div>
            <div className="w-full flex items-center gap-5">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="overlayColor"
                  className="text-[#535353] text-xs font-[500] block"
                >
                  Overlay color
                </label>
                <input
                  type="text"
                  name="overlayColor"
                  id="overlayColor"
                  placeholder="Enter Hex code"
                  className="px-3 py-2 rounded-md border border-[#979797] text-[#535353] text-ellipsis overflow-hidden whitespace-nowrap font-[500] text-sm placeholder:text-[#696969] placeholder:text-sm placeholder:font-[400] h-9 w-28 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="opacity"
                  className="text-[#535353] text-xs font-[500] block"
                >
                  Opacity
                </label>
                <input
                  type="text"
                  name="opacity"
                  id="opacity"
                  placeholder="For eg. 20%"
                  className="px-3 py-2 rounded-md border border-[#979797] text-[#535353] text-ellipsis overflow-hidden whitespace-nowrap font-[500] text-sm placeholder:text-[#696969] placeholder:text-sm placeholder:font-[400] h-9 w-28 outline-none"
                />
              </div>
            </div>
            <div>
              <span className="text-[#181818] text-sm font-[500]">Color</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SidePanel;
