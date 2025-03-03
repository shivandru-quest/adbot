import { motion } from "framer-motion";
import {
  FiImage,
  FiType,
  FiSquare,
  FiCircle,
  FiHexagon,
  FiRotateCcw,
  FiRotateCw,
  FiDownload,
  FiScissors,
} from "react-icons/fi";

const Toolbar = ({
  onAddImage,
  onAddText,
  onAddShape,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  removeBackground,
  downloadCanvas,
}) => {
  return (
    <div className="w-16 bg-white border-r border-gray-200 py-4">
      <div className="flex flex-col items-center space-y-4">
        {/* Add Image */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddImage}
          className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          title="Add Image"
        >
          <FiImage size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={removeBackground}
          className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          title="Remove Background"
        >
          <FiScissors size={24} />
        </motion.button>

        {/* Add Text */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddText}
          className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          title="Add Text"
        >
          <FiType size={24} />
        </motion.button>

        <div className="w-8 h-px bg-gray-200 my-2" />

        {/* Add Rectangle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddShape("rectangle")}
          className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          title="Add Rectangle"
        >
          <FiSquare size={24} />
        </motion.button>

        {/* Add Circle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddShape("circle")}
          className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          title="Add Circle"
        >
          <FiCircle size={24} />
        </motion.button>

        {/* Add Hexagon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddShape("hexagon")}
          className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          title="Add Hexagon"
        >
          <FiHexagon size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadCanvas}
          className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          title="Download Canvas"
        >
          <FiDownload size={24} />
        </motion.button>

        <div className="w-8 h-px bg-gray-200 my-2" />

        {/* Undo */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-3 rounded-lg ${
            canUndo
              ? "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              : "text-gray-300 cursor-not-allowed"
          }`}
          title="Undo"
        >
          <FiRotateCcw size={24} />
        </motion.button>

        {/* Redo */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-3 rounded-lg ${
            canRedo
              ? "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              : "text-gray-300 cursor-not-allowed"
          }`}
          title="Redo"
        >
          <FiRotateCw size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default Toolbar;
