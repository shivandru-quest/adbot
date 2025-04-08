import React, { useState } from "react";
import { importConfig } from "../../Config/importConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroInput from "./HeroInput";
import Pills from "./Pills";

const floatAnimation1 = {
  y: [0, -8, 0],
  x: [0, 4, -4, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeOut",
  },
};
const floatAnimation2 = {
  y: [0, -6, 0],
  x: [0, -5, 5, 0],
  transition: {
    duration: 7,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeOut",
  },
};

const floatAnimation3 = {
  y: [0, -10, 2, 0],
  x: [0, 3, -3, 0],
  transition: {
    duration: 9,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeOut",
  },
};
const pillData = [
  {
    icon: "cafe",
    text: "Cafe",
  },
  {
    icon: "fashion",
    text: "Fashion",
  },
  {
    icon: "product",
    text: "Product",
  },
  {
    icon: "educational",
    text: "Educational",
  },
  {
    icon: "e-commerce",
    text: "E-commerce",
  },
  {
    icon: "food",
    text: "Food",
  },
  {
    icon: "finTech",
    text: "FinTech",
  },
];
const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-full h-auto flex flex-col pt-4 px-4 sm:px-6 md:px-8 lg:px-12 mt-20 overflow-y-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div
        className="relative w-full h-screen flex flex-col items-center justify-center gap-6 rounded-lg"
        style={{
          backgroundImage: `url('${importConfig.bannerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[3rem] font-bold leading-snug tracking-tight text-[#FAFAFA] font-figtree">
            Create WINNING ads in minutes
          </p>
          <p
            className="text-sm sm:text-base md:text-xl text-[#B0B0B0] mt-2 px-4 sm:px-0 text-center"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            Stop spending thousands on ad creatives that don’t convert
          </p>
          <HeroInput />
          <div className="hidden md:flex items-center justify-center gap-2 mt-3 w-1/2">
            {pillData.slice(0, 4).map((el, i) => (
              <div key={i}>
                <Pills icon={el.icon} text={el.text} />
              </div>
            ))}
          </div>
          <div className="hidden md:flex items-center justify-center gap-2 w-1/2">
            {pillData.slice(4, 8)?.map((el, i) => (
              <div key={i}>
                <Pills icon={el.icon} text={el.text} />
              </div>
            ))}
          </div>
        </div>
        <motion.div
          className="absolute top-[7rem] left-[17rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation1}
        >
          <img
            src={importConfig.GraphicsTemplateImage1}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[3rem] left-[11rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation2}
        >
          <img
            src={importConfig.GraphicsTemplateImage2}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[8rem] left-[6rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation1}
        >
          <img
            src={importConfig.GraphicsTemplateImage3}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[14rem] left-[15rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation3}
        >
          <img
            src={importConfig.GraphicsTemplateImage4}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[23rem] right-[15rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation2}
        >
          <img
            src={importConfig.GraphicsTemplateImage5}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[1.5rem] right-[14rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation3}
        >
          <img
            src={importConfig.GraphicsTemplateImage6}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[2rem] right-[25rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation2}
        >
          <img
            src={importConfig.GraphicsTemplateImage7}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[6rem] right-[19rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation1}
        >
          <img
            src={importConfig.GraphicsTemplateImage8}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[14rem] right-[11rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation2}
        >
          <img
            src={importConfig.GraphicsTemplateImage9}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
        <motion.div
          className="absolute top-[22rem] left-[10rem] w-9 h-9 hidden lg:block"
          animate={floatAnimation3}
        >
          <img
            src={importConfig.GraphicsTemplateImage10}
            className="w-full object-contain will-change-transform"
          />
        </motion.div>
      </div>
      {/* <div
        className="hidden lg:block w-full min-h-[calc(100vh-27rem)] rounded-b-lg"
        style={{
          backgroundImage: `url('${importConfig.footerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="w-3/4 m-auto min-h-[calc(100vh-20rem)] rounded-t-[26px] shadow-lg border border-[#ffffff19] flex flex-col items-center justify-center bg-[#040115B2]"
          initial={{ y: 100, opacity: 0 }}
          // animate={showSlideUp ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            backdropFilter: "blur(5.17px)",
            boxShadow: "rgba(255, 255, 255, 0.03) 0px 0px 0px 7.757px inset",
          }}
        >
          <button className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#000000] bg-opacity-50 shadow-lg backdrop-blur-md">
            <FaPlay className="text-gray-300 text-md" />
          </button>
        </motion.div>
      </div> */}
    </motion.div>
  );
};

export default Hero;
