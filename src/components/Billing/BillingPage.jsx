import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiDownload, FiCreditCard } from 'react-icons/fi';
import InvoiceHistory from './InvoiceHistory';
import SubscriptionDetails from './SubscriptionDetails';

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('subscription');

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center text-gray-600 hover:text-indigo-600"
              >
                <FiArrowLeft className="mr-2" />
                Back to Dashboard
              </motion.button>
            </Link>
            <h1 className="text-3xl font-bold ml-8">Billing & Subscription</h1>
          </div>
          <Link to="/pricing">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              <FiCreditCard className="mr-2" />
              Upgrade Plan
            </motion.button>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('subscription')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'subscription'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Subscription Details
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'invoices'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Invoice History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'subscription' ? (
              <SubscriptionDetails />
            ) : (
              <InvoiceHistory />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;