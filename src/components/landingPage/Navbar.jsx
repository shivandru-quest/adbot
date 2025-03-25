import React, { useState } from "react";
import { motion } from "framer-motion";
import AllSvgs from "../../assets/AllSvgs";
import { importConfig } from "../../Config/importConfig";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }
  return (
    <motion.header
      className={`flex justify-between gap-6 items-center px-6 py-4 w-full font-semibold text-center bg-white min-h-[4.7rem] max-md:px-5 max-md:max-w-full sticky top-0 z-10`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div>
        <AllSvgs type={"nexaLogoTopBar"} />
      </div>
      <nav className="hidden lg:flex flex-col justify-between flex-1 shrink items-start self-stretch my-auto text-sm leading-none basis-0 min-w-60 text-neutral-900 max-md:max-w-full">
        <ul className="flex gap-2 items-center">
          <li>
            <a
              href="#solutions"
              className="gap-1 self-stretch p-1.5 my-auto whitespace-nowrap rounded-md text-[#181818] text-sm font-[600]"
            >
              Solutions
            </a>
          </li>
          <li>
            <a
              href="#howitworks"
              className="gap-1 self-stretch p-1.5 my-auto rounded-md text-[#181818] text-sm font-[600]"
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="gap-1 self-stretch p-1.5 my-auto whitespace-nowrap rounded-md text-[#181818] text-sm font-[600]"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="gap-1 self-stretch p-1.5 my-auto whitespace-nowrap rounded-md text-[#181818] text-sm font-[600]"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#usecases"
              className="gap-1 self-stretch p-1.5 my-auto rounded-md text-[#181818] text-sm font-[600]"
            >
              Use Cases
            </a>
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
          className="hidden h-8 w-28 lg:flex items-center justify-center"
          onClick={() => navigate("/get-started")}
        >
          <img
            src={importConfig.getStartedButtonIcon}
            alt="getStartedButtonIcon"
          />
        </button>
        <button
          className="lg:hidden text-[#181818] text-xs font-[600] px-3 py-2 md:flex items-center justify-center border border-[#E2E2E2] rounded-md"
          onClick={toggleMenu}
        >
          <RxHamburgerMenu />
        </button>
      </div>
      {menuOpen && (
        <motion.nav
          className="md:hidden flex flex-col gap-3 w-full bg-white shadow-md absolute top-full left-0 p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <ul className="flex flex-col gap-3 items-center">
            {[
              "Solutions",
              "How It Works",
              "Features",
              "Pricing",
              "Use Cases",
            ].map((item,i) => (
              <li key={i}>
                <a
                  href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
                  className="block p-2 text-[#181818] text-sm font-[600] rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Navbar;
