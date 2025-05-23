import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { mainConfig } from "../../Config/mainConfig";
import axios from "axios";
import GoogleOAuth from "./GoogleOAuth";
import Loader from "../../ui/Loader";
import { Toast } from "@questlabs/react-sdk";
import { useForm } from "react-hook-form";
import { createLoginFlowUrl } from "../../Config/generalFunctions";
import AllSvgs from "../../assets/AllSvgs";
import { importConfig } from "../../Config/importConfig";

const Login = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
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
        navigate("/sendOtp=true");
      }
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.error("error", error.message);
    }
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      {isLoading && <Loader />}

      {/* Right Panel - Login Form */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className="w-full max-w-lg flex flex-col justify-center gap-11 h-full relative"
        >
          <AllSvgs type={"nexaLogo"} />
          <h2 className="text-[2.25rem]  font-[600] leading-[2.75rem] tracking-[-0.045rem] text-[#0D0D0D] text-ellipsis overflow-hidden whitespace-nowrap">
            Intelligence Meets Creativity
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-[#181818] font-[400] text-sm font-figtree">
              Please enter your email or login with google.
            </p>
            <div className="flex flex-col gap-4">
              <GoogleOAuth setIsLoading={setIsLoading} />
              <p className="text-[#181818] text-sm font-[500] text-center w-full">
                Or
              </p>
              <form
                className="space-y-6"
                onSubmit={handleSubmit(handleSendOtp)}
              >
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#181818] flex items-center gap-1">
                    Email address
                    <AllSvgs type={"infoIcon"} />
                  </label>
                  <div className="relative">
                    <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2C2C2C]" />
                    <input
                      type="email"
                      id="email"
                      className="w-full h-9 px-3 py-2 border font-[500] border-[#E2E2E2] rounded-md outline-none text-sm text-ellipsis overflow-hidden whitespace-nowrap placeholder:text-[#696969] text-[#2C2C2C]"
                      placeholder="email@gmail.com"
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
                  className="w-full h-8 rounded-md flex justify-center items-center"
                >
                  <img
                    src={importConfig.sendOtpButton}
                    alt="sendOtpButton"
                    className="w-full h-8"
                  />
                </motion.button>
              </form>
            </div>
          </div>
          <div className="absolute bottom-0">
            <a
              href="https://fantasy-straw-747.notion.site/Terms-and-Conditions-8c70d24a63a6419781475ca8325f2c60"
              target="_blank"
            >
              <span className="text-[#535353] text-xs font-[500]">
                By registering you agree to our
              </span>{" "}
              <span className="text-[#535353] text-xs font-[700] underline">
                Terms of use
              </span>{" "}
              <span className="text-[#535353] text-xs font-[500]">and</span>{" "}
              <span className="text-[#535353] text-xs font-[700] underline">
                Privacy Policy
              </span>
            </a>
          </div>
        </div>
      </motion.div>
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black to-white">
        <div className="inset-0 bg-black opacity-10" />
        <div className="flex flex-col justify-center items-center h-screen">
          <img
            src={importConfig.authFlowBgCover}
            alt="authFlowBgCover"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
