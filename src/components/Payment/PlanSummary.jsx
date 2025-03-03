import { motion } from 'framer-motion';
import { FiCheck, FiClock } from 'react-icons/fi';

const PlanSummary = ({ plan }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {/* Plan Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{plan?.name} Plan</h3>
              <p className="text-sm text-gray-600">
                {plan?.billingCycle === 'annual' ? 'Annual Billing' : 'Monthly Billing'}
              </p>
            </div>
            <span className="font-semibold">${plan?.price}</span>
          </div>

          {plan?.yearlyDiscount && (
            <div className="mt-2 text-sm text-green-600">
              <FiCheck className="inline mr-1" />
              Save {plan.yearlyDiscount} with annual billing
            </div>
          )}
        </div>

        {/* Features List */}
        <div>
          <h4 className="font-medium mb-2">What's included:</h4>
          <ul className="space-y-2">
            {plan?.features?.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <FiCheck className="text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Total</span>
            <span className="text-2xl font-bold">${plan?.price}</span>
          </div>
          <p className="text-sm text-gray-600">
            Next billing date: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Money-back Guarantee */}
        <div className="bg-indigo-50 rounded-lg p-4 mt-6">
          <div className="flex items-center text-indigo-600">
            <FiClock className="mr-2" />
            <span className="font-medium">14-day money-back guarantee</span>
          </div>
          <p className="text-sm text-indigo-600 mt-1">
            Not satisfied? Get a full refund within 14 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;