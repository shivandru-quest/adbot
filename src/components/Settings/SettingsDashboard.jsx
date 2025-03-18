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
        <p className="text-[#474747] text-sm font-[500]">
          {searchParams.get("tab") === "account"
            ? "Account"
            : searchParams.get("tab") === "pricing"
            ? "Pricing & Payment"
            : searchParams.get("tab") === "refer"
            ? "Refer Friends"
            : "Login & Security"}
        </p>
      </div>
      <div className="pt-[30px] w-full h-full flex items-start justify-between gap-10">
        <div className="flex flex-col gap-2 min-w-56 h-[calc(100vh-10rem)] ml-16 border border-[#E2E2E2] rounded-lg p-4">
          <button
            className={`rounded-[0.25rem] p-2 ${
              searchParams.get("tab") === "account"
                ? "text-[#181818] font-[500] bg-[#E2E2E2]"
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
            className={`rounded-[0.25rem] p-2 ${
              searchParams.get("tab") === "pricing"
                ? "text-[#181818] font-[500] bg-[#E2E2E2]"
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
            className={`rounded-[0.25rem] p-2 ${
              searchParams.get("tab") === "refer"
                ? "text-[#181818] font-[500] bg-[#E2E2E2]"
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
            className={`rounded-[0.25rem] p-2 ${
              searchParams.get("tab") === "login"
                ? "text-[#181818] font-[500] bg-[#E2E2E2]"
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
        <div className="w-full h-[calc(100vh-10rem)] overflow-y-auto">
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
