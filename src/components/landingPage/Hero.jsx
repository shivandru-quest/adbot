import React, { useState } from "react";
import { importConfig } from "../../Config/importConfig";
import { motion } from "framer-motion";
const floatAnimation1 = {
  y: [0, -8, 0],
  x: [0, 4, -4, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
};
const floatAnimation2 = {
  y: [0, -6, 0],
  x: [0, -5, 5, 0],
  transition: {
    duration: 9,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
};

const floatAnimation3 = {
  y: [0, -10, 2, 0],
  x: [0, 3, -3, 0],
  transition: {
    duration: 7,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
};
const Hero = () => {
  const [showSlideUp, setShowSlideUp] = useState(false);
  return (
    <motion.div
      className="w-full min-h-screen flex flex-col pt-4 px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      onAnimationComplete={() => setShowSlideUp(true)}
    >
      <div
        className="relative w-full h-[27rem] flex flex-col items-center justify-center gap-6 rounded-t-lg"
        style={{
          backgroundImage: `url('${importConfig.bannerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-[3rem] font-[700] leading-[3.5rem] tracking-[-0.06rem] text-[#FAFAFA] font-figtree text-center">
            Create high-performing ads on
          </p>
          <p className="text-[3rem] font-[700] leading-[3.5rem] tracking-[-0.06rem] text-[#FAFAFA] font-figtree text-center">
            autopilot
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <p
            className="text-[#B0B0B0] text-2xl tracking-[-0.03rem] font-[400]"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            Create 100+ ads in minutes with templates, and launch on multiple
          </p>
          <p
            className="text-[#B0B0B0] text-2xl tracking-[-0.03rem] font-[400]"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            platforms in minutes.
          </p>
          <button
            className="text-[#181818] text-sm font-[600] p-3 rounded-lg border border-[#E2E2E2] bg-[#fff] mt-4"
            style={{ backdropFilter: "blur(2.5px)" }}
          >
            Get started today
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4"></div>
        <motion.div
          className="absolute top-[7rem] left-[17rem]"
          animate={floatAnimation1}
        >
          <img src={importConfig.GraphicsTemplateImage1} />
        </motion.div>
        <motion.div
          className="absolute top-[5rem] left-[13rem]"
          animate={floatAnimation2}
        >
          <img src={importConfig.GraphicsTemplateImage2} />
        </motion.div>
        <motion.div
          className="absolute top-[10rem] left-[7rem]"
          animate={floatAnimation1}
        >
          <img src={importConfig.GraphicsTemplateImage3} />
        </motion.div>
        <motion.div
          className="absolute top-[14rem] left-[10rem]"
          animate={floatAnimation3}
        >
          <img src={importConfig.GraphicsTemplateImage4} />
        </motion.div>
        <motion.div
          className="absolute top-[18rem] right-[15rem]"
          animate={floatAnimation2}
        >
          <img src={importConfig.GraphicsTemplateImage5} />
        </motion.div>
        <motion.div
          className="absolute top-[7rem] right-[17rem]"
          animate={floatAnimation3}
        >
          <img src={importConfig.GraphicsTemplateImage6} />
        </motion.div>
        <motion.div
          className="absolute top-[5rem] right-[12rem]"
          animate={floatAnimation2}
        >
          <img src={importConfig.GraphicsTemplateImage7} />
        </motion.div>
        <motion.div
          className="absolute top-[10rem] right-[9rem]"
          animate={floatAnimation1}
        >
          <img src={importConfig.GraphicsTemplateImage8} />
        </motion.div>
        <motion.div
          className="absolute top-[14rem] right-[11rem]"
          animate={floatAnimation2}
        >
          <img src={importConfig.GraphicsTemplateImage9} />
        </motion.div>
        <motion.div
          className="absolute top-[18rem] left-[13rem]"
          animate={floatAnimation3}
        >
          <img src={importConfig.GraphicsTemplateImage10} />
        </motion.div>
      </div>
      <div
        className="w-full min-h-[calc(100vh-27rem)] rounded-b-lg"
        style={{
          backgroundImage: `url('${importConfig.footerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="w-3/4 m-auto min-h-[calc(100vh-20rem)] rounded-t-2xl shadow-lg border border-[#535353] flex flex-col items-center justify-center bg-[#040115B2]"
          initial={{ y: 100, opacity: 0 }}
          animate={showSlideUp ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
