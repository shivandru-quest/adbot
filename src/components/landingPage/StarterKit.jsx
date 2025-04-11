import React, { useState } from "react";
import { importConfig } from "../../Config/importConfig";
import LandingPageModal from "./LandingPageModal";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    imgFile: importConfig.dummyTemplate1,
    title: "Super sell 50% off",
    platform: "By Nexa",
  },
  {
    imgFile: importConfig.dummyTemplate2,
    title: "Order now ",
    platform: "By Nexa",
  },
  {
    imgFile: importConfig.dummyTemplate3,
    title: "Best selling",
    platform: "By Nexa",
  },
  {
    imgFile: importConfig.dummyTemplate4,
    title: "Luxury product 50% off",
    platform: "By Nexa",
  },
];
const StarterKit = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }
  return (
    <section
      className="px-4 sm:px-6 md:px-[7.5rem] py-[5rem] h-auto flex flex-col items-center justify-between"
      id="starterKit"
    >
      <div className="flex flex-col items-center w-full gap-4 mb-10">
        <h2 className="text-5xl font-medium tracking-tighter leading-none text-[#181818] max-md:max-w-full max-md:text-4xl">
          Your Ad Starter Kit
        </h2>
        <p className="text-lg tracking-[-0.01125rem] text-[#696969] max-md:max-w-full text-center">
          Pre-built templates designed to kickstart your campaign. Just add your
          brand voice.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        {templates.map((el, i) => (
          <div
            key={i}
            className="p-4 w-[80%] lg:w-[24%] h-auto lg:h-72 flex flex-col cursor-pointer"
            onClick={() => {
              toggleModal();
              setSelectedItem(el);
            }}
          >
            <img src={el.imgFile} alt={el.imgFile} />
            <p className="text-[#181818] text-sm font-[600] mt-[0.58rem]">
              {el.title}
            </p>
            <p className="text-[#B0B0B0] text-xs font-[400] mt-[0.23rem]">
              {el.platform}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full mt-10 flex items-center justify-center">
        <button
          className="px-3 py-2 rounded-md text-[#181818] text-xs font-[600] border border-[#E2E2E2]"
          onClick={() => navigate("/templates")}
        >
          Show more
        </button>
      </div>
      <LandingPageModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        element={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </section>
  );
};

export default StarterKit;
