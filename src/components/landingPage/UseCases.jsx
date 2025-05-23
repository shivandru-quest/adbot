import React, { useRef } from "react";
import AllSvgs from "../../assets/AllSvgs";
import { importConfig } from "../../Config/importConfig";
import { motion, useInView } from "framer-motion";

const UseCases = () => {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });
  const cardInView = useInView(cardRef, { triggerOnce: true, threshold: 0.2 });
  return (
    <motion.section
      className="flex flex-col px-6 md:px-12 lg:px-[7.5rem] gap-[40px] py-12 sm:py-[4rem] items-center"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      id="usecases"
    >
      <div className="flex flex-col items-center w-full gap-4">
        <h2 className="text-5xl font-medium tracking-tighter leading-none text-[#181818] max-md:max-w-full max-md:text-4xl">
          Use Cases
        </h2>
        <p className="text-lg tracking-[-0.01125rem] text-[#696969] max-md:max-w-full">
          Where Nexa Makes the Biggest Impact
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 sm:gap-x-8 justify-center items-center w-full">
        <motion.article
          className="flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl border border-[#E2E2E2] w-full"
          ref={cardRef}
          initial={{ opacity: 0, x: -100 }}
          animate={cardInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
        >
          <div
            className="w-[3.62rem] h-[3.62rem] p-4 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
            }}
          >
            <AllSvgs type={"smallBusinessIcon"} />
          </div>
          <div className="flex-1 shrink basis-8 min-w-60 max-md:max-w-full">
            <h3 className="text-xl text-[#181818] font-semibold tracking-[-0.025rem]">
              Small Businesses
            </h3>
            <p className="mt-1 text-base text-[#535353] font-[400]">
              Launch professional ads without the need for a design team get
              results fast and on budget.
            </p>
          </div>
        </motion.article>
        <motion.article
          className="flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl border border-[#E2E2E2] w-full"
          ref={cardRef}
          initial={{ opacity: 0, x: 100 }}
          animate={cardInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeInOut" }}
        >
          <div
            className="w-[3.62rem] h-[3.62rem] p-4 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
            }}
          >
            <img src={importConfig.shoppingCartIcon} alt="shoppingCartIcon" />
          </div>
          <div className="flex-1 shrink basis-8 min-w-60 max-md:max-w-full">
            <h3 className="text-xl text-[#181818] font-semibold tracking-[-0.025rem]">
              E-Commerce Brands
            </h3>
            <p className="mt-1 text-base text-[#535353] font-[400]">
              Scale product promotions with dynamic creatives that drive up to
              300% higher engagement.
            </p>
          </div>
        </motion.article>
        <motion.article
          className="flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl border border-[#E2E2E2] w-full"
          ref={cardRef}
          initial={{ opacity: 0, x: -100 }}
          animate={cardInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeInOut" }}
        >
          <div
            className="w-[3.62rem] h-[3.62rem] p-4 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
            }}
          >
            <AllSvgs type={"speakerIcon"} />
          </div>
          <div className="flex-1 shrink basis-8 min-w-60 max-md:max-w-full">
            <h3 className="text-xl text-[#181818] font-semibold tracking-[-0.025rem]">
              Marketing Agencies
            </h3>
            <p className="mt-1 text-base text-[#535353] font-[400]">
              Manage multi-client campaigns seamlessly from one centralized
              platform.
            </p>
          </div>
        </motion.article>
        <motion.article
          className="flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl border border-[#E2E2E2] w-full"
          ref={cardRef}
          initial={{ opacity: 0, x: 100 }}
          animate={cardInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeInOut" }}
        >
          <div
            className="w-[3.62rem] h-[3.62rem] p-4 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
            }}
          >
            <AllSvgs type={"digitalMarketersIcon"} />
          </div>
          <div className="flex-1 shrink basis-8 min-w-60 max-md:max-w-full">
            <h3 className="text-xl text-[#181818] font-semibold tracking-[-0.025rem]">
              Digital Marketers
            </h3>
            <p className="mt-1 text-base text-[#535353] font-[400]">
              Maximize ROI by leveraging AI insights to continuously refine ad
              performance.
            </p>
          </div>
        </motion.article>
      </div>
    </motion.section>
  );
};

export default UseCases;
