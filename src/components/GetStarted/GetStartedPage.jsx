import { useState, useEffect, useContext } from "react";
import { GetStarted } from "@questlabs/react-sdk";
import {
  createUrlBackend,
  getToken,
  getUserId,
} from "../../Config/generalFunctions";
import { mainConfig } from "../../Config/mainConfig";
import { importConfig } from "../../Config/importConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const GetStartedPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const clickAction = (link) => {
    switch (link) {
      case "/create":
        navigate("/editor/new");
        break;
      case "/template":
        navigate("/templates");
        break;
      case "/upload":
        navigate("/myfiles");
        break;
      case "/book":
        window.open("https://calendly.com/shubham-quest/quick-chat", "_blank");
    }
  };

  async function updateUser(status) {
    try {
      const payload = {
        getStartedStatus: [status],
      };
      const { url, headers } = createUrlBackend(`user/update`);
      const res = await axios.patch(url, payload, { headers });
      dispatch({
        type: "user/getStartedStatus",
        payload: res.data.data.getStartedStatus,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <motion.div
      className="p-4 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className="h-[21rem] w-full rounded-lg flex items-center justify-start pl-20"
        style={{
          backgroundImage: `url('${importConfig.bannerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-[#FAFAFA] text-[3rem] leading-[3.5rem] tracking-[-0.06rem] font-[900]">
              Power Up Ads
            </p>
            <p className="text-[#fff] text-[2rem] font-[500] leading-[3.5rem] tracking-[-0.04rem]">
              Turn Clicks into Conversions Faster
            </p>
            <button
              className="text-[#181818] text-xs font-[600] px-3 py-2 bg-[#FAFAFA] w-28 flex items-center justify-center gap-2 rounded-md mt-4"
              onClick={() => navigate("/editor/new")}
            >
              Create now
            </button>
          </div>
          <div className="w-[39rem]">
            <img
              src={importConfig.getStartedGroupBg}
              alt="getStartedGroupBg"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-[#181818] text-[1.25rem] leading-[1.875rem] tracking-[-0.025rem] font-semibold">
          Welcome to Nexa
        </p>
        <p className="text-[#535353] text-sm font-[400]">
          Follow there steps to start creating amazing ads with AI.
        </p>
      </div>
      <div className="w-full relative">
        <button
          className="text-[#181818] text-sm font-[600] px-3 py-2 border border-[#E2E2E2] rounded-md bg-white absolute right-4 top-5"
          onClick={async () => {
            navigate("/editor/new");
            await updateUser("CREATE_FIRST_AD");
          }}
        >
          Create now
        </button>
        <button
          className="absolute right-4 top-[7rem] w-24"
          onClick={async () => {
            navigate("/templates");
            await updateUser("CHOOSE_A_TEMPLATE");
          }}
        >
          <img
            src={importConfig.getStartedButtonIcon1}
            alt="getStartedButtonIcon1"
          />
        </button>
        <button
          className="absolute right-4 top-[12.5rem] w-24"
          onClick={async () => {
            navigate("/myfiles");
            await updateUser("UPLOAD_ASSETS");
          }}
        >
          <img
            src={importConfig.getStartedButtonIcon2}
            alt="getStartedButtonIcon2"
          />
        </button>
        <button
          className="absolute right-4 top-[18rem] w-24"
          onClick={async () => {
            window.open(
              "https://calendly.com/shubham-quest/quick-chat",
              "_blank"
            );
            await updateUser("BOOK_A_CALL");
          }}
        >
          <img
            src={importConfig.getStartedButtonIcon3}
            alt="getStartedButtonIcon3"
          />
        </button>
        <GetStarted
          questId={mainConfig.QUEST_GET_STARTED_CAMPAIGN_ID}
          userId={getUserId()}
          template={4}
          autoHide={false}
          token={getToken()}
          buttonBg="#979797"
          cardHeadingColor="#181818"
          cardDescColor="#535353"
          cardBorderColor="#EFEFEF"
          descriptionText={""}
          arrowColor="#939393"
          onLinkTrigger={(e) => clickAction(e)}
          allowMultiClick
          styleConfig={{
            Form: {
              background: "transparent",
            },
            Topbar: {
              padding: "20px 0px 12px",
              display: "none",
            },
            Description: {
              color: "#535353",
              fontFamily: "Figtree",
              fontSize: "0.75rem",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "1rem",
              margin: "8px 0 0 0",
            },
            Icon: {
              background: "transparent",
            },
            CardContainer: {
              padding: "0px",
              marginTop: "0px",
            },
          }}
          showFooter={false}
          showProgressBar={false}
        >
          <GetStarted.Header />
          <GetStarted.Content />
        </GetStarted>
      </div>
    </motion.div>
  );
};

export default GetStartedPage;
