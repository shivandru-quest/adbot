import React, { useState } from "react";
import AllSvgs from "../assets/AllSvgs";
import { useNavigate } from "react-router-dom";

const UserAccountMenu = ({ userMenu, setUserMenu, setShowLogoutModal }) => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  return (
    userMenu && (
      <div
        className="absolute z-10 top-20 right-3 bg-white shadow-lg w-[9rem] h-[9rem] rounded-xl px-2 py-3 border flex flex-col gap-1"
        onMouseLeave={() => setUserMenu(false)}
      >
        <div
          className="w-full flex items-center justify-center gap-2 cursor-pointer p-2 hover:bg-[#E2E2E2] text-[#535353] hover:text-[#181818] rounded-md hover:font-[500] font-[400]"
          onMouseEnter={() => setHoveredItem("account")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/settings?tab=account")}
        >
          <AllSvgs
            type={"hollowHumanIcon"}
            fillColor={hoveredItem === "account" ? "#181818" : "#535353"}
          />
          <span className="text-sm">Account</span>
        </div>
        <div
          className="w-full flex items-center justify-center gap-2 cursor-pointer p-2 rounded-md hover:bg-[#E2E2E2] hover:text-[#181818] text-[#535353] hover:font-[500] font-[400]"
          onMouseEnter={() => setHoveredItem("settings")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/settings?tab=pricing")}
        >
          <AllSvgs
            type={"settingsIcon"}
            fillColor={hoveredItem === "settings" ? "#181818" : "#535353"}
          />
          <span className="text-sm">Settings</span>
        </div>
        <div
          className="w-full flex items-center justify-center gap-2 cursor-pointer p-2 rounded-md hover:bg-[#E2E2E2] hover:text-[#181818] text-[#535353] hover:font-[500] font-[400]"
          onMouseEnter={() => setHoveredItem("logout")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => setShowLogoutModal(true)}
        >
          <AllSvgs
            type={"logoutIcon"}
            fillColor={hoveredItem === "logout" ? "#181818" : "#535353"}
          />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    )
  );
};

export default UserAccountMenu;
