import React from "react";
import { motion } from "framer-motion";
import { importConfig } from "../Config/importConfig";
import AllSvgs from "../assets/AllSvgs";

const categories = [
  "All",
  "SaaS",
  "E-commerce",
  "FinTech",
  "Agency",
  "Fashion",
  "Food",
  "Travel",
  "Real-estate",
];

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
const TemplateBanner = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <div
      className="relative w-full h-[22rem] rounded-lg flex flex-col items-center justify-center gap-6"
      style={{
        backgroundImage: `url('${importConfig.bannerBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-[3rem] font-[700] leading-[3.5rem] tracking-[-0.06rem] text-[#FAFAFA] font-figtree text-center">
          Explore & Customize{" "}
        </p>
        <p className="text-[3rem] font-[700] leading-[3.5rem] tracking-[-0.06rem] text-[#FAFAFA] font-figtree text-center">
          AI Templates
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="relative w-1/3">
          <div className="absolute top-4 left-3">
            <AllSvgs type="searchIcon" />
          </div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for template like “Product”"
            className="py-2 pl-10 pr-3 bg-transparent border border-[#535353] rounded-lg outline-none w-full placeholder:text-[#808080] text-sm font-figtree font-[500] text-ellipsis overflow-hidden whitespace-nowrap text-[#AFAFAF] h-12"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          {categories.map((el, i) => (
            <button
              key={i}
              className={`p-2 rounded-md flex items-center justify-center text-[#fff] text-xs`}
              style={{
                border:
                  selectedCategory === el
                    ? "1px solid #696969"
                    : "1px solid rgba(169, 163, 194, 0.80)",
                background:
                  selectedCategory === el ? "rgba(255, 255, 255, 0.20)" : "",
                backdropFilter: selectedCategory === el ? "blur(2px)" : "",
              }}
              onClick={() => setSelectedCategory(el)}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
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
  );
};

export default TemplateBanner;
