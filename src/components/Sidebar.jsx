import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState, useContext } from "react";
import {
  FiGrid,
  FiLayout,
  FiCreditCard,
  FiHelpCircle,
  FiLogOut,
  FiMessageSquare,
  FiPlayCircle,
  FiPlusCircle,
  FiSettings,
} from "react-icons/fi";
import LogoutModal from "./LogoutModal";
import { AppContext } from "../context/AppContext";
import { clearAllCookies } from "../Config/generalFunctions";
import AllSvgs from "../assets/AllSvgs";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { dispatch } = useContext(AppContext);
  const menuItems = [
    { icon: FiPlayCircle, label: "Get Started", path: "/get-started" },
    { icon: FiGrid, label: "Dashboard", path: "/dashboard" },
    // { icon: FiPlusCircle, label: "Create Ad", path: "/create" },
    { icon: FiLayout, label: "Templates", path: "/templates" },
    { icon: FiSettings, label: "Settings", path: "/settings" },
    // { icon: FiCreditCard, label: "Subscription", path: "/subscription" },
    // { icon: FiMessageSquare, label: "Contact", path: "/contact" },
    // { icon: FiHelpCircle, label: "Help", path: "/help" },
  ];

  const handleLogoutConfirm = () => {
    localStorage.clear();
    clearAllCookies();
    dispatch({ type: "user/isAuthenticated", payload: false });
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <div className="w-full flex">
      <div className="flex flex-col border w-60 h-screen">
        <div className="p-3">
          <Link to="/dashboard" className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-indigo-600 font-bold text-2xl mb-8"
            >
              Adbot.ai
            </motion.div>
          </Link>
          <nav className="space-y-1">
            {menuItems?.map((item) => (
              <Link key={item.path} to={item.path} className="block">
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer text-sm ${
                    location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-600 font-[500]"
                      : "text-[#696969] hover:bg-indigo-50 hover:text-indigo-600 font-[400]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 flex flex-col gap-4">
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 p-2 text-[#808080] hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer w-full text-sm"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
          <motion.div
            whileHover={{ x: 5 }}
            className={`flex items-center justify-between space-x-2 p-2 rounded-lg cursor-pointer text-sm text-[#808080] font-[400]
            `}
          >
            <div className="flex items-center gap-2">
              <AllSvgs type={"trophyIcon"} />
              <span>Credits</span>
            </div>
            <div>
              <span>24/200</span>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className={`flex items-center justify-between space-x-2 p-2 rounded-lg cursor-pointer text-sm text-[#535353] font-[500]
            `}
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-[#D9D9D9] w-8 h-8"></div>
              <span>Name</span>
            </div>
            <div>
              <AllSvgs type={"rightArrowIcon"} />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col w-[calc(100%-240px)]">
        <div className="py-4 px-6 border-b border-[#C9C9C9] w-full h-[3.25rem] text-[#2C2C2C] text-sm font-normal">
          Topbar
        </div>
        <div className="overflow-y-auto h-[calc(100vh-3.25rem)]">
          {children}
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </div>
  );
};

export default Sidebar;
