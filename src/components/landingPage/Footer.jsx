import React, { useRef } from "react";
import { importConfig } from "../../Config/importConfig";
import AllSvgs from "../../assets/AllSvgs";
import { motion, useInView } from "framer-motion";

const Footer = () => {
  const ref = useRef(null);
  const footerInView = useInView(ref, { once: true, threshold: 0.8 });
  return (
    <motion.footer
      className="w-full h-[32rem] flex flex-col items-center justify-center"
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
          className="mt-8 text-[#fff] font-[400] text-[1.125rem] leading-[1.75rem] tracking-[-0.01125rem]"
          style={{ opacity: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={footerInView ? { opacity: 0.5, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Make/Launch high-conversion ads in minutes with AI
        </motion.p>
      </div>
      <div className="flex items-center justify-center gap-[3.81rem] mt-[4rem]">
        <button className="text-[#fff] text-sm font-[400]">Solutions</button>
        <button className="text-[#fff] text-sm font-[400]">How It Works</button>
        <button className="text-[#fff] text-sm font-[400]">Features</button>
        <button className="text-[#fff] text-sm font-[400]">Pricing</button>
        <button className="text-[#fff] text-sm font-[400]">Use Cases</button>
      </div>
      <div className="mt-8 w-full flex justify-center items-center gap-8">
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
