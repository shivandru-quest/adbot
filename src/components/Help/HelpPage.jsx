import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiMessageSquare, FiMail, FiBook, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import SearchBar from './SearchBar';
import FAQSection from './FAQSection';
import TroubleshootingGuide from './TroubleshootingGuide';
import ContactSupport from './ContactSupport';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
            <h1 className="text-3xl font-bold ml-8">Help & Support</h1>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            How can we help you today?
          </h2>
          <SearchBar onSearch={setSearchQuery} />
          
          <div className="flex justify-center mt-6 space-x-4">
            <QuickAction
              icon={FiMessageSquare}
              label="Live Chat"
              onClick={() => {}} // Add live chat handler
            />
            <QuickAction
              icon={FiMail}
              label="Email Support"
              onClick={() => {}} // Add email support handler
            />
            <QuickAction
              icon={FiBook}
              label="Knowledge Base"
              onClick={() => {}} // Add knowledge base handler
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - FAQs */}
          <div className="md:col-span-2">
            <FAQSection searchQuery={searchQuery} />
            <TroubleshootingGuide />
          </div>

          {/* Right Column - Contact Support */}
          <div className="md:col-span-1">
            <ContactSupport />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ icon: Icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100"
  >
    <Icon className="w-6 h-6 text-indigo-600 mb-2" />
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </motion.button>
);

export default HelpPage;