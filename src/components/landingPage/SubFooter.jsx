import React, { useRef } from "react";
import { importConfig } from "../../Config/importConfig";
import { motion, useInView } from "framer-motion";

const SubFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });
  return (
    <div className="w-full py-[3rem] px-4 sm:py-[5rem] sm:px-8">
      <motion.div
        className="w-full h-[20rem] sm:h-[24rem] rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-4 sm:gap-5"
        ref={ref}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}
        style={{
          backgroundImage: `url('${importConfig.footerScreenBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.p
          className="text-[#fff] text-2xl md:text-3xl lg:text-[2.875rem] 
             leading-[2rem] md:leading-[2.75rem] lg:leading-[3.75rem] 
             tracking-[-0.02rem] md:tracking-[-0.04rem] lg:tracking-[-0.0575rem] 
             font-[600] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to run your ads on autopilot?
        </motion.p>
        <motion.button
          className="text-[#181818] text-base sm:text-base font-[600] p-3 rounded-lg border border-[#E2E2E2] bg-[#fff]"
          style={{ backdropFilter: "blur(2.5px)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
        >
          Get started for free 
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SubFooter;
