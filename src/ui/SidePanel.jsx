import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AllSvgs from "../assets/AllSvgs";
import { FiHexagon, FiStar, FiOctagon } from "react-icons/fi";
import { LiaRingSolid } from "react-icons/lia";
import axios from "axios";
import {
  base64ToFile,
  blobUrlToFile,
  compressFileForTemplatePoster,
  createUrl,
  createUrlBackend,
} from "../Config/generalFunctions";
import ChatSection from "./ChatSection";
import MediaSection from "./MediaSection";

const SidePanel = ({
  toolbarSelectedElement,
  onAddShape,
  setElements,
  setHistory,
  selectedElement,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [mediaType, setMediaType] = useState("image");
  const [mediaData, setMediaData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newImage = {
          name: file.name,
          url: URL.createObjectURL(file),
          src: reader.result,
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
  function handleAddElements(media) {
    const img = new window.Image();
    img.src = media.url;
    img.onload = () => {
      const newImage = {
        elementId: `ele-${uuidv4()}`,
        type: "image",
        name: media.mediaId,
        src: media.url,
        url: media.url,
        width: img.width > 200 ? 200 : img.width,
        height: img.height > 200 ? 200 : img.height,
        x: 100,
        y: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      };
      setElements((els) => [...els, newImage]);
      setHistory((history) => [...history, newImage]);
    };
  }
  async function handleImageUpload() {
    setIsUploading(true);
    setProgress(0);
    const totalFiles = selectedImages?.length;
    const progressMap = Array(totalFiles).fill(0);
    try {
      const uploadImages = await Promise.all(
        selectedImages?.map(async (el, index) => {
          let file;
          if (el.src?.startsWith("data:image")) {
            file = base64ToFile(el.src, el.name);
          } else if (el.url?.startsWith("blob:")) {
            file = await blobUrlToFile(el.url, el.name);
          }
          const compressedArrayBuffer = await compressFileForTemplatePoster(
            file
          );
          const compressedFile = new Blob([compressedArrayBuffer], {
            type: "image/png",
          });
          const formImgData = new FormData();
          formImgData.append("uploaded_file", compressedFile);
          const req = createUrl("api/upload-img");
          const res = await axios.post(req.url, formImgData, {
            headers: req.headers,
            onUploadProgress: (event) => {
              const percent = Math.round((event.loaded * 100) / event.total);
              progressMap[index] = percent;
              const avgProgress = Math.round(
                progressMap.reduce((a, b) => a + b, 0) / totalFiles
              );
              setProgress(avgProgress);
            },
          });
          return res.data.imageUrl;
        })
      );
      let reqData = createUrlBackend("media");
      await Promise.all(
        uploadImages?.map(async (el) => {
          const payload = {
            url: el,
          };
          await axios.post(reqData.url, payload, { headers: reqData.headers });
        })
      );
      setProgress(100);
      setIsUploading(false);
      setSelectedImages([]);
    } catch (error) {
      setIsUploading(false);
      console.log("error", error);
    }
  }

  async function fetchMedia() {
    try {
      const { url, headers } = createUrlBackend("media");
      const res = await axios.get(url, { headers });
      setMediaData(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchMedia();
  }, [mediaType]);

  return (
    !selectedElement && (
      <div
        className={`${
          toolbarSelectedElement === "chat" ? "w-[30rem]" : "w-[20rem]"
        } flex flex-col bg-[#FAFAFA] rounded-[1rem] overflow-y-auto h-[calc(100vh-6rem)] border border-[#E2E2E2]`}
      >
        <div className="px-4 py-[1.13rem] text-[#181818] text-base font-[600]">
          {toolbarSelectedElement === "media"
            ? "Media"
            : toolbarSelectedElement === "elements"
            ? "Elements"
            : toolbarSelectedElement === "chat" && ""}
        </div>
        {toolbarSelectedElement === "media" ? (
          <div>
            <MediaSection
              handleButtonClick={handleButtonClick}
              selectedImages={selectedImages}
              removeImage={removeImage}
              handleImageUpload={handleImageUpload}
              handleFiles={handleFiles}
              handleAddElements={handleAddElements}
              mediaData={mediaData}
              mediaType={mediaType}
              setMediaType={setMediaType}
              isUploading={isUploading}
              progress={progress}
            />
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
        ) : toolbarSelectedElement === "chat" ? (
          <div className="w-full overflow-x-hidden h-full">
            <ChatSection />
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
    )
  );
};

export default SidePanel;
