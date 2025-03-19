"use client";
import React from "react";
import AllSvgs from "../../assets/AllSvgs";

export const ReferralLink = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://nexa.com/22712701");
  };

  return (
    <section className="flex flex-1 shrink items-start self-start rounded-xl border border-solid basis-0 border-neutral-200 min-w-60">
      <div className="overflow-hidden flex-1 shrink w-full rounded-xl basis-0 min-w-60">
        <div className="px-5 py-7 w-full bg-white min-h-[328px]">
          <div className="flex gap-5 items-start w-full">
            <div className="flex flex-col flex-1 shrink justify-center w-full basis-0 min-w-60">
              <h2 className="text-xl font-semibold tracking-tight text-ellipsis text-zinc-800">
                Your referral link
              </h2>
              <p className="mt-2 text-xs font-medium leading-4 text-neutral-400">
                Copy and share your referral link with friends or on social
                media using the icons below.
              </p>
            </div>
          </div>
          <div className="mt-5 w-full">
            <label className="text-xs font-medium leading-none text-neutral-600">
              Invitation Link
            </label>
            <div className="flex gap-2 px-4 py-2.5 mt-1.5 w-full text-sm leading-none whitespace-nowrap rounded-xl border border-gray-200 border-solid text-neutral-400">
              <span className="flex-1 shrink basis-0">
                https://nexa.com/22712701
              </span>
              <button onClick={copyToClipboard}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f9692653d1f538cde9b5a242f3253d536920ed6f57b907889cf65d5978e4f6f?placeholderIfAbsent=true&apiKey=a7712d980bfb46c2be2ec5204f77df41"
                  alt="Copy"
                  className="object-contain shrink-0 my-auto w-4 aspect-square"
                />
              </button>
            </div>
          </div>
          <button
            className="gap-1 self-stretch px-3 py-2 mt-5 w-full text-sm font-semibold leading-none text-center rounded-md"
            style={{
              background:
                "var(--nexa, linear-gradient(to bottom right, var(--neutral-white-100, #FFF) 0%, #000 38%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, var(--neutral-white-100, #FFF) 0%, #000 38%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, var(--neutral-white-100, #FFF) 0%, #000 38%) top left / 50% 50% no-repeat, linear-gradient(to top right, var(--neutral-white-100, #FFF) 0%, #000 38%) top right / 50% 50% no-repeat)",
            }}
          >
            Share Referral Link
          </button>
          <div className="mt-5 w-full">
            <div className="flex gap-2 justify-center items-center w-full">
              <button className="flex gap-2 items-center justify-center self-stretch p-2.5 my-auto w-10 h-10 bg-neutral-200 rounded-[48px]">
                <AllSvgs type={"linkedInIcon"} fillColor="#181818"/>
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
      </div>
    </section>
  );
};
