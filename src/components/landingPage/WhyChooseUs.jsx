import React, { useRef } from "react";
import AllSvgs from "../../assets/AllSvgs";
import { motion, useInView } from "framer-motion";
const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { triggerOnce: true, threshold: 0.2 });
  return (
    <section className="flex flex-col px-6 md:px-12 lg:px-[7.5rem] py-12 sm:py-[4rem] items-center">
      <div className="flex flex-col gap-4 items-center max-w-full text-center">
        <h2 className="text-[#181818] text-[3rem] leading-[3.75rem] tracking-[-0.06rem] font-[500]">
          Why Choose Nexa
        </h2>
        <p className="text-[#696969] text-[1.125rem] leading-[1.75rem] tracking-[-0.01125rem] font-[400]">
          Maximize Engagement, Minimize Effort with Nexa
        </p>
      </div>
      <motion.div
        className="flex flex-col lg:flex-row gap-8 justify-center items-center w-full mt-[40px]"
        ref={sectionRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <article className="flex flex-col p-[32px] gap-3 w-[24rem] border border-[#E2E2E2] rounded-3xl">
          <div
            className="flex gap-2 justify-center items-center self-center p-3 w-11 h-11 rounded-md"
            style={{
              background:
                "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
            }}
          >
            <AllSvgs type={"speedIcon"} />
          </div>
          <div className="flex flex-col mt-3 w-full text-center gap-1">
            <h3 className="text-[#181818] text-[1.25rem] leading-[1.75rem] tracking-[-0.025rem] font-[600]">
              Speed
            </h3>
            <p className="text-[#535353] text-base font-[400]">
              Create high-quality ad creatives in minutes instead of hours.
            </p>
          </div>
        </article>
        <article className="flex flex-col p-[32px] gap-3 w-[24rem] border border-[#E2E2E2] rounded-3xl">
          <div
            className="flex gap-2 justify-center items-center self-center p-3 w-11 h-11 rounded-md"
            style={{
              background:
                "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
            }}
          >
            <AllSvgs type={"throughputIcon"} />
          </div>
          <div className="flex flex-col mt-3 w-full text-center gap-1">
            <h3 className="text-[#181818] text-[1.25rem] leading-[1.75rem] tracking-[-0.025rem] font-[600]">
              Throughput
            </h3>
            <p className="text-[#535353] text-base font-[400]">
              Save {">"}20 hours a week building and launching ad campaigns.
            </p>
          </div>
        </article>
        <article className="flex flex-col p-[32px] gap-3 w-[24rem] border border-[#E2E2E2] rounded-3xl">
          <div
            className="flex gap-2 justify-center items-center self-center p-3 w-11 h-11 rounded-md"
            style={{
              background:
                "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
            }}
          >
            <AllSvgs type={"costSavingIcon"} />
          </div>
          <div className="flex flex-col mt-3 w-full text-center gap-1">
            <h3 className="text-[#181818] text-[1.25rem] leading-[1.75rem] tracking-[-0.025rem] font-[600]">
              Cost Savings
            </h3>
            <p className="text-[#535353] text-base font-[400]">
              Ditch the design agency charging you hundreds of dollars per ad
              creative pack.
            </p>
          </div>
        </article>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
