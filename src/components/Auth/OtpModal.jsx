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
const OtpModal = ({ isOpen, onClose, handleSendOtp, timer, canResend }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isNewUser, setIsNewUser] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        const userConfirmed = window.confirm(
          "Are you sure you want to close the OTP input?"
        );
        if (userConfirmed) {
          localStorage.clear();
          onClose();
          setOtp(["", "", "", "", "", ""]);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current[0]) {
          inputRef.current[0].focus();
        }
      }, 0);
    }
  }, [isOpen]);
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
        handleClose();
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
            navigate("/dashboard");
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

  function handleClose() {
    setOtp(["", "", "", "", "", ""]);
    onClose();
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {isLoading && <Loader />}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"></div>
      <div
        ref={modalRef}
        className="bg-[#fff] relative rounded-xl shadow-lg p-10 h-auto flex flex-col justify-between items-start gap-2 max-w-[500px] max-h-[280px]"
      >
        <div className="flex w-full justify-between items-center">
          <p className="text-base font-figtree  text-gray-500">
            Enter One Time Password
          </p>
          <span
            className="text-2xl font-figtree text-[#2C2C2C] hover:cursor-pointer"
            onClick={handleClose}
          >
            &times;
          </span>
        </div>
        <div className="flex w-full justify-between items-center gap-2">
          {otp?.map((digit, index) => (
            <input
              key={index}
              type="text"
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
              className="flex items-center justify-center text-center py-3 px-4 border border-gray-400 rounded-lg font-[400] font-figtree h-12 w-[4rem] focus:border-purple-500 focus:outline-none"
            />
          ))}
        </div>
        <div>
          {canResend ? (
            <button
              className="text-xs font-figtree  text-purple-700"
              onClick={handleSendOtp}
            >
              Resend Otp
            </button>
          ) : (
            <p className="text-sm font-figtree  text-gray-500">
              Resend One Time Password after: {formatTime(timer)}
            </p>
          )}
        </div>
        <div className="w-full">
          <button
            className="w-full border py-2 px-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold text-sm"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
export default OtpModal;
