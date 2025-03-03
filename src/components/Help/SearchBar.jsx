import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <FiSearch className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for help articles..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default SearchBar;