import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { OnBoarding } from "@questlabs/react-sdk";
import {
  createUrl,
  getToken,
  getUserId,
  createLoginFlowUrl,
} from "../../Config/generalFunctions";
import { mainConfig } from "../../Config/mainConfig";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Loader from "../../ui/Loader";
import Cookies from "universal-cookie";
import AllSvgs from "../../assets/AllSvgs";
import { importConfig } from "../../Config/importConfig";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const btnRef = useRef(null);

  useEffect(() => {
    function handleClick() {
      const triggeredButton = document.querySelector(
        ".q-onb-main-btn3.q_next_button_main_cont"
      );
      if (triggeredButton) {
        triggeredButton.click();
      }
    }
    if (btnRef.current) {
      btnRef.current.addEventListener("click", handleClick);
    }
    return () => {
      if (btnRef.current) {
        btnRef.current.removeEventListener("click", handleClick);
      }
    };
  }, []);

  async function handleGetAnswers() {
    setIsLoading(true);
    try {
      const userAnswers = {
        fullName: answers["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || "",
        email: answers["ca-28acc157-493e-4e84-8136-acaf096c8415"] || "",
        role: answers["ca-cb42439e-0f90-46a9-9864-671259041b01"] || "",
        mainGoal: answers["ca-1e90263f-5dea-41c3-9376-2e8def433e0f"] || "",
      };
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.post(url, userAnswers, {
        headers,
      });
      if (res.data.success) {
        localStorage.setItem("userRecords", JSON.stringify(userAnswers));
        localStorage.setItem("isAuthenticated", "true");
        cookies.set("UserName", userAnswers.fullName);
        dispatch({ type: "user/isAuthenticated", payload: true });
        dispatch({ type: "user/UserName", payload: userAnswers.fullName });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error.message);
    }
  }

  return (
    <div className="min-h-screen flex h-screen overflow-hidden">
      {isLoading && <Loader />}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full flex items-center justify-start pl-[8rem]">
          <AllSvgs type={"nexaLogo"} />
        </div>
        <div className="w-full flex items-center justify-center relative">
          <OnBoarding
            userId={getUserId()}
            questId={mainConfig.QUEST_ONBOARDING_CAMPAIGN_ID}
            token={getToken()}
            controlBtnType="Buttons"
            headingScreen={[
              {
                name: "",
                desc: "",
              },
            ]}
            Headers={[
              {
                heading: "Share your details",
                subHeading: "",
              },
            ]}
            singleChoose="modal3"
            multiChoice="modal1"
            styleConfig={{
              Form: { width: "68%" },
              Topbar: {},
              Heading: {
                fontSize: "2.25rem",
                lineHeight: "2.75rem",
                letterSpacing: "-0.045rem",
                color: "#0D0D0D",
                fontWeight: "600",
              },
              Description: {
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "500",
                color: "#939393",
              },
              Input: { lineHeight: "20px" },
              Label: { fontWeight: "500" },
              TextArea: {},
              PrimaryButton: {
                display: "none",
              },
              SecondaryButton: {},
              SingleChoice: {
                hoverBackground: "#e2e2e2",
                style: {},
                selectedStyle: {},
              },
              MultiChoice: { style: {}, selectedStyle: {} },
              ProgressBar: {
                completeTabColor: "",
                currentTabColor: "",
                pendingTabColor: "",
              },
              Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
            }}
            answer={answers}
            getAnswers={handleGetAnswers}
            nextBtnText="Submit Details"
            setAnswer={setAnswers}
            showFooter={false}
          />
          <button
            className="absolute bottom-[-1rem] h-9 w-[437px]"
            ref={btnRef}
          >
            <img
              src={importConfig.shareDetailsButton}
              alt="shareDetailsButton"
              className="h-full w-full object-contain"
            />
          </button>
        </div>
      </div>
      <div className="w-1/2 h-auto overflow-hidden">
        <div className="hidden lg:block w-full h-full">
          <div className="bg-black opacity-10" />
          <div className="flex flex-col justify-center items-center w-full">
            <img
              src={importConfig.authFlowBgCover}
              alt="authFlowBgCover"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
