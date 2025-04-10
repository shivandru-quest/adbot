import React from "react";
import AllSvgs from "../assets/AllSvgs";
import CircularProgress from "./CircularProgress";

const MediaSection = ({
  handleButtonClick,
  selectedImages,
  removeImage,
  handleImageUpload,
  handleFiles,
  handleAddElements,
  mediaData,
  mediaType,
  setMediaType,
  isUploading,
  progress,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start p-4">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full h-10 flex items-center justify-between px-4 bg-white rounded-md">
          <button
            className={`text-[#535353] h-full text-base font-[600] w-[47%] ${
              mediaType === "image" ? "border-b border-[#A558FF]" : ""
            }`}
            onClick={() => setMediaType("image")}
          >
            Image
          </button>
          <button
            className={`text-[#535353] h-full text-base font-[600] w-[47%] ${
              mediaType === "assets" ? "border-b border-[#A558FF]" : ""
            }`}
            onClick={() => setMediaType("assets")}
          >
            Graphics
          </button>
        </div>
        {mediaType === "image" && (
          <div className="w-full h-56 border border-dashed rounded-[0.625rem] border-[#E0E0E0] flex flex-col items-center justify-center">
            {!isUploading && (
              <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                <div
                  className="rounded-full bg-[#E2E2E2] p-3 flex items-center justify-center cursor-pointer"
                  onClick={handleButtonClick}
                >
                  <AllSvgs type={"uploadIcon"} />
                </div>
                <p className="text-[#2C2C2C] font-[500] text-sm">Add Images</p>
              </div>
            )}
            {isUploading && <CircularProgress progress={progress} />}
          </div>
        )}

        {mediaType === "image" && (
          <div className="w-full h-52 grid grid-cols-3 gap-x-2 gap-y-4">
            {selectedImages?.map((el, i) => (
              <div key={i} className="relative rounded-md w-20 h-20">
                <img
                  src={el.url}
                  alt={`Upload ${i + 1}`}
                  className="w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-0 right-0 p-1 text-white rounded-full text-[0.5rem] bg-gray-400"
                >
                  <AllSvgs type={"cancelIcon"} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {mediaType === "image" && (
        <div className="w-full flex items-center justify-center">
          <button
            className="w-full px-3 py-2 rounded-md border border-[#535353] flex justify-center items-center text-sm font-[600] text-[#535353]"
            onClick={handleImageUpload}
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
      )}
      {mediaType === "assets" && (
        <div className="w-full h-auto mt-8 grid grid-cols-3 gap-x-2 gap-y-4 items-center overflow-y-auto">
          {mediaData?.map((el, i) => (
            <div
              key={i}
              className="relative rounded-md w-20 h-20 cursor-pointer"
              onClick={() => handleAddElements(el)}
            >
              <img
                src={el.url}
                alt={`Upload ${i + 1}`}
                className="w-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaSection;
