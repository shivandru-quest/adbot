import React from "react";
import AllSvgs from "../../assets/AllSvgs";

const PriceCard = ({
  tier,
  price,
  description,
  features,
  iconBgColor,
  index,
}) => {
  return (
    <div key={index}>
      <article className="flex-1 h-[35rem] p-8 rounded-xl border border-solid max-sm:p-4">
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
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="mb-2 text-sm text-gray-500">{tier.subtitle}</p>
            <h3 className="mb-1 text-xl font-semibold">{tier.title}</h3>
          </div>
        </div>
        <p className="mb-6 text-sm text-gray-500">{description}</p>
        <div className="mb-6 text-4xl font-semibold">
          <span>${price}</span>
          <span className="text-base text-gray-500 font-[normal]">
            /monthly
          </span>
        </div>
        <section className="mb-6">
          <h4 className="mb-4 text-sm font-medium">What's included</h4>
          <ul className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex gap-3 items-center text-sm text-gray-700"
              >
                <AllSvgs type={"priceTickIcon"} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
        <button
          className="w-full p-3 text-sm font-medium text-center rounded-lg border border-solid cursor-pointer"
          style={{
            background:
              tier.title !== "Free" &&
              "linear-gradient(to bottom right, var(--neutral-white-100, #FFF) 0%, #000 38%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, var(--neutral-white-100, #FFF) 0%, #000 38%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, var(--neutral-white-100, #FFF) 0%, #000 38%) top left / 50% 50% no-repeat, linear-gradient(to top right, var(--neutral-white-100, #FFF) 0%, #000 38%) top right / 50% 50% no-repeat",
          }}
        >
          {tier.title === "Free" ? "Get started" : "Subscribe now"}
        </button>
      </article>
    </div>
  );
};

export default PriceCard;
