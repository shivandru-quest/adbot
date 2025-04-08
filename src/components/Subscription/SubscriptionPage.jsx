import { useState } from "react";
import PlanComparison from "./PlanComparison";
import PriceCard from "./PriceCard";
import { motion } from "framer-motion";

const SubscriptionPage = () => {
  const [showComparison, setShowComparison] = useState(false);

  const plans = [
    {
      tier: { title: "Free", subtitle: "For individuals" },
      price: "0",
      description: "Perfect for trying out Nexa",
      iconBgColor: "bg-gray-100",
      features: [
        "5 AI-generated ads per month",
        "Basic templates only",
        "Standard quality exports",
        "Community support",
        "Basic analytics",
        "Single user",
      ],
    },
    {
      tier: { title: "Basic", subtitle: "For businesses" },
      price: "29",
      description: "Best for growing businesses",
      iconBgColor: "bg-gray-900",
      features: [
        "50 AI-generated ads per month",
        "All templates",
        "HD exports",
        "Priority email support",
        "Advanced analytics",
        "Brand kit",
        "3 team members",
      ],
    },
    {
      tier: { title: "Pro", subtitle: "For Team" },
      price: "79",
      description: "For power users and teams",
      iconBgColor: "bg-gray-600",
      features: [
        "Unlimited AI-generated ads",
        "Custom templates",
        "4K exports",
        "24/7 priority support",
        "Advanced analytics",
        "API access",
        "Unlimited team members",
      ],
    },
  ];

  return (
    <motion.div
      className="h-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center">
            <h1 className="text-[#0D0D0D] text-[2.25rem] leading-[2.75rem] tracking-[-0.045rem] font-[600]">
              Pricing & Payment
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((tier, index) => (
            <PriceCard
              key={index}
              tier={tier.tier}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              iconBgColor={tier.iconBgColor}
            />
          ))}
        </div>

        {/* Compare Plans Button */}
        {/* <div className="text-center">
          <button
            onClick={() => setShowComparison(true)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Compare all features
          </button>
        </div> */}

        {/* Comparison Modal */}
        {showComparison && (
          <PlanComparison onClose={() => setShowComparison(false)} />
        )}
      </div>
    </motion.div>
  );
};

export default SubscriptionPage;
