import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCreditCard, FiLock, FiShield, FiCheck } from 'react-icons/fi';
import { SiVisa, SiMastercard, SiAmericanexpress } from 'react-icons/si';
import PaymentForm from './PaymentForm';
import PlanSummary from './PlanSummary';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (paymentDetails) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/subscription/confirmation', { 
        state: { 
          plan,
          paymentDetails: {
            last4: paymentDetails.cardNumber.slice(-4),
            expiryDate: paymentDetails.expiryDate
          }
        } 
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Payment Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Secure Checkout</h1>
              <div className="flex items-center text-gray-600">
                <FiLock className="mr-2" />
                <span className="text-sm">Your payment info is secure</span>
              </div>
            </div>

            <PaymentForm onSubmit={handlePayment} isProcessing={isProcessing} />

            {/* Payment Security Badges */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4 text-gray-400">
                  <SiVisa size={32} />
                  <SiMastercard size={32} />
                  <SiAmericanexpress size={32} />
                </div>
                <div className="flex items-center text-green-600">
                  <FiShield className="mr-2" />
                  <span className="text-sm font-medium">256-bit encryption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Plan Summary */}
          <div>
            <PlanSummary plan={plan} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;