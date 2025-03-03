import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertTriangle } from 'react-icons/fi';

const CancelSubscriptionModal = ({ onClose }) => {
  const handleCancel = () => {
    // Implementation for subscription cancellation
    console.log('Subscription cancelled');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center text-red-600">
              <FiAlertTriangle className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold">Cancel Subscription</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel your subscription? You'll lose access to:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• AI-powered ad generation</li>
              <li>• Premium templates</li>
              <li>• Advanced analytics</li>
              <li>• Priority support</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              Your subscription will remain active until the end of the current billing period on April 1, 2024.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Keep Subscription
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Cancel Subscription
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CancelSubscriptionModal;