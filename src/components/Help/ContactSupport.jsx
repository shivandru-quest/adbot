import { motion } from 'framer-motion';
import { FiMessageSquare, FiMail, FiClock } from 'react-icons/fi';

const ContactSupport = () => {
  return (
    <div className="space-y-6">
      {/* Support Hours */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <FiClock className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="font-semibold">Support Hours</h3>
        </div>
        <p className="text-gray-600">
          Monday - Friday<br />
          9:00 AM - 6:00 PM EST
        </p>
      </div>

      {/* Live Chat */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-sm p-6 cursor-pointer"
      >
        <div className="flex items-center mb-4">
          <FiMessageSquare className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="font-semibold">Live Chat Support</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Get instant help from our support team
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Start Chat
        </motion.button>
      </motion.div>

      {/* Email Support */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <FiMail className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="font-semibold">Email Support</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Response within 24 hours
        </p>
        <a href="mailto:support@adbot.ai" className="text-indigo-600 hover:text-indigo-700">
          support@adbot.ai
        </a>
      </div>

      {/* Feedback Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold mb-4">Submit Feedback</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>General Feedback</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe your feedback..."
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Submit Feedback
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ContactSupport;