import React from "react";
import AllSvgs from "../../assets/AllSvgs";
import { button } from "framer-motion/client";
import { importConfig } from "../../Config/importConfig";

const PriceCard = ({
  tier,
  price,
  description,
  features,
  iconBgColor,
  index,
}) => {
  return (
    <div key={index} className="relative">
      <section className="flex-1 h-[35rem] p-8 rounded-xl border border-[#E2E2E2] max-sm:p-4">
        <div className="w-full flex items-center justify-start gap-4">
          <div
            className={`mb-4 w-14 h-14 bg-[#E2E2E2] rounded-lg flex items-center justify-center`}
          >
            {tier.title === "Free" ? (
              <AllSvgs type={"freePriceIcon"} />
            ) : tier.title === "Basic" ? (
              <AllSvgs type={"basicPriceIcon"} />
            ) : (
              <AllSvgs type={"proPriceIcon"} />
            )}
          </div>
          <div className="flex flex-col items-start justify-start h-[4.5rem]">
            <p className="text-base font-[400] text-[#6F6C90]">
              {tier.subtitle}
            </p>
            <h3 className="text-xl text-[#170F49] tracking-[-0.025rem] font-semibold">
              {tier.title}
            </h3>
          </div>
        </div>
        <p className="mb-6 text-sm text-[#808080] font-[400]">{description}</p>
        <div className="mb-6 text-4xl font-semibold">
          <span>${price}</span>
          <span className="text-base text-[#535353] font-[500]">/monthly</span>
        </div>
        <section className="mb-6">
          <h4 className="mb-4 text-sm text-[#181818] font-[600]">
            What's included
          </h4>
          <ul className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex gap-3 items-center text-sm text-gray-700"
              >
                <AllSvgs type={"priceTickIcon"} />
                <span className="text-[#535353] text-sm font-[400]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </section>
        {tier.title === "Free" ? (
          <button
            className={`absolute bottom-8 right-4 left-4 w-[90%] px-3 py-2 border border-[#E2E2E2] text-sm font-[600] text-center rounded-md cursor-pointer ${
              tier.title === "Free" ? "text-[#181818]" : "text-[#FAFAFA]"
            }`}
          >
            Get started
          </button>
        ) : (
          <button>
            <img
              src={importConfig.subscribeNowButton}
              alt="subscribeNowButton"
            />
          </button>
        )}
      </section>
    </div>
  );
};

export default PriceCard;
