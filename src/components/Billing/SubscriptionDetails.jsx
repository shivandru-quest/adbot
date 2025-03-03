import { motion } from 'framer-motion';
import { FiCreditCard, FiCalendar, FiActivity } from 'react-icons/fi';

const SubscriptionDetails = () => {
  const currentPlan = {
    name: 'Basic Plan',
    price: '$29.00',
    billingCycle: 'Monthly',
    nextBilling: 'April 1, 2024',
    status: 'Active',
    usageStats: {
      adsGenerated: 23,
      remainingCredits: 27,
      totalCredits: 50
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500">Plan</div>
            <div className="font-semibold text-gray-900">{currentPlan.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Price</div>
            <div className="font-semibold text-gray-900">
              {currentPlan.price}/{currentPlan.billingCycle.toLowerCase()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Status</div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {currentPlan.status}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">Ads Generated</div>
              <FiActivity className="text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {currentPlan.usageStats.adsGenerated}
            </div>
            <div className="text-sm text-gray-500">This month</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">Remaining Credits</div>
              <FiCreditCard className="text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {currentPlan.usageStats.remainingCredits}
            </div>
            <div className="text-sm text-gray-500">
              of {currentPlan.usageStats.totalCredits}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">Next Billing</div>
              <FiCalendar className="text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {currentPlan.nextBilling}
            </div>
            <div className="text-sm text-gray-500">Auto-renewal</div>
          </motion.div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiCreditCard className="text-gray-400 mr-3" />
              <div>
                <div className="font-medium">Visa ending in 4242</div>
                <div className="text-sm text-gray-500">Expires 12/24</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Update
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;