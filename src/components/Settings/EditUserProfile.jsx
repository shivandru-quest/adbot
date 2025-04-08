import React, { useState, useRef, useEffect, useContext } from "react";
import { Toast, UserProfile } from "@questlabs/react-sdk";
import { mainConfig } from "../../Config/mainConfig";
import { createUrl, getToken, getUserId } from "../../Config/generalFunctions";
import axios from "axios";
import Loader from "../../ui/Loader";
import Cookies from "universal-cookie";
import AllSvgs from "../../assets/AllSvgs";
import { AppContext } from "../../context/AppContext";
import imageCompression from "browser-image-compression";
import { importConfig } from "../../Config/importConfig";
import GeneralSelect from "../../ui/GeneralSelect";
import { motion } from "framer-motion";
const roleOptions = [
  { label: "CEO", value: "CEO" },
  { label: "CTO", value: "CTO" },
  { label: "Software Engineer", value: "Software Engineer" },
  { label: "Designer", value: "Designer" },
  { label: "QA Engineer", value: "QA Engineer" },
  { label: "Marketer", value: "Marketer" },
  { label: "Founder", value: "Founder" },
];
const mainGoalOptions = [
  { label: "boost engagement", value: "boost engagement" },
  { label: "creativity", value: "creativity" },
];
const EditUserProfile = () => {
  const [answer, setAnswer] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();
  const primaryButtonRef = useRef(null);
  const cookies = new Cookies(null, { path: "/" });
  const { dispatch } = useContext(AppContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [oldAnswer, setOldAnswer] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const button = document.querySelector(
        ".q-prof_main-btn3.q_next_button_main_cont"
      );
      if (button) {
        primaryButtonRef.current = button;
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);
  const handleEditClick = () => {
    setIsDisabled(false);
    if (primaryButtonRef.current) {
      primaryButtonRef.current.click();
    } else {
      console.log("Primary button not found.");
    }
  };
  const getUser = async () => {
    try {
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.get(url, { headers });
      setImageUrl(res.data.data.imageUrl || "");
      cookies.set("avatar", res.data.data?.imageUrl || "");
      dispatch({ type: "user/avatar", payload: res.data.data?.imageUrl || "" });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleImageUpload = async (fileToUpload) => {
    if (!fileToUpload) return null;

    const formDataForUpload = new FormData();
    formDataForUpload.append("uploaded_file", fileToUpload);

    try {
      const { url, headers } = createUrl("api/upload-img");
      const response = await axios.post(url, formDataForUpload, { headers });

      if (response.status === 200) {
        return response.data.imageUrl;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  async function inputFileChangeHandler(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        alert("File size should be less than 1 MB");
        return;
      }
      setSelectedFile(file);
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const uploadedUrl = await handleImageUpload(compressedFile);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
      }
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.post(url, { imageUrl: uploadedUrl }, { headers });
      if (res.data.success) {
        await getUser();
      }
    }
  }

  async function updateProfile() {
    setIsLoading(true);
    const userAnswers = {
      avatar: imageUrl,
      fullName: answer["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || "",
      email: answer["ca-28acc157-493e-4e84-8136-acaf096c8415"] || "",
      role: answer["ca-cb42439e-0f90-46a9-9864-671259041b01"] || "",
      mainGoal: answer["ca-1e90263f-5dea-41c3-9376-2e8def433e0f"] || "",
    };
    try {
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.post(url, userAnswers, { headers });
      setIsLoading(false);
      await getUser();
      Toast.success({
        text: "Profile updated successfully",
      });
      cookies.set(
        "UserName",
        answer["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || ""
      );
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.log("error", error.message);
    }
  }
  async function fetchAnswers() {
    try {
      const { url, headers } = createUrl(
        `api/v2/entities/${mainConfig.QUEST_ADDBOT_ENTITY_ID}/campaigns/${mainConfig.QUEST_ONBOARDING_CAMPAIGN_ID}?platform=REACT`
      );
      const res = await axios.get(url, { headers });
      console.log("res.data.actions", res.data.data.actions);
      if (res.data.data.actions.length > 0) {
        const transformedData = res.data.data.actions?.reduce((acc, crr) => {
          acc[crr.actionId] = crr?.answers[0];
          return acc;
        }, {});
        cookies.set(
          "UserName",
          transformedData["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || ""
        );
        dispatch({
          type: "user/UserName",
          payload:
            transformedData["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || "",
        });
        setAnswer(transformedData);
        setOldAnswer(transformedData);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  async function verifySubmission() {
    const payload = {
      actions: [
        {
          actionId: "ca-43fbd040-68f5-4384-a572-58ae3e61c317",
          answers: [answer["ca-43fbd040-68f5-4384-a572-58ae3e61c317"]],
        },
        {
          actionId: "ca-28acc157-493e-4e84-8136-acaf096c8415",
          answers: [answer["ca-28acc157-493e-4e84-8136-acaf096c8415"]],
        },
        {
          actionId: "ca-cb42439e-0f90-46a9-9864-671259041b01",
          answers: [answer["ca-cb42439e-0f90-46a9-9864-671259041b01"]],
        },
        {
          actionId: "ca-1e90263f-5dea-41c3-9376-2e8def433e0f",
          answers: [answer["ca-1e90263f-5dea-41c3-9376-2e8def433e0f"]],
        },
      ],
      campaignVariationId: "cv-c08aa181-f30c-4598-8fc0-ace04d7602d7",
    };
    try {
      const { url, headers } = createUrl(
        `api/v2/entities/${mainConfig.QUEST_ADDBOT_ENTITY_ID}/campaigns/${mainConfig.QUEST_ONBOARDING_CAMPAIGN_ID}/verify?editSubmissionCriteria=true`
      );
      const res = await axios.post(url, payload, { headers });
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    fetchAnswers();
  }, []);
  async function handleupdate() {
    try {
      await updateProfile();
      await verifySubmission();
      await fetchAnswers();
      setIsDisabled((prev) => !prev);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  function handleRoleSelectChange(selectedOption) {
    setAnswer((prev) => ({
      ...prev,
      "ca-cb42439e-0f90-46a9-9864-671259041b01": selectedOption.value,
    }));
  }
  function handlePurposeSelectChange(selectedOption) {
    setAnswer((prev) => ({
      ...prev,
      "ca-1e90263f-5dea-41c3-9376-2e8def433e0f": selectedOption.value,
    }));
  }
  return (
    <div>
      {isLoading && <Loader />}
      <motion.div
        className="flex flex-col gap-8 rounded-[10px] px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-[#0D0D0D] text-[2.25rem] leading-[2.75rem] tracking-[-0.045rem] font-[600]">
          Account
        </p>
        <div className="flex items-center justify-start gap-6 w-full relative">
          <div
            className="w-28 h-28 flex items-center justify-center rounded-full bg-[#F4EBFF] relative mb-9"
            onClick={() => fileInputRef.current.click()}
          >
            {(imageUrl || customImage) && (
              <img
                className="object-cover w-full h-full rounded-full static z-10"
                src={imageUrl || customImage}
                alt=""
              />
            )}
            <div
              className={`${
                imageUrl ? "opacity-0" : "opacity-100"
              } absolute left-0 top-0`}
            >
              <label className="cursor-pointer w-28 h-28 flex items-center justify-center rounded-full">
                <div
                  className={`flex justify-center items-center ${
                    (imageUrl || customImage) && "hidden"
                  }`}
                >
                  <AllSvgs type={"uploadIcon"} />
                </div>
              </label>
              <input
                onChange={inputFileChangeHandler}
                id="profile-img"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[0.38rem]">
            <p className="text-[#000] text-xl font-[500]">
              {answer["ca-43fbd040-68f5-4384-a572-58ae3e61c317"]}
            </p>
            <p className="opacity-[0.5] text-[#000] text-base font-[400]">
              {answer["ca-28acc157-493e-4e84-8136-acaf096c8415"]}
            </p>
          </div>
          {!isDisabled && (
            <div className="absolute right-0">
              <button
                className="flex items-center justify-center gap-2 px-3 py-2 border border-[#E2E2E2] rounded-md w-24"
                onClick={() => setIsDisabled((prev) => !prev)}
              >
                <AllSvgs type={"penIcon"} />{" "}
                <span className="text-[#181818] text-xs font-[600]">Edit</span>
              </button>
            </div>
          )}
        </div>
        {/* <UserProfile
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
              color: "#535353",
              fontFamily: "Figtree",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "1.25rem",
            },
            Input: {
              borderRadius: "0.375rem",
              border: `1px solid #E2E2E2`,
              background: "#FAFAFA",
            },
            MultiChoice: {
              selectedStyle: {
                background: "#FAFAFA",
                color: "#E0E0E0",
                border: `1px solid #E2E2E2`,
              },
              style: {
                //   border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                border: `1px solid #E2E2E2`,
                background: "#FAFAFA",
                color: "#696969",
                fontSize: "1rem",
                fontWeight: "500",
                lineHeight: "1.5rem",
              },
            },
            SingleChoice: {
              style: {
                //   border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                border: `1px solid #E2E2E2`,
                background: "#FAFAFA",
              },
              selectedStyle: {
                //   border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
                border: `1px solid #E2E2E2`,
                background: "#FAFAFA",
              },
            },
            TextArea: {
              // border: `1px solid ${bgColors[`${theme}-primary-border-color`]}`,
              border: `1px solid #E2E2E2`,
            },
            PrimaryButton: {
              display: "none",
            },
          }}
        /> */}

        <div className="w-full grid grid-cols-2 gap-x-[2.12rem] gap-y-[1.75rem]">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ca-43fbd040-68f5-4384-a572-58ae3e61c317"
              className="text-[#535353] textsm font-[500]"
            >
              Full name
            </label>
            <input
              type="text"
              name="ca-43fbd040-68f5-4384-a572-58ae3e61c317"
              id="ca-43fbd040-68f5-4384-a572-58ae3e61c317"
              value={answer["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || ""}
              className={`border border-[#E2E2E2] w-full h-10 rounded-md  py-2 px-3 text-base font-[500] outline-none ${
                !isDisabled
                  ? "cursor-not-allowed text-[#696969] bg-[#FAFAFA]"
                  : "cursor-pointer text-[#181818] bg-white"
              }`}
              onChange={handleChange}
              disabled={!isDisabled}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ca-28acc157-493e-4e84-8136-acaf096c8415"
              className="text-[#535353] textsm font-[500]"
            >
              Email
            </label>
            <input
              type="email"
              name="ca-28acc157-493e-4e84-8136-acaf096c8415"
              value={answer["ca-28acc157-493e-4e84-8136-acaf096c8415"]}
              id="ca-28acc157-493e-4e84-8136-acaf096c8415"
              className={`border border-[#E2E2E2] w-full h-10 rounded-md  py-2 px-3 text-base font-[500] outline-none ${
                !isDisabled
                  ? "cursor-not-allowed text-[#696969] bg-[#FAFAFA]"
                  : "cursor-pointer text-[#181818] bg-white"
              }`}
              onChange={handleChange}
              disabled={!isDisabled}
            />
          </div>
          <div
            className={`flex flex-col gap-1 ${
              !isDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <label
              htmlFor="ca-cb42439e-0f90-46a9-9864-671259041b01"
              className="text-[#535353] textsm font-[500]"
            >
              Role
            </label>
            <GeneralSelect
              value={answer["ca-cb42439e-0f90-46a9-9864-671259041b01"]}
              Placeholder={answer["ca-cb42439e-0f90-46a9-9864-671259041b01"]}
              options={roleOptions}
              onChange={handleRoleSelectChange}
              placeholeTextSize="1rem"
              selectHeight="2.5rem"
              placeholderLineHeight="1.25rem"
              isDisabled={!isDisabled}
              placeHolderColor={isDisabled ? "#181818" : "#696969"}
              optionTextSize="1rem"
              optionLineHeight="1.5rem"
            />
          </div>
          <div
            className={`flex flex-col gap-1 ${
              !isDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <label
              htmlFor="ca-1e90263f-5dea-41c3-9376-2e8def433e0f"
              className="text-[#535353] textsm font-[500]"
            >
              Purpose
            </label>
            <GeneralSelect
              value={answer["ca-1e90263f-5dea-41c3-9376-2e8def433e0f"]}
              Placeholder={answer["ca-1e90263f-5dea-41c3-9376-2e8def433e0f"]}
              options={mainGoalOptions}
              onChange={handlePurposeSelectChange}
              placeholeTextSize="1rem"
              selectHeight="2.5rem"
              placeholderLineHeight="1.25rem"
              isDisabled={!isDisabled}
              placeHolderColor={isDisabled ? "#181818" : "#696969"}
              optionTextSize="1rem"
              optionLineHeight="1.5rem"
            />
          </div>
        </div>
      </motion.div>
      {isDisabled && (
        <div className="w-full flex justify-end gap-9 mt-8 pr-8">
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 border border-[#E2E2E2] rounded-md w-24 text-[#181818] text-xs font-[600]"
            onClick={() => {
              setIsDisabled((prev) => !prev);
              setAnswer(oldAnswer);
            }}
          >
            Cancel
          </button>
          <button
            className="w-[7rem]"
            onClick={handleupdate}
            // onClick={handleEditClick}
          >
            <img
              src={importConfig.saveButton}
              alt=""
              className="w-full object-contain"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditUserProfile;
