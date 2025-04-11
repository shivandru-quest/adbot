import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AllSvgs from "../../assets/AllSvgs";
import { useNavigate } from "react-router-dom";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const LandingPageModal = ({ isOpen, onClose, element, setSelectedItem }) => {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex flex-col items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-transparent dark:bg-gray-900 rounded-2xl w-full lg:max-w-lg sm:max-w-[80%] relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={() => {
                onClose();
                setSelectedItem(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
            >
              <AllSvgs type={"circleCrossIcon"} />
            </button>
            <div className="w-full aspect-video sm:aspect-square h-auto">
              <img
                src={element.imgFile}
                alt="imgFile"
                className="w-full object-contain rounded-[1.2rem]"
              />
            </div>
            <div className="w-full flex items-center justify-center mt-4 sm:mt-6 md:mt-0 lg:mt-0">
              <button
                className="text-[#181818] text-base px-3 py-2 font-[600] rounded-md border border-[#E2E2E2] bg-white"
                onClick={() => navigate("/editor/new")}
              >
                Customise this template
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPageModal;
