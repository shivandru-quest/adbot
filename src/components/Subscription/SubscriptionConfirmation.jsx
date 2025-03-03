import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowLeft, FiCreditCard, FiDownload, FiBarChart } from 'react-icons/fi';

const SubscriptionConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {
    plan: {
      name: 'Basic',
      price: 29,
      features: [
        '50 AI-generated ads per month',
        'All templates',
        'HD exports',
        'Priority email support',
        'Advanced analytics',
        'Brand kit',
        '3 team members'
      ]
    }
  };

  const nextBillingDate = new Date();
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheck className="w-8 h-8 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to {plan.name}!
          </h1>
          <p className="text-gray-600">
            Your subscription has been confirmed and your account is ready to use.
          </p>
        </div>

        {/* Subscription Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Plan</p>
              <p className="font-medium">{plan.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="font-medium">${plan.price}/month</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Next Billing Date</p>
              <p className="font-medium">{nextBillingDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => navigate('/subscription')}
            className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-500"
          >
            <FiCreditCard className="w-6 h-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">Manage Subscription</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => navigate('/subscription')}
            className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-500"
          >
            <FiDownload className="w-6 h-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">View Invoices</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-500"
          >
            <FiBarChart className="w-6 h-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">View Analytics</span>
          </motion.button>
        </div>

        {/* Features List */}
        <div className="bg-indigo-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold mb-4">What's included in your plan:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <FiCheck className="w-5 h-5 text-indigo-600 mr-2" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionConfirmation;