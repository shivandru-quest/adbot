import { motion } from 'framer-motion';
import { FiDownload, FiFileText } from 'react-icons/fi';

const InvoiceHistory = () => {
  const invoices = [
    {
      id: 'INV-2024-001',
      date: 'Mar 1, 2024',
      amount: '$29.00',
      status: 'Paid',
      description: 'Basic Plan - Monthly'
    },
    {
      id: 'INV-2024-002',
      date: 'Feb 1, 2024',
      amount: '$29.00',
      status: 'Paid',
      description: 'Basic Plan - Monthly'
    },
    {
      id: 'INV-2024-003',
      date: 'Jan 1, 2024',
      amount: '$29.00',
      status: 'Paid',
      description: 'Basic Plan - Monthly'
    }
  ];

  return (
    <div>
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <motion.tr
                key={invoice.id}
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiFileText className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{invoice.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FiDownload />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceHistory;