import React, { useState, useEffect } from "react";
import { Toast, UserProfile } from "@questlabs/react-sdk";
import { mainConfig } from "../../Config/mainConfig";
import { createUrl, getToken, getUserId } from "../../Config/generalFunctions";
import axios from "axios";
import Loader from "../../ui/Loader";
const EditUserProfile = () => {
  const [answer, setAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function updateProfile() {
    setIsLoading(true);
    const userAnswers = {
      name: answer["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || "",
      companyName: answer["ca-1e90263f-5dea-41c3-9376-2e8def433e0f"] || "",
      role: answer["ca-95273d77-aae1-4dda-aef5-a6a67f6a722d"] || "",
      lastName: answer["ca-28acc157-493e-4e84-8136-acaf096c8415"] || "",
      hobbies: answer["ca-3ea2fcc3-a9f7-4a56-bcb2-b232a6e5d2cf"] || "",
      favColor: answer["ca-cb42439e-0f90-46a9-9864-671259041b01"] || "",
    };
    try {
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.post(url, userAnswers, { headers });
      setIsLoading(false);
      Toast.success({
        text: "Profile updated successfully",
      });
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.log("error", error.message);
    }
  }

  return (
    <div>
      <div className="p-6">
        {isLoading && <Loader />}
        <UserProfile
          questId={mainConfig.QUEST_ONBOARDING_CAMPAIGN_ID}
          userId={getUserId()}
          token={getToken()}
          answer={answer}
          setAnswer={setAnswer}
          getAnswers={updateProfile}
          styleConfig={{
            Form: {
              width: "100%",
              background: "transparent",
            },
            Label: {
              // color: bgColors[`${theme}-color-premitive-grey-6`],
              fontFamily: "Figtree",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "16px",
            },
            Input: {
              borderRadius: "10px",
              // border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
            },
            MultiChoice: {
              selectedStyle: {
                //   background: "var(--button-background)",
                // background: bgColors[`${theme}-primary-bg-color-0`],
                color: "#E0E0E0",
                //   border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
              },
              style: {
                //   border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
              },
            },
            SingleChoice: {
              style: {
                //   border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
              },
              selectedStyle: {
                //   border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
              },
            },
            TextArea: {
              // border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
            },
            PrimaryButton: {
              border: "none",
            },
          }}
        />
      </div>
    </div>
  );
};

export default EditUserProfile;
