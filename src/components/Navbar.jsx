import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-indigo-600 font-bold text-2xl"
              >
                Adbot.ai
              </motion.div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
            <Link to="/templates" className="text-gray-700 hover:text-indigo-600">Templates</Link>
            <Link to="/analytics" className="text-gray-700 hover:text-indigo-600">Analytics</Link>
            <Link to="/settings" className="text-gray-700 hover:text-indigo-600">Settings</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Dashboard</Link>
            <Link to="/templates" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Templates</Link>
            <Link to="/analytics" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Analytics</Link>
            <Link to="/settings" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Settings</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;