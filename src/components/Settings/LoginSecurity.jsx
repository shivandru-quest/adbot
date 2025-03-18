import React from "react";

const LoginSecurity = () => {
  return (
    <div className="flex flex-col gap-8 rounded-[10px] px-8">
      <p className="text-[#0D0D0D] text-[2.25rem] leading-[2.75rem] tracking-[-0.045rem] font-[600]">
        Login & Security
      </p>
      <div className="w-full py-[1.75rem] px-[1.25rem] border border-[#EAECF0] rounded-lg">
        <p className="text-[#2C2C2C] text-xl font-[600] tracking-[-0.025rem]">
          Sign out from all devices
        </p>
        <p className="text-xs text-[#939393] font-[500] mt-2">
          Logged in on a shared device but forgot to sign out? End all sessions
          by signing out from all devices.
        </p>
        <button className="text-[#181818] text-sm font-[600] px-3 py-2 border border-[#E2E2E2] rounded-md flex items-center justify-center mt-5">
          Sign out from all devices
        </button>
      </div>
      <div className="w-full py-[1.75rem] px-[1.25rem] border border-[#EAECF0] rounded-lg">
        <p className="text-[#2C2C2C] text-xl font-[600] tracking-[-0.025rem]">
          Delete your account
        </p>
        <p className="text-xs text-[#939393] font-[500] mt-2">
          By deleting your account, you’ll no longer be able to access any of
          your designs or log in to NEXA. Your NEXA account was created at
          2:00PM, Mar 12, 2025.
        </p>
        <button className="text-[#181818] text-sm font-[600] px-3 py-2 border border-[#E2E2E2] rounded-md flex items-center justify-center mt-5">
          Delete account
        </button>
      </div>
    </div>
  );
};

export default LoginSecurity;
