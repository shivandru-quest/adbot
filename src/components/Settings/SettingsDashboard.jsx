import React, { useState } from "react";
import EditUserProfile from "./EditUserProfile";
import SubscriptionPage from "../Subscription/SubscriptionPage";

const SettingsDashboard = () => {
  const [currTab, setCurrTab] = useState("edit");
  return (
    <div className="flex flex-col justify-center items-center h-auto">
      <div className="pt-[30px] w-full h-auto">
        <div
          className="pl-4 flex w-full items-start h-[52px]"
          style={{
            borderBottom: `1px solid #939393`,
          }}
        >
          <p
            className={`text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${
              currTab === "edit" && "rounded-t-xl border-b border-[#939393]"
            }`}
            onClick={() => setCurrTab("edit")}
            style={{
              color: currTab === "edit"? "#fff":"#000",
              background: currTab === "edit" ? "#2c2c2c" : "",
            }}
          >
            Edit Profile
          </p>
          <p
            className={`text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${
              currTab === "subscription" &&
              "rounded-t-xl border-b border-[#939393]"
            }`}
            onClick={() => setCurrTab("subscription")}
            style={{
              color: currTab === "subscription" ? "#fff" : "#000",
              background: currTab === "subscription" ? "#2c2c2c" : "",
            }}
          >
            Subscription
          </p>
        </div>

        <div className="w-full h-auto">
          {currTab === "edit" ? <EditUserProfile /> : <SubscriptionPage />}
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
