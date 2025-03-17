import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EditUserProfile from "./EditUserProfile";
import SubscriptionPage from "../Subscription/SubscriptionPage";

const SettingsDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
              searchParams.get("tab") === "edit" &&
              "rounded-t-xl border-b border-[#939393]"
            }`}
            onClick={() => setSearchParams({ tab: "edit" })}
            style={{
              color: searchParams.get("tab") === "edit" ? "#fff" : "#000",
              background: searchParams.get("tab") === "edit" ? "#2c2c2c" : "",
            }}
          >
            Edit Profile
          </p>
          <p
            className={`text-sm font-semibold font-['Figtree'] h-[52px] p-4 cursor-pointer ${
              searchParams.get("tab") === "subscription" &&
              "rounded-t-xl border-b border-[#939393]"
            }`}
            onClick={() => setSearchParams({ tab: "subscription" })}
            style={{
              color:
                searchParams.get("tab") === "subscription" ? "#fff" : "#000",
              background:
                searchParams.get("tab") === "subscription" ? "#2c2c2c" : "",
            }}
          >
            Subscription
          </p>
        </div>

        <div className="w-full h-auto">
          {searchParams.get("tab") === "edit" ? (
            <EditUserProfile />
          ) : (
            <SubscriptionPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
