import { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import OtpModal from "./OtpModal";
import { mainConfig } from "../../Config/mainConfig";
import axios from "axios";
import GoogleOAuth from "./GoogleOAuth";
import Loader from "../../ui/Loader";
import { Toast } from "@questlabs/react-sdk";
import { useForm } from "react-hook-form";
import { createLoginFlowUrl } from "../../Config/generalFunctions";

const Login = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const email = watch("email");

  useEffect(() => {
    if (!isModalOpen) return;
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
  }, [isModalOpen]);

  async function handleSendOtp(data) {
    setIsLoading(true);
    try {
      const { url, headers } = createLoginFlowUrl(
        `api/users/email-login/send-otp?entityId=${mainConfig.QUEST_ADDBOT_ENTITY_ID}`
      );
      const res = await axios.post(url, { email: data.email }, { headers });
      setCanResend(false);
      setTimer(300);
      if (res.data.success) {
        Toast.success({
          text: "OTP sent successfully",
        });
        setIsLoading(false);
        cookies.set("userCredentials", data.email);
        openModal();
      }
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.error("error", error.message);
    }
  }
  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="min-h-screen flex">
      {isLoading && <Loader />}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Welcome to Adbot.ai</h1>
          <p className="text-xl opacity-90">
            Create stunning ads in minutes with AI
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Continue to Adbot.ai
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(handleSendOtp)}>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg outline-none text-sm"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors?.email && (
                  <p className="text-red-500 text-xs">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>

            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <GoogleOAuth /> */}
          </form>
        </motion.div>
      </div>
      <OtpModal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleSendOtp={handleSendOtp}
        timer={timer}
        canResend={canResend}
      />
    </div>
  );
};

export default Login;
