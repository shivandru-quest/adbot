import React, { useState, useEffect } from "react";
import { importConfig } from "../../Config/importConfig";
import AllSvgs from "../../assets/AllSvgs";
import { useNavigate } from "react-router-dom";
import NoDataYet from "../../ui/NoDataYet";
import LoginSuccessModal from "../Auth/LoginSuccessModal";
const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal((prev) => !prev);
    localStorage.setItem("counter", "1");
  }
  useEffect(() => {
    const counter = localStorage.getItem("counter");
    if (!counter) {
      setShowModal(true);
    }
  }, []);
  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      <div
        className="h-[21rem] w-full rounded-lg flex items-center justify-start pl-20"
        style={{
          backgroundImage: `url('${importConfig.homeBannerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <p className="text-[#FAFAFA] text-[3rem] font-[900] leading-[3.5rem] tracking-[-0.06rem]">
            Hi, I’m Nexa 👋🏼
          </p>
          <p className="text-[#fff] text-[2rem] font-[500] leading-[3.5rem] tracking-[-0.04rem]">
            Let’s Scale Your Ads Smarter, Faster, Better!
          </p>
          <button
            className="text-[#181818] text-xs font-[600] px-3 py-2 bg-[#FAFAFA] flex items-center justify-center gap-2 rounded-md"
            onClick={() => navigate("/editor/new")}
          >
            Create now
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[#0D0D0D] text-ellipsis overflow-hidden whitespace-nowrap text-[1.125rem] leading-[1.75rem] tracking-[-0.01125rem] font-[600]">
          More ways to start
        </p>
        <AllSvgs type={"rightLightIcon"} />
      </div>
      <div className="w-full flex items-center justify-between gap-4 h-[4.5rem]">
        <div className="w-[12.5rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer">
          <AllSvgs type={"customIcon"} />
          <p className="text-[#181818] text-base font-[600]">Custom</p>
        </div>
        <div className="w-[12.5rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer">
          <AllSvgs type={"postIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Post</p>
            <p className="text-[#535353] text-xs font-[400]">(1080x1080)</p>
          </div>
        </div>
        <div className="w-[12.5rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer">
          <AllSvgs type={"landscapeIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Landscape</p>
            <p className="text-[#535353] text-xs font-[400]">(1200x628)</p>
          </div>
        </div>
        <div className="w-[12.5rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer">
          <AllSvgs type={"storyIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Story</p>
            <p className="text-[#535353] text-xs font-[400]">(1080x1920)</p>
          </div>
        </div>
        <div className="w-[12.5rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer">
          <AllSvgs type={"verticalIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Vertical</p>
            <p className="text-[#535353] text-xs font-[400]">(1080x1350)</p>
          </div>
        </div>
        <div className="w-[12.5rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer">
          <AllSvgs type={"pinIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Pin</p>
            <p className="text-[#535353] text-xs font-[400]">(1000x1500)</p>
          </div>
        </div>
      </div>
      <div className="py-4 px-6 flex flex-col gap-4 bg-[#FAFAFA] rounded-[1rem] h-[23rem] w-full">
        <div className="w-full flex items-center justify-between">
          <p className="text-[#0D0D0D] text-[1.125rem] font-[600] leading-[1.75rem] tracking-[-0.01125rem] text-ellipsis overflow-hidden whitespace-nowrap">
            Recent files
          </p>
          <AllSvgs type={"rightLightIcon"} />
        </div>
        <NoDataYet onAction={() => navigate("/templates")} />
      </div>
      <div className="py-4 px-6 flex flex-col gap-4 bg-[#FAFAFA] rounded-[1rem] h-[23rem] w-full">
        <div className="w-full flex items-center justify-between">
          <p className="text-[#0D0D0D] text-[1.125rem] font-[600] leading-[1.75rem] tracking-[-0.01125rem] text-ellipsis overflow-hidden whitespace-nowrap">
            Browse templates
          </p>
          <AllSvgs type={"rightLightIcon"} />
        </div>
        <NoDataYet onAction={() => navigate("/templates")} />
        <LoginSuccessModal isOpen={showModal} onClick={toggleModal} />
      </div>
    </div>
  );
};

export default Home;
