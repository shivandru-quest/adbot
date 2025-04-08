import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import AllSvgs from "../../assets/AllSvgs";
import { importConfig } from "../../Config/importConfig";
const problems = [
  { icon: "dollarIcon", text: "Pay for expensive design costs" },
  { icon: "aSignIcon", text: "Manually create and repurpose each ad creative" },
  { icon: "clockIcon", text: "Spend hours designing and creating copy" },
  {
    icon: "settingPhoneIcon",
    text: "Setup campaigns, deploy, monitor, and consistently optimize",
  },
];
const data = [
  "Remix winning ads for dirt cheap",
  "Make ads in minutes",
  "AI generated copy that matches your brand voice",
  "Deploy campaigns on autopilot with Nexa AI",
  "Let Nexa boost the right creative",
  "Generate Sales $$$ on autopilot",
];
const ProblemAndSolution = () => {
  return (
    <section className="px-4 sm:px-6 md:px-[7.5rem] py-[5rem]" id="solutions">
      <div className="flex flex-col items-center w-full gap-4 mb-10">
        <h2 className="text-5xl font-medium tracking-tighter leading-none text-[#181818] max-md:max-w-full max-md:text-4xl">
          Problem and Solution
        </h2>
        <p className="text-lg tracking-[-0.01125rem] text-[#696969] max-md:max-w-full text-center">
          Maximize Engagement, Minimize Effort with Nexa
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {problems?.map((problem, index) => (
            <motion.article
              key={index}
              className="flex gap-6 items-center border border-[#E2E2E2] p-6 rounded-2xl"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex justify-center items-center rounded-xl h-[60px] w-[60px]">
                <div
                  className={`w-[3.25rem] h-[3.25rem] rounded-md flex items-center justify-center`}
                  style={{
                    background:
                      "linear-gradient(85deg, #535353 1.44%, #3E3E3E 99.78%)",
                  }}
                >
                  <AllSvgs type={problem.icon} />
                </div>
              </div>
              <p className="text-[#2C2C2C] text-xl font-[500] tracking-[-0.025rem]">
                {problem.text}
              </p>
            </motion.article>
          ))}
        </div>
        <motion.div
          className="w-full sm:w-full md:w-full lg:w-1/2 flex flex-col border-2 min-h-[510px] h-auto rounded-2xl p-3 lg:p-6"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.2 }}
          style={{
            backgroundImage: `url('${importConfig.bannerBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-[#fff] text-xl font-[500] tracking-[-0.025rem] mt-4">
            Replace multiple tools with one powerful platform{" "}
          </p>
          <div className="flex flex-col gap-2 bg-white rounded-[1rem] p-3 mt-8 w-full">
            {data?.map((el, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <AllSvgs type={"priceTickIcon"} />
                <p className="text-[#2C2C2C] text-xl font-[500] tracking-[-0.025rem]">
                  {el}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemAndSolution;
