import React, { useRef } from "react";
import { importConfig } from "../../Config/importConfig";
import AllSvgs from "../../assets/AllSvgs";
import { motion, useInView } from "framer-motion";

const Footer = () => {
  const ref = useRef(null);
  const footerInView = useInView(ref, { once: true, threshold: 0.8 });
  return (
    <motion.footer
      className="w-full h-[32rem] sm:h-[32rem] flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('${importConfig.footerBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={footerInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={footerInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AllSvgs type={"nexaLogoTopBar"} />
      </motion.div>
      <div>
        <motion.p
          className="mt-8 text-[#fff] font-[400] text-sm sm:text-[1.125rem] leading-[1.5rem] sm:leading-[1.75rem] tracking-[-0.01125rem]"
          style={{ opacity: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={footerInView ? { opacity: 0.5, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Make/Launch high-conversion ads in minutes with AI
        </motion.p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-start sm:justify-center gap-4 sm:gap-[3.81rem] mt-[4rem]">
        <a href="#solutions" className="text-[#fff] text-sm font-[400]">
          Solutions
        </a>
        <a href="#howitworks" className="text-[#fff] text-sm font-[400]">
          How It Works
        </a>
        <a href="#features" className="text-[#fff] text-sm font-[400]">
          Features
        </a>
        <a href="#pricing" className="text-[#fff] text-sm font-[400]">
          Pricing
        </a>
        <a href="#usecases" className="text-[#fff] text-sm font-[400]">
          Use Cases
        </a>
      </div>
      <div className="mt-6 sm:mt-8 w-full flex justify-center items-center gap-8">
        <button>
          <AllSvgs type={"facebookIcon"} fillColor="#fff" />
        </button>
        <button>
          <AllSvgs type={"linkedInIcon"} fillColor="#fff" />
        </button>
        <button>
          <AllSvgs type={"instagramIcon"} fillColor="#fff" />
        </button>
      </div>
    </motion.footer>
  );
};

export default Footer;
