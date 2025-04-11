import React, { useState } from "react";
import AllSvgs from "../../assets/AllSvgs";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const HeroInput = () => {
  const navigate = useNavigate();
  const [fileData, setFileData] = useState([]);
  function handleButtonClick(e) {
    document.getElementById("file-upload").click();
  }
  function handleFiles(files) {
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

        setFileData((prev) => [...prev, newImage]);
      };
    });
  }
  const removeImage = (index) => {
    setFileData((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div
      className="w-[90%] lg:w-1/2 md:w-[80%] h-auto min-h-[10rem] border border-[#535353] rounded-[1.5rem] mt-7 p-4 flex flex-col gap-1 justify-between"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0px 0px 0px 7.757px rgba(255, 255, 255, 0.03) inset",
      }}
    >
      {fileData.length > 0 && (
        <div className="w-full flex items-center justify-start gap-4">
          {fileData.length > 0 &&
            fileData?.map((el, i) => (
              <div
                className="flex items-center gap-[0.62rem] bg-[#E2E2E2] rounded-md p-2 relative"
                key={i}
              >
                <div className="rounded-md bg-[#2C2C2C] flex items-center p-[0.38rem]">
                  <AllSvgs type={"fileIcon"} />
                </div>
                <span className="text-[#545454] text-sm font-[500]">
                  {el.name}
                </span>
                <button
                  className="absolute right-[-0.5rem] top-[-0.5rem] rounded-full bg-white"
                  onClick={() => removeImage(i)}
                >
                  <AllSvgs type={"cancelIcon"} />
                </button>
              </div>
            ))}
        </div>
      )}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        id="file-upload"
      />
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="Describe your product to create  ads ..."
          className="bg-transparent outline-none w-full text-white text-sm font-[500] placeholder:text-[#979797] text-ellipsis overflow-hidden whitespace-nowrap"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <button
          className="w-[1.8rem] h-[1.8rem] rounded-full flex items-center justify-center p-[0.38rem]"
          style={{ background: "rgba(255, 255, 255, 0.5)" }}
          onClick={handleButtonClick}
        >
          <AllSvgs type={"attachFile"} />
        </button>

        <button
          className="flex items-center gap-2 px-3 py-2 border border-[#E2E2E2] rounded-md bg-white text-[#181818] text-xs font-[500]"
          onClick={() => navigate("/editor/new")}
        >
          <span>Generate</span>
          <AllSvgs type={"magicWand"} />
        </button>
      </div>
    </div>
  );
};

export default HeroInput;
