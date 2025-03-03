import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCheck,
  FiPlay,
  FiEdit,
  FiLayout,
  FiImage,
} from "react-icons/fi";
import { GetStarted, QuestProvider } from "@questlabs/react-sdk";
import { getToken, getUserId } from "../../Config/generalFunctions";
import { mainConfig } from "../../Config/mainConfig";

const GetStartedPage = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 1,
      title: "Create Your First Ad",
      description: "Create your first AI-powered advertisement",
      icon: FiEdit,
      link: "/create",
      time: "5 mins",
    },
    {
      id: 2,
      title: "Choose a Template",
      description: "Browse our collection of pre-made templates",
      icon: FiLayout,
      link: "/templates",
      time: "3 mins",
    },
    {
      id: 3,
      title: "Upload Assets",
      description: "Upload your brand images and assets",
      icon: FiImage,
      link: "/create",
      time: "4 mins",
    },
  ];

  const handleStepClick = (step) => {
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id]);
    }
    navigate(step.link);
  };
  const clickAction = (link) => {
    // switch (link) {
    //   case "/profile":
    //     navigate("/settings?section=profile");
    //     break;
    //   case "/project":
    //     setProjectModal(true);
    //     break;
    //   default:
    //     navigate("/settings?section=invite");
    //     break;
    // }
  };

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Adbot.ai!</h1>
          <p className="text-gray-600">
            Follow these steps to start creating amazing ads with AI.
          </p>
        </div>
        <div className="w-full">
          <GetStarted
            questId={mainConfig.QUEST_GET_STARTED_CAMPAIGN_ID}
            userId={getUserId()}
            token={getToken()}
            buttonBg="#979797"
            cardHeadingColor="#2C2C2C"
            cardDescColor="#979797"
            cardBorderColor="#EFEFEF"
            descriptionText={
              "Get started with Quest and explore how Quest can take your customer engagement to the next level "
            }
            arrowColor="#939393"
            onLinkTrigger={(e) => clickAction(e)}
            allowMultiClick
            styleConfig={{
              Form: {
                padding: "0px",
                background: "transparent",
              },
              Topbar: {
                padding: "20px 0px 12px",
              },
              Description: {
                color: "#6E6E6E",
                fontFamily: "Figtree",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                margin: "8px 0 0 0",
              },
              Icon: {
                background: "transparent",
              },
              CardContainer: {
                padding: "0px",
                marginTop: "12px",
              },
            }}
            showFooter={false}
          />
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
