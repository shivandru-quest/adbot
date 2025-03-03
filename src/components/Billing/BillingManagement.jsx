import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiAlertCircle, FiCreditCard, FiCalendar, FiArrowUpCircle } from 'react-icons/fi';
import CancelSubscriptionModal from './CancelSubscriptionModal';

const BillingManagement = () => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const currentPlan = {
    name: 'Basic Plan',
    price: 29,
    renewalDate: 'April 1, 2024',
    status: 'Active',
    paymentMethod: {
      type: 'Visa',
      last4: '4242',
      expiry: '12/24'
    }
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      date: 'Mar 1, 2024',
      amount: 29.00,
      status: 'Paid',
      period: 'Mar 1 - Mar 31, 2024'
    },
    {
      id: 'INV-2024-002',
      date: 'Feb 1, 2024',
      amount: 29.00,
      status: 'Paid',
      period: 'Feb 1 - Feb 29, 2024'
    },
    {
      id: 'INV-2024-003',
      date: 'Jan 1, 2024',
      amount: 29.00,
      status: 'Paid',
      period: 'Jan 1 - Jan 31, 2024'
    }
  ];

  const handleDownloadInvoice = (invoiceId) => {
    // Implementation for invoice download
    console.log('Downloading invoice:', invoiceId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Current Plan Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Current Plan</h2>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">${currentPlan.price}</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/subscription')}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            <FiArrowUpCircle className="mr-2" />
            Upgrade Plan
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <FiCalendar className="mt-1 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Next Billing Date</p>
              <p className="font-medium">{currentPlan.renewalDate}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <FiCreditCard className="mt-1 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">
                {currentPlan.paymentMethod.type} ending in {currentPlan.paymentMethod.last4}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FiAlertCircle className="mt-1 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {currentPlan.status}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCancelModal(true)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Cancel Subscription
          </motion.button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Invoice</th>
                <th className="px-6 py-3">Period</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <motion.tr
                  key={invoice.id}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{invoice.id}</span>
                    <div className="text-sm text-gray-500">{invoice.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiDownload className="w-5 h-5" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <CancelSubscriptionModal onClose={() => setShowCancelModal(false)} />
      )}
    </div>
  );
};

export default BillingManagement;