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

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { dispatch } = useContext(AppContext);
  const menuItems = [
    { icon: FiGrid, label: "Dashboard", path: "/dashboard" },
    { icon: FiPlayCircle, label: "Get Started", path: "/get-started" },
    { icon: FiPlusCircle, label: "Create Ad", path: "/create" },
    { icon: FiLayout, label: "Templates", path: "/templates" },
    { icon: FiSettings, label: "Settings", path: "/settings" },
    // { icon: FiCreditCard, label: "Subscription", path: "/subscription" },
    { icon: FiMessageSquare, label: "Contact", path: "/contact" },
    { icon: FiHelpCircle, label: "Help", path: "/help" },
  ];

  const handleLogoutConfirm = () => {
    localStorage.clear();
    clearAllCookies();
    dispatch({ type: "user/isAuthenticated", payload: false });
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-sm z-20">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-indigo-600 font-bold text-2xl mb-8"
            >
              Adbot.ai
            </motion.div>
          </Link>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${
                    location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer w-full"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
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
