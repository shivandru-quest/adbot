import { motion } from 'framer-motion';

const ToolbarButton = ({ Icon, label, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
      title={label}
    >
      <Icon size={24} />
    </motion.button>
  );
};

export default ToolbarButton;