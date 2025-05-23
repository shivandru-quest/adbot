import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
const steps = [
  {
    number: "1",
    title: "Upload Your Assets",
    description:
      "Start by uploading your brand’s images, logos, text, and blog content.",
  },
  {
    number: "2",
    title: "Select a Template",
    description:
      "Choose from our library of industry-tested, customizable templates designed for social media success",
  },
  {
    number: "3",
    title: "Let AI Create",
    description: "Create customized code to fit specific user needs",
  },
  {
    number: "4",
    title: "Publish & Optimize",
    description:
      "Schedule your ads, track performance in real time, and let our built-in A/B testing refine your campaigns automatically.",
  },
];
const HowItWorks = () => {
  return (
    <section
      className="px-6 md:px-12 lg:px-[7.5rem] py-12 sm:py-[4rem]"
      id="howitworks"
    >
      <div className="flex flex-col items-center w-full gap-4 mb-10">
        <h2 className="text-5xl font-medium tracking-tighter leading-none text-[#181818] max-md:max-w-full max-md:text-4xl">
        How it works
        </h2>
        <p className="text-lg tracking-[-0.01125rem] text-[#696969] max-md:max-w-full text-center">
        Simple steps to create stunning ad creatives
        </p>
      </div>
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-1 w-full lg:grid-cols-2 md:grid-cols-1">
        {steps.map((step, index) => (
          <motion.article
            key={index}
            className="p-6 flex flex-col gap-3 bg-[#FAFAFA] border border-[#E2E2E2] rounded-[1.75rem]"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="text-xs text-[#FAFAFA] font-[500] px-[0.81rem] py-[0.44rem] rounded-[0.875rem] flex items-center justify-center w-fit"
              style={{
                background:
                  "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
              }}
            >
              STEP {step.number}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h3 className="text-[1.25rem] leading-[1.875rem] tracking-[-0.025rem] text-[#181818]">
                {step.title}
              </h3>
              <p className="text-[#535353] text-base font-[400]">
                {step.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
