import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCreditCard, FiLock } from 'react-icons/fi';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to confirmation page with plan details
      navigate('/subscription/confirmation', { state: { plan } });
    }, 2000);
  };

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-indigo-600 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6">Complete Your Purchase</h1>

          {/* Plan Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between items-center">
              <span>{plan?.name} Plan</span>
              <span className="font-semibold">${plan?.price}</span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <FiCreditCard className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg text-white flex items-center justify-center space-x-2 ${
                  isProcessing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <FiLock className="w-4 h-4" />
                <span>
                  {isProcessing ? 'Processing...' : `Pay $${plan?.price}`}
                </span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;