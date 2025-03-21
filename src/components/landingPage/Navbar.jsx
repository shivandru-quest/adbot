import React from "react";
import { motion } from "framer-motion";
import AllSvgs from "../../assets/AllSvgs";
import { importConfig } from "../../Config/importConfig";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <motion.header
      className="flex flex-wrap gap-6 items-center px-6 py-4 w-full font-semibold text-center bg-white min-h-[4.7rem] max-md:px-5 max-md:max-w-full sticky top-0 z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div>
        <AllSvgs type={"nexaLogoTopBar"} />
      </div>
      <nav className="flex flex-col flex-1 shrink items-start self-stretch my-auto text-sm leading-none basis-0 min-w-60 text-neutral-900 max-md:max-w-full">
        <ul className="flex gap-2 items-center">
          <li>
            <button className="gap-1 self-stretch p-1.5 my-auto whitespace-nowrap rounded-md text-[#181818] text-sm font-[600]">
              Solutions
            </button>
          </li>
          <li>
            <button className="gap-1 self-stretch p-1.5 my-auto rounded-md text-[#181818] text-sm font-[600]">
              How It Works
            </button>
          </li>
          <li>
            <button className="gap-1 self-stretch p-1.5 my-auto whitespace-nowrap rounded-md text-[#181818] text-sm font-[600]">
              Features
            </button>
          </li>
          <li>
            <button className="gap-1 self-stretch p-1.5 my-auto whitespace-nowrap rounded-md text-[#181818] text-sm font-[600]">
              Pricing
            </button>
          </li>
          <li>
            <button className="gap-1 self-stretch p-1.5 my-auto rounded-md text-[#181818] text-sm font-[600]">
              Use Cases
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex gap-2 items-center self-stretch my-auto text-xs leading-none">
        <button
          className="text-[#181818] text-xs font-[600] px-3 py-2 flex items-center justify-center border border-[#E2E2E2] rounded-md"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
        <button
          className="h-8 w-28 flex items-center justify-center"
          onClick={() => navigate("/get-started")}
        >
          <img
            src={importConfig.getStartedButtonIcon}
            alt="getStartedButtonIcon"
          />
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
