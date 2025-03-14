import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { OnBoarding } from "@questlabs/react-sdk";
import { createUrl, getToken, getUserId } from "../../Config/generalFunctions";
import { mainConfig } from "../../Config/mainConfig";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Loader from "../../ui/Loader";
import Cookies from "universal-cookie";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies(null, { path: "/" });

  async function handleGetAnswers() {
    setIsLoading(true);
    try {
      const userAnswers = {
        name: answers["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || "",
        companyName: answers["ca-1e90263f-5dea-41c3-9376-2e8def433e0f"] || "",
        role: answers["ca-95273d77-aae1-4dda-aef5-a6a67f6a722d"] || "",
        lastName: answers["ca-28acc157-493e-4e84-8136-acaf096c8415"] || "",
        hobbies: answers["ca-3ea2fcc3-a9f7-4a56-bcb2-b232a6e5d2cf"] || "",
        favColor: answers["ca-cb42439e-0f90-46a9-9864-671259041b01"] || "",
      };
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.post(url, userAnswers, {
        headers,
      });
      if (res.data.success) {
        localStorage.setItem("userRecords", JSON.stringify(userAnswers));
        localStorage.setItem("isAuthenticated", "true");
        cookies.set("UserName", userAnswers.name);
        dispatch({ type: "user/isAuthenticated", payload: true });
        dispatch({ type: "user/UserName", payload: userAnswers.name });
        setIsLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error.message);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      {isLoading && <Loader />}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 relative">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6"
          >
            Let's Get Started
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90"
          >
            Help us customize your experience
          </motion.p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <OnBoarding
          userId={getUserId()}
          questId={mainConfig.QUEST_ONBOARDING_CAMPAIGN_ID}
          token={getToken()}
          controlBtnType="Buttons"
          headingScreen={[
            {
              name: "Identity Insights",
              desc: "Revealing dimensions beyond words",
            },
          ]}
          Headers={[
            {
              heading: "Don't be shy, introduce yourself",
              subHeading: "Please enter your details to let us know about you",
            },
          ]}
          singleChoose="modal3"
          multiChoice="modal2"
          styleConfig={{
            Form: { width: "68%" },
            Topbar: {},
            Heading: {
              fontSize: "24px",
              lineHeight: "32px",
              letterSpacing: "-2%",
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
            PrimaryButton: {},
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
      </div>
    </div>
  );
};

export default OnboardingPage;
