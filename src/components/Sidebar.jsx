import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState, useContext } from "react";
import {
  FiGrid,
  FiLayout,
  FiLogOut,
  FiPlayCircle,
  FiSettings,
} from "react-icons/fi";
import LogoutModal from "./LogoutModal";
import { AppContext } from "../context/AppContext";
import { clearAllCookies } from "../Config/generalFunctions";
import AllSvgs from "../assets/AllSvgs";
import { importConfig } from "../Config/importConfig";
import UserAccountMenu from "../ui/UserAccountMenu";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { dispatch, state } = useContext(AppContext);
  const menuItems = [
    { icon: FiPlayCircle, label: "Get Started", path: "/get-started" },
    { icon: FiGrid, label: "Dashboard", path: "/dashboard" },
    { icon: FiLayout, label: "Templates", path: "/templates" },
    { icon: FiSettings, label: "Settings", path: "/settings" },
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
      <div className="border w-60 h-screen hidden">
        <div className="p-3">
          <Link to="/dashboard" className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-indigo-600 font-bold text-2xl mb-8"
            >
              <AllSvgs type={"nexaLogo"} />
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
            className={`flex items-end justify-between space-x-2 p-2 rounded-lg cursor-pointer text-sm text-[#535353] font-[500]
            `}
          >
            <div className="flex items-end gap-2">
              <div className="rounded-full bg-[#D9D9D9] w-8 h-8">
                <img
                  src={state?.avatar}
                  alt="user_avatar"
                  className="rounded-full w-full object-cover"
                />
              </div>
              <span>{state?.UserName}</span>
            </div>
            <div>
              <AllSvgs type={"rightArrowIcon"} />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="py-4 px-6 border-b border-[#C9C9C9] w-full h-[4.7rem] flex items-center justify-between">
          <div className="w-fit h-full flex items-center">
            <AllSvgs type={"nexaLogoTopBar"} />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="text-[#181818] text-sm font-[600] p-[0.375rem]"
              onClick={() => navigate("/get-started")}
            >
              Home
            </button>
            <button
              className="text-[#696969] font-[500] text-sm p-[0.375rem]"
              onClick={() => navigate("/templates")}
            >
              Templates
            </button>
            <button
              className="text-[#696969] font-[500] text-sm p-[0.375rem]"
              onClick={() => navigate("/dashboard")}
            >
              My Files
            </button>
            <div className="flex items-center justify-between gap-1 cursor-pointer p-[0.375rem]">
              <AllSvgs type={"heartIconTopBar"} />
              <div className="bg-gray-100 text-[#181818] text-xs font-[600] px-[0.38rem] py-[0.12rem] rounded-md">
                50/100
              </div>
            </div>
            <button
              className="px-3 py-2 flex items-center gap-1 border border-[#E2E2E2] rounded-md"
              onClick={() => navigate("/get-started")}
            >
              <span className="text-[#181818] font-[600] text-xs">
                Get started
              </span>
              <AllSvgs type={"rightPointerTopbar"} />
              <span className="text-[#696969] font-[500] text-xs">0/4</span>
            </button>
            <button className="flex w-[6.8rem]">
              <img src={importConfig.upgradeNowButton} alt="upgradeNowButton" />
            </button>
            <div
              className={`flex items-center justify-between rounded-lg cursor-pointer text-sm gap-3 text-[#535353] font-[500]
            `}
              onMouseEnter={() => setUserMenu(true)}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#D9D9D9] w-[1.75rem] h-[1.75rem] mb-1">
                  <img
                    src={state?.avatar}
                    alt="user_avatar"
                    className="rounded-full w-full object-cover"
                  />
                </div>
                <span className="text-[#2C2C2C] font-[600] text-xs">
                  {state?.UserName}
                </span>
              </div>
              <div>
                <AllSvgs type={"downPointingArrow"} />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4.7rem)] px-8">
          {children}
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
      <UserAccountMenu
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        setShowLogoutModal={setShowLogoutModal}
      />
    </div>
  );
};

export default Sidebar;
