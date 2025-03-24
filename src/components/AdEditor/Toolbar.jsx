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
import AllSvgs from "../../assets/AllSvgs";

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
  setSelectedId,
  setToolbarSelectedElement,
  toolbarSelectedElement,
}) => {
  function downloading() {
    setSelectedId(null);
    setTimeout(() => {
      downloadCanvas();
    }, 1000);
  }

  function handleToolBarClick(tool) {
    if (tool === toolbarSelectedElement) {
      setToolbarSelectedElement(null);
    } else {
      setToolbarSelectedElement(tool);
    }
  }
  return (
    <div className="w-full flex flex-col items-center h-full space-y-4 gap-1">
      <div
        className={`w-full flex flex-col items-center justify-center cursor-pointer py-2 ${
          toolbarSelectedElement === "text" ? "rounded-md bg-[#E2E2E2]" : ""
        }`}
        onClick={() => {
          onAddText();
          setToolbarSelectedElement("text");
        }}
      >
        <div className="w-full p-2 flex justify-center">
          <AllSvgs
            type={"textIcon"}
            fillColor={
              toolbarSelectedElement === "text" ? "#181818" : "#535353"
            }
          />
        </div>
        <span
          className={`${
            toolbarSelectedElement === "text"
              ? "text-[#181818] font-[600]"
              : "text-[#535353] font-[500]"
          } text-sm `}
        >
          Text
        </span>
      </div>
      <div
        className={`w-full flex flex-col items-center justify-center cursor-pointer py-2 ${
          toolbarSelectedElement === "media" ? "rounded-md bg-[#E2E2E2]" : ""
        }`}
        onClick={() => handleToolBarClick("media")}
        // onClick={() => setToolbarSelectedElement("media")}
      >
        <div className="w-full p-2 flex justify-center">
          <AllSvgs
            type={"mediaIcon"}
            fillColor={
              toolbarSelectedElement === "media" ? "#181818" : "#535353"
            }
          />
        </div>
        <span
          className={`${
            toolbarSelectedElement === "media"
              ? "text-[#181818] font-[600]"
              : "text-[#535353] font-[500]"
          } text-sm `}
        >
          Media
        </span>
      </div>
      <div
        className={`w-full flex flex-col items-center justify-center cursor-pointer py-2 ${
          toolbarSelectedElement === "elements" ? "rounded-md bg-[#E2E2E2]" : ""
        }`}
        onClick={() => handleToolBarClick("elements")}
        // onClick={() => setToolbarSelectedElement("elements")}
      >
        <div className="w-full p-2 flex justify-center">
          <AllSvgs
            type={"elementsIcon"}
            fillColor={
              toolbarSelectedElement === "elements" ? "#181818" : "#535353"
            }
          />
        </div>
        <span
          className={`${
            toolbarSelectedElement === "elements"
              ? "text-[#181818] font-[600]"
              : "text-[#535353] font-[500]"
          } text-sm `}
        >
          Elements
        </span>
      </div>
      {/* <div
        className={`w-full flex flex-col items-center justify-center cursor-pointer py-2 ${
          toolbarSelectedElement === "theme" ? "rounded-md bg-[#E2E2E2]" : ""
        }`}
        onClick={() => handleToolBarClick("theme")}
        // onClick={() => setToolbarSelectedElement("theme")}
      >
        <div className="w-full p-2 flex justify-center">
          <AllSvgs
            type={"colorIcon"}
            fillColor={
              toolbarSelectedElement === "theme" ? "#181818" : "#535353"
            }
          />
        </div>
        <span
          className={`${
            toolbarSelectedElement === "theme"
              ? "text-[#181818] font-[600]"
              : "text-[#535353] font-[500]"
          } text-sm `}
        >
          Theme
        </span>
      </div> */}

      
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddImage}
        className=" text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
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
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onAddShape("rectangle")}
        className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
        title="Add Rectangle"
      >
        <FiSquare size={24} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onAddShape("circle")}
        className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
        title="Add Circle"
      >
        <FiCircle size={24} />
      </motion.button>
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
        onClick={downloading}
        className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
        title="Download Canvas"
      >
        <FiDownload size={24} />
      </motion.button>

      <div className="w-8 h-px bg-gray-200 my-2" />
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
      </motion.button> */}
    </div>
  );
};

export default Toolbar;
