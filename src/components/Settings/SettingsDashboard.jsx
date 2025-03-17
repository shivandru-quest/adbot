import { useSearchParams } from "react-router-dom";
import EditUserProfile from "./EditUserProfile";
import SubscriptionPage from "../Subscription/SubscriptionPage";
import AllSvgs from "../../assets/AllSvgs";
import Refer from "./Refer";
import LoginSecurity from "./LoginSecurity";

const SettingsDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col h-auto">
      <div className="flex items-center gap-1 pt-[30px] w-56 ml-16">
        <AllSvgs type={"homeIcon"} />
        <AllSvgs type={"rightPointerIcon"} />
        <p className="text-[#474747] text-sm font-[500]">Profile</p>
        <AllSvgs type={"rightPointerIcon"} />
        <p className="text-[#474747] text-sm font-[500]">Account</p>
      </div>
      <div className="pt-[30px] w-full h-full flex items-start justify-between gap-10">
        {/* <div
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
        </div> */}
        <div className="flex flex-col gap-2 min-w-56 h-[70vh] ml-16 border border-[#E2E2E2] rounded-lg p-4">
          <button
            className={`${
              searchParams.get("tab") === "account"
                ? "text-[#181818] font-[500]"
                : "text-[#535353] font-[400]"
            } text-base flex items-center justify-start gap-2`}
            onClick={() => setSearchParams({ tab: "account" })}
          >
            <AllSvgs
              type={"humanIcon"}
              fillColor={
                searchParams.get("tab") === "account" ? "#181818" : "#696969"
              }
            />
            Account
          </button>
          <button
            className={`${
              searchParams.get("tab") === "pricing"
                ? "text-[#181818] font-[500]"
                : "text-[#535353] font-[400]"
            } text-base flex items-center justify-start gap-2`}
            onClick={() => setSearchParams({ tab: "pricing" })}
          >
            <AllSvgs
              type={"cartIcon"}
              fillColor={
                searchParams.get("tab") === "pricing" ? "#181818" : "#696969"
              }
            />
            Pricing & Payment
          </button>
          <button
            className={`${
              searchParams.get("tab") === "refer"
                ? "text-[#181818] font-[500]"
                : "text-[#535353] font-[400]"
            } text-base flex items-center justify-start gap-2`}
            onClick={() => setSearchParams({ tab: "refer" })}
          >
            <AllSvgs
              type={"friendsIcon"}
              fillColor={
                searchParams.get("tab") === "refer" ? "#181818" : "#696969"
              }
            />
            Refer Friends
          </button>
          <button
            className={`${
              searchParams.get("tab") === "login"
                ? "text-[#181818] font-[500]"
                : "text-[#535353] font-[400]"
            } text-base flex items-center justify-start gap-2`}
            onClick={() => setSearchParams({ tab: "login" })}
          >
            <AllSvgs
              type={"securityIcon"}
              fillColor={
                searchParams.get("tab") === "login" ? "#181818" : "#696969"
              }
            />
            Login & Security
          </button>
        </div>
        <div className="w-full h-auto">
          {searchParams.get("tab") === "account" ? (
            <EditUserProfile />
          ) : searchParams.get("tab") === "pricing" ? (
            <SubscriptionPage />
          ) : searchParams.get("tab") === "refer" ? (
            <Refer />
          ) : (
            <LoginSecurity />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
