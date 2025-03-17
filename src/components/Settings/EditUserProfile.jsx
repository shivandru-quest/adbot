import React, { useState, useRef, useEffect, useContext } from "react";
import { Toast, UserProfile } from "@questlabs/react-sdk";
import { mainConfig } from "../../Config/mainConfig";
import {
  createUrl,
  getToken,
  getUserId,
  uploadImageToBackend,
} from "../../Config/generalFunctions";
import axios from "axios";
import Loader from "../../ui/Loader";
import Cookies from "universal-cookie";
import AllSvgs from "../../assets/AllSvgs";
import { AppContext } from "../../context/AppContext";
import imageCompression from "browser-image-compression";
const EditUserProfile = () => {
  const [answer, setAnswer] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();
  const cookies = new Cookies(null, { path: "/" });
  const { dispatch } = useContext(AppContext);
  const getUser = async () => {
    try {
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.get(url, { headers });
      setImageUrl(res.data.data.imageUrl);
      cookies.set("avatar", res.data.data?.imageUrl);
      cookies.set("UserName", res.data.data?.name);
      dispatch({ type: "user/UserName", payload: res.data.data?.name });
      dispatch({ type: "user/avatar", payload: res.data.data?.imageUrl });
      console.log("userData", res.data.data);
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
      // const response = await apiCall().post(
      //   "api/upload-img",
      //   formDataForUpload,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
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
      await getUser();
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
  cookies.set(
    "UserName",
    answer["ca-43fbd040-68f5-4384-a572-58ae3e61c317"] || ""
  );
  return (
    <div>
      {isLoading && <Loader />}
      <div className="flex flex-col gap-8 rounded-[10px] px-8">
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
          <div>
            <p>name</p>
            <p>email</p>
          </div>
          <div className="absolute right-0">
            <button className="border">Edit</button>
          </div>
        </div>
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
