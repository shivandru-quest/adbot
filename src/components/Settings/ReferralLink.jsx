"use client";
import React from "react";
import AllSvgs from "../../assets/AllSvgs";
import { importConfig } from "../../Config/importConfig";

export const ReferralLink = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://nexa.com/22712701");
  };

  return (
    <section className="flex flex-col w-full rounded-xl border border-[#EAECF0] h-full">
      <div className="px-5 py-7 w-full h-auto">
        <div className="flex gap-5 items-start w-full">
          <div className="flex flex-col flex-1 shrink justify-center w-full basis-0 min-w-60">
            <h2 className="text-xl font-semibold tracking-tight text-ellipsis text-[#2C2C2C]">
              Your referral link
            </h2>
            <p className="mt-2 text-xs font-medium leading-4 text-[#939393]">
              Copy and share your referral link with friends or on social media
              using the icons below.
            </p>
          </div>
        </div>
        <div className="mt-5 w-full">
          <label className="text-xs font-medium text-[#4C4C4C]">
            Invitation Link
          </label>
          <div className="flex gap-2 px-4 py-2.5 mt-1.5 w-full text-sm leading-none whitespace-nowrap rounded-xl border border-gray-200 border-solid text-neutral-400">
            <span className="flex-1 shrink basis-0">
              https://nexa.com/22712701
            </span>
            <button onClick={copyToClipboard}>
              <AllSvgs type={"copyIcon"}/>
            </button>
          </div>
        </div>
        <button className="w-full h-9 mt-8 mb-8 flex items-center justify-center">
          <img
            src={importConfig.referralButton}
            alt="referralButton"
            className="w-full object-contain"
          />
        </button>
        <div className="mt-5 w-full">
          <div className="flex gap-2 justify-center items-center w-full">
            <button className="flex gap-2 items-center justify-center self-stretch p-2.5 my-auto w-10 h-10 bg-neutral-200 rounded-[48px]">
              <AllSvgs type={"linkedInIcon"} fillColor="#181818" />
            </button>
            <button className="flex gap-2 items-center justify-center self-stretch p-2.5 my-auto w-10 h-10 bg-neutral-200 rounded-[48px]">
              <AllSvgs type={"instagramIcon"} fillColor="#181818" />
            </button>
            <button className="flex gap-2 items-center justify-center self-stretch p-2.5 my-auto w-10 h-10 bg-neutral-200 rounded-[48px]">
              <AllSvgs type={"facebookIcon"} fillColor="#181818" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
