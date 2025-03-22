import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { mainConfig } from "../../Config/mainConfig";
import { Toast } from "@questlabs/react-sdk";
import Cookies from "universal-cookie";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Loader from "../../ui/Loader";
import {
  createLoginFlowUrl,
  createUrl,
  getUserId,
} from "../../Config/generalFunctions";
import { importConfig } from "../../Config/importConfig";
import AllSvgs from "../../assets/AllSvgs";
const OtpModal = () => {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current[0]) {
        inputRef.current[0].focus();
      }
    }, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  function handleChange(value, index) {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  }
  function handleKeyDown(event, index) {
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        inputRef.current[index - 1].focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  }
  function handlePaste(event) {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("Text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRef.current[Math.min(newOtp.length - 1, otp.length - 1)]?.focus();
    }
  }
  //-------------------api calls------------------------//

  async function verifyOtp(payload) {
    try {
      const { url, headers } = createLoginFlowUrl(
        `api/users/email-login/verify-otp`
      );
      const response = await axios.post(url, payload, { headers });
      const newUserData = response.data;
      setIsNewUser(newUserData?.newUser);
      return response.data;
    } catch (error) {
      console.error(
        "Error in verifyOtp:",
        error.response?.data?.error || error.message
      );
    }
  }

  const getUser = async () => {
    try {
      const { url, headers } = createUrl(`api/users/${getUserId()}`);
      const res = await axios.get(url, { headers });
      cookies.set("avatar", res.data.data.imageUrl);
      cookies.set("UserName", res.data.data.name);
      dispatch({ type: "user/UserName", payload: res.data.data.name });
      dispatch({ type: "user/avatar", payload: res.data.data.imageUrl });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const getEntityApiKey = async (entityId, userId, token) => {
    const { url, headers } = createLoginFlowUrl(
      `api/admin/new-api-key?userId=${userId}`
    );
    const response = await axios.post(
      url,
      { entityId },
      { headers: { ...headers, userId, token } }
    );
    let apiKeyData = response.data;
    return apiKeyData?.data?.key;
  };

  const getEntityDetails = async ({ userId, token }) => {
    try {
      const { url, headers } = createLoginFlowUrl(
        `api/users/${userId}/admin-entities`
      );
      const response = await axios.get(url, {
        headers: { ...headers, userId, token },
      });
      let data = response.data;
      localStorage.setItem("UserEntities", JSON.stringify(data.data));

      if (data.success) {
        const selectEntity = data.data?.at(0);
        if (!selectEntity?.apiKey) {
          let apiKey = await getEntityApiKey(selectEntity?.id, userId, token);
          selectEntity.apiKey = apiKey;
          cookies.set("entityDetails", selectEntity);
          return selectEntity;
        }
        cookies.set("entityDetails", selectEntity);
        return selectEntity;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  const getOnboardingDetails = async ({ userId, token }) => {
    try {
      const { url, headers } = createLoginFlowUrl(
        `api/v2/entities/${mainConfig.QUEST_ADDBOT_ENTITY_ID}/campaigns/${mainConfig.QUEST_ONBOARDING_CAMPAIGN_ID}?platform=REACT`
      );
      const response = await axios.get(url, {
        headers: { ...headers, userId, token },
      });
      let data = response.data;
      if (data.success) {
        if (data.data.isClaimed) {
          cookies.set("UserName", data.data.actions.at(0).answers.at(0));
        }
        return data.data.isClaimed;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  async function handleSubmit() {
    setIsLoading(true);
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      Toast.error({ text: "Please enter a 6-digit OTP" });
      return;
    }
    const payload = {
      email: cookies.get("userCredentials"),
      entityId: mainConfig.QUEST_ADDBOT_ENTITY_ID,
      otp: otpValue,
    };
    try {
      const otpResponse = await verifyOtp(payload);
      if (otpResponse.success) {
        const { token, userId } = otpResponse;
        cookies.set("token", token);
        cookies.set("userId", userId);
        let entityDetails = await getEntityDetails({ userId, token });
        let onboardingDetails = await getOnboardingDetails({ userId, token });
        await getUser();
        if (entityDetails) {
          if (onboardingDetails) {
            dispatch({ type: "user/isAuthenticated", payload: true });
            localStorage.setItem("isAuthenticated", "true");
            setIsLoading(false);
            navigate("/home");
          } else {
            setIsLoading(false);
            navigate("/onboarding");
          }
        } else {
          setIsLoading(false);
          navigate("/onboarding");
        }
      } else {
        setIsLoading(false);
        const errorMessage =
          otpResponse.error || "Invalid OTP. Please try again.";
        Toast.error({ text: errorMessage });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOtp() {
    setIsLoading(true);
    try {
      const { url, headers } = createLoginFlowUrl(
        `api/users/email-login/send-otp?entityId=${mainConfig.QUEST_ADDBOT_ENTITY_ID}`
      );
      const res = await axios.post(
        url,
        { email: cookies.get("userCredentials") },
        { headers }
      );
      setCanResend(false);
      setTimer(300);
      if (res.data.success) {
        Toast.success({
          text: "OTP sent successfully",
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.error("error", error.message);
    }
  }

  function handleUserCredentials() {
    let userEmail = cookies.get("userCredentials");
    if (userEmail && userEmail.includes("@")) {
      let [localPart, domain] = userEmail.split("@");
      userEmail = `${localPart.slice(0, 4)}...@${domain}`;
    }
    return userEmail;
  }
  return (
    <div className="flex items-center justify-between w-full min-h-screen h-screen overflow-hidden">
      {isLoading && <Loader />}
      <div className="bg-[#fff] w-1/2 h-full flex flex-col justify-start items-center p-16">
        <div className="flex w-full justify-between items-center  mb-[2.75rem]">
          <AllSvgs type={"nexaLogo"} />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <AllSvgs type={"emailIconAuthFlow"} />
          <p className="text-[#181818] text-sm">
            Please enter your email or login with google.
          </p>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#535353] text-sm">
              We’ve sent a verification code to
            </p>
            <p className="text-[#252525] text-[1.125rem] font-[600] leading-[1.75rem] tracking-[-0.01125rem]">
              {handleUserCredentials()}
            </p>
          </div>
          <div>
            <div className="flex max-w-[500px] justify-between items-center gap-2">
              {otp?.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="-"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    } else {
                      handleKeyDown(e, index);
                    }
                  }}
                  onPaste={handlePaste}
                  ref={(el) => (inputRef.current[index] = el)}
                  className="flex items-center justify-center text-center py-2 px-3 text-[#696969] border border-[#E2E2E2] rounded-md font-[500] text-sm font-figtree h-10 w-[5.6rem] focus:outline-none"
                />
              ))}
            </div>
            <div>
              {canResend ? (
                <button
                  className="text-xs font-[600] font-figtree  text-[#2C2C2C]"
                  onClick={handleResendOtp}
                >
                  Resend Otp
                </button>
              ) : (
                <>
                  <span className="text-xs font-[600] font-figtree  text-[#AFAFAF]">
                    Did not receive your code yet?
                  </span>
                  <span className="text-xs font-[600] font-figtree  text-[#2C2C2C] ml-1">
                    {formatTime(timer)}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            <button
              className="w-full flex items-center justify-center"
              onClick={handleSubmit}
            >
              <img
                src={importConfig.authFlowContButton}
                alt="authFlowContButton"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-auto overflow-hidden">
        <div className="w-full h-full">
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
export default OtpModal;
