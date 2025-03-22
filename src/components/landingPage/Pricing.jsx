import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { importConfig } from "../../Config/importConfig";
import AllSvgs from "../../assets/AllSvgs";

const plans = [
  {
    name: "Basic",
    subtitle: "For businesses",
    description: "Best for growing businesses",
    price: "29",
    features: [
      "100 monthly ad creative downloads",
      "Export templates to Canva, Figma",
      "Unlimited recreates for any generated ads",
      "Access 200+ creatives in template library",
    ],
    buttonText: "Get started",
  },
  {
    name: "Pro",
    subtitle: "For Team",
    description: "For power users and teams",
    price: "79",
    features: [
      "1000 monthly ad creatives downloads",
      "Company + Competitor Research",
      "Export templates to Canva, Figma",
      "Scheduling + Ad management inside Adbot",
      "Advanced analytics",
      "Unlimited re-creates for any generated ad",
      "Access 200+ creatives in template library",
    ],
    buttonText: "Subscribe now",
  },
];
const Pricing = () => {
  const ref = useRef(null);
  const liRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const liView = useInView(liRef, { once: true });
  return (
    <div ref={ref} className="relative">
      <section
        className="w-full min-h-[130vh] inset-0 flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('${importConfig.footerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scaleY(-1)",
        }}
      ></section>
      <motion.div
        className="w-full absolute top-[6.25rem] flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[#fff] text-[3rem] leading-[3.5rem] font-[500] tracking-[-0.06rem]">
          Simple and Flexible Pricing
        </p>
        <p className="text-[#B0B0B0] text-[1.1875rem] leading-[1.875rem] font-[400]">
          Affordable Plans That Grow With You
        </p>
      </motion.div>
      <div className="flex gap-10 justify-center mx-auto my-0 max-w-[1200px] max-md:flex-col absolute top-[15rem] left-[7.5rem] px-[5rem]">
        {plans.map((plan, index) => (
          <motion.article
            key={index}
            className={`relative flex-1 p-8 rounded-xl min-w-[32rem] h-auto ${
              plan.name === "Pro"
                ? "bg-white/10 border border-[#696969]"
                : "bg-[#fff]"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="mb-6 flex items-center justify-start gap-4">
              <div
                className={`mb-4 w-14 h-14 bg-[#E2E2E2] rounded-lg flex items-center justify-center`}
              >
                {plan.name === "Basic" ? (
                  <AllSvgs type={"basicPriceIcon"} />
                ) : (
                  <AllSvgs type={"proPriceIcon"} />
                )}
              </div>
              <div className="flex flex-col items-start justify-start h-[4.5rem]">
                <p
                  className={`text-base font-[400] ${
                    plan.name === "Pro" ? "text-[#E2E2E2]" : "text-[#535353]"
                  } `}
                >
                  {plan.subtitle}
                </p>
                <h3
                  className={`text-xl ${
                    plan.name === "Pro" ? "text-[#fff]" : "text-[#181818]"
                  } tracking-[-0.025rem] font-semibold`}
                >
                  {plan.name}
                </h3>
              </div>
            </div>
            <p
              className={`${
                plan.name === "Pro" ? "text-[#E2E2E2]" : "text-[#808080]"
              } text-sm font-[400] mb-4`}
            >
              {plan.description}
            </p>
            <div className="mb-6">
              <span
                className={`text-[3rem] leading-[3.75rem] tracking-[-0.06rem] font-semibold ${
                  plan.name === "Pro" ? "text-[#fff]" : "text-[#181818]"
                }`}
              >
                ${plan.price}{" "}
              </span>
              <span
                className={`text-base font-[500] ${
                  plan.name === "Pro" ? "text-[#E2E2E2]" : "text-[#535353]"
                }`}
              >
                /monthly
              </span>
            </div>
            <p
              className={`text-sm font-[600] mb-4 ${
                plan.name === "Pro" ? "text-[#fff]" : "text-[#181818]"
              }`}
            >
              What’s included
            </p>
            <ul className="flex flex-col gap-3.5 mb-6">
              {plan.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  ref={liRef}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -100 }}
                  animate={liView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + idx * 0.1 }}
                >
                  <AllSvgs
                    type={"priceTickIcon"}
                    fillColor={plan.name === "Pro" ? "#B0B0B0" : ""}
                  />
                  <span
                    className={`${
                      plan.name === "Pro"
                        ? "text-[#E2E2E2]"
                        : "text-[#535353] text-sm font-[400]"
                    }`}
                  >
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
            {plan.name === "Pro" ? (
              <button
                className={`p-3 w-full text-white rounded-[0.75rem] border border-white border-solid cursor-pointer`}
                style={{
                  background:
                    plan.name === "Pro" && "rgba(255, 255, 255, 0.08)",
                }}
              >
                {plan.buttonText}
              </button>
            ) : (
              <button className="absolute bottom-8 right-8 left-8">
                <img
                  src={importConfig.getStartedPriceButton}
                  alt="getStartedPriceButton"
                />
              </button>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
