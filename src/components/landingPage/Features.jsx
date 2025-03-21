import React from "react";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";
import { importConfig } from "../../Config/importConfig";
const features = [
  {
    title: "AI Ad Creation ",
    description:
      "Nexa does research on your website and competitors, and creates high impact ads that win in your industry, that can be customized for your brand + messaging.",
    image: importConfig.featuresIcon1,
  },
  {
    title: "Automated Scheduling & Publishing",
    description:
      "Publish or schedule ads for all your favorite platforms from one single place",
    image: importConfig.featuresIcon2,
  },
  {
    title: "AI Optimization ",
    description:
      "Nexa automatically tracks the highest performing campaigns/variants and quickly boosts those to generate the best ROAS.",
    image: importConfig.featuresIcon3,
  },
];
const Features = () => {
  return (
    <div className="px-[7.5rem] py-[4rem]">
      <section>
        <SectionHeader
          title="Features"
          subtitle="Smart Automation for Seamless Ad Campaigns"
        />
        <div className="flex flex-col gap-[7.25rem]">
          {features?.map((feature, index) => (
            <motion.article
              key={index}
              className={`flex items-center justify-between gap-6 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-[36rem] h-auto"
              />
              <div className="px-[4rem] py-[2.5rem] w-[28rem] flex flex-col gap-4">
                <h3 className="text-[#181818] text-[1.875rem] font-[500] leading-[2.5rem] tracking-[-0.01875rem]">
                  {feature.title}
                </h3>
                <p className="text-[#535353] text-[1.125rem] font-[400] leading-[1.75rem] tracking-[-0.01125rem]">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
