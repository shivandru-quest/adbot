import React, { useState, useEffect, useContext } from "react";
import { importConfig } from "../../Config/importConfig";
import AllSvgs from "../../assets/AllSvgs";
import { useNavigate } from "react-router-dom";
import NoDataYet from "../../ui/NoDataYet";
import LoginSuccessModal from "../Auth/LoginSuccessModal";
import { createUrlBackend } from "../../Config/generalFunctions";
import axios from "axios";
import TemplateCard from "../../ui/TemplateCard";
import Loader from "../../ui/Loader";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
export const templates = [
  {
    imgFile: importConfig.dummyTemplate1,
    title: "Template 1",
    platform: "Instagram",
  },
  {
    imgFile: importConfig.dummyTemplate2,
    title: "Template 2",
    platform: "facebook",
  },
  {
    imgFile: importConfig.dummyTemplate3,
    title: "Template 3",
    platform: "Linkedin",
  },
  {
    imgFile: importConfig.dummyTemplate4,
    title: "Template 4",
    platform: "Reddit",
  },
];
const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userTemplates, setUserTemplates] = useState([]);
  const { state, dispatch } = useContext(AppContext);
  const { canvasSize } = state;

  function toggleModal() {
    setShowModal((prev) => !prev);
    localStorage.setItem("counter", "1");
  }
  useEffect(() => {
    const counter = localStorage.getItem("counter")?.trim();
    if (!counter) {
      setShowModal(true);
    }
  }, []);
  async function fetchTemplates() {
    setIsLoading(true);
    try {
      const { url, headers } = createUrlBackend("template");
      const res = await axios.get(url, { headers });
      setUserTemplates(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error.message);
    }
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <motion.div
      className="w-full flex flex-col gap-6 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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
        <div
          className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
          onClick={() => {
            dispatch({
              type: "user/canvasSize",
              payload: { width: "650", height: "300", name: "custom" },
            });
            navigate("/editor/new");
          }}
        >
          <AllSvgs type={"customIcon"} />
          <p className="text-[#181818] text-base font-[600]">Custom</p>
        </div>
        <div
          className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
          onClick={() => {
            dispatch({
              type: "user/canvasSize",
              payload: { width: "540", height: "540", name: "post" },
            });
            navigate("/editor/new");
          }}
        >
          <AllSvgs type={"postIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Post</p>
            <p className="text-[#535353] text-xs font-[400]">(1080x1080)</p>
          </div>
        </div>
        <div
          className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
          onClick={() => {
            dispatch({
              type: "user/canvasSize",
              payload: { width: "650", height: "340", name: "landscape" },
            });
            navigate("/editor/new");
          }}
        >
          <AllSvgs type={"landscapeIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Landscape</p>
            <p className="text-[#535353] text-xs font-[400]">(1200x628)</p>
          </div>
        </div>
        <div
          className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
          onClick={() => {
            dispatch({
              type: "user/canvasSize",
              payload: { width: "400", height: "710", name: "story" },
            });
            navigate("/editor/new");
          }}
        >
          <AllSvgs type={"storyIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Story</p>
            <p className="text-[#535353] text-xs font-[400]">(1080x1920)</p>
          </div>
        </div>
        <div
          className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
          onClick={() => {
            dispatch({
              type: "user/canvasSize",
              payload: { width: "500", height: "625", name: "vertical" },
            });
            navigate("/editor/new");
          }}
        >
          <AllSvgs type={"verticalIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Vertical</p>
            <p className="text-[#535353] text-xs font-[400]">(1080x1350)</p>
          </div>
        </div>
        <div
          className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
          onClick={() => {
            dispatch({
              type: "user/canvasSize",
              payload: { width: "433", height: "650", name: "pin" },
            });
            navigate("/editor/new");
          }}
        >
          <AllSvgs type={"pinIcon"} />
          <div>
            <p className="text-[#181818] text-base font-[600]">Pin</p>
            <p className="text-[#535353] text-xs font-[400]">(1000x1500)</p>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
      <div className="py-4 px-6 flex flex-col gap-4 bg-[#FAFAFA] rounded-[1rem] h-[23rem] w-full">
        <div className="w-full flex items-center justify-between">
          <p className="text-[#0D0D0D] text-[1.125rem] font-[600] leading-[1.75rem] tracking-[-0.01125rem] text-ellipsis overflow-hidden whitespace-nowrap">
            Recent files
          </p>
          <button onClick={() => navigate("/myfiles?tab=favourite")}>
            <AllSvgs type={"rightLightIcon"} />
          </button>
        </div>
        {!isLoading && userTemplates?.length === 0 && (
          <NoDataYet onAction={() => navigate("/templates")} />
        )}
        <div className="w-full flex flex-wrap gap-4">
          {userTemplates?.slice(0, 4).map((el) => {
            return (
              <TemplateCard
                imgFile={el?.templatePoster}
                title={el.title}
                platform={el.platform}
                idx={el.templateId}
                key={el.templateId}
                fetchTemplates={fetchTemplates}
              />
            );
          })}
        </div>
      </div>
      <div className="py-4 px-6 flex flex-col gap-4 bg-[#FAFAFA] rounded-[1rem] h-[23rem] w-full">
        <div className="w-full flex items-center justify-between">
          <p className="text-[#0D0D0D] text-[1.125rem] font-[600] leading-[1.75rem] tracking-[-0.01125rem] text-ellipsis overflow-hidden whitespace-nowrap">
            Browse templates
          </p>
          <button onClick={() => navigate("/templates")}>
            <AllSvgs type={"rightLightIcon"} />
          </button>
        </div>
        {/* <NoDataYet onAction={() => navigate("/templates")} /> */}
        <div className="w-full flex flex-wrap gap-4">
          {templates?.slice(0, 4).map((el, i) => (
            <div key={i}>
              <TemplateCard
                idx={i}
                imgFile={el.imgFile}
                title={el.title}
                platform={el.platform}
              />
            </div>
          ))}
        </div>
      </div>
      <LoginSuccessModal isOpen={showModal} onClick={toggleModal} />
    </motion.div>
  );
};

export default Home;
