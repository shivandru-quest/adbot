import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { importConfig } from "../../Config/importConfig";
const LoginSuccessModal = ({ isOpen, onClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-[1.25rem] p-8 w-[25rem] max-w-[25rem] h-[22rem] flex flex-col items-center justify-center gap-6"
            style={{ boxShadow: "0px 8px 20px 0px rgba(255, 255, 255, 0.10)" }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center w-40 h-36">
              <img
                src={importConfig.penIcon}
                alt="penIcon"
                className="w-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-3 w-full items-center">
              <p className="text-[#181818] font-[600] text-[1.5rem] leading-[2rem]">
                You're All Set!
              </p>
              <p className="text-[#808080] text-base font-[400]">
                Start Creating, Automating, and Winning!
              </p>
            </div>
            <button
              className="flex items-center justify-center"
              onClick={onClick}
            >
              <img
                src={importConfig.goToDashboardButton}
                alt="goToDashboardButton"
              />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginSuccessModal;
