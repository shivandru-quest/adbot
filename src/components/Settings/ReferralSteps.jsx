import React from "react";
import AllSvgs from "../../assets/AllSvgs";

export const ReferralSteps = () => {
  return (
    <section className="flex flex-1 shrink px-5 py-7 w-full bg-white rounded-xl basis-0 min-w-60 max-md:max-w-full">
      <div className="w-full">
        <div className="flex gap-5 items-start w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink justify-center w-full basis-0 min-w-60 max-md:max-w-full gap-2">
            <h2 className="text-[1.25rem] leading-[1.875rem] text-[#2C2C2C] font-[600] tracking-[-0.025rem] text-ellipsis overflow-hidden whitespace-nowrap">
              Invite your friends
            </h2>
            <p className="text-xs text-[#939393] font-[400]">
              Spread the word and share us with your friends, you both will
              maybe earn some rewards!
            </p>
          </div>
        </div>
        <div className="flex relative gap-5 justify-center items-start mt-10 w-full max-md:max-w-full">
          <div className="flex z-0 flex-col flex-1 shrink text-center basis-5">
            <div
              className="object-contain self-center w-14 aspect-square rounded-full border flex items-center justify-center"
              style={{ border: "1px solid rgba(0, 0, 0, 0.10)" }}
            >
              <AllSvgs type={"messageReferIcon"} />
            </div>
            <div className="flex gap-3 items-start mt-3 w-full">
              <div className="flex flex-col justify-center items-start w-[201px]">
                <h3 className="text-base font-[600] text-[#2C2C2C] text-ellipsis overflow-hidden whitespace-nowrap">
                  Share Your Unique Link
                </h3>
                <p className="mt-1 text-xs text-[#939393] font-[500]">
                  Access invite link and share via socials, email, or DMs.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 shrink text-center basis-5">
            <div
              className="object-contain self-center w-14 aspect-square rounded-full border flex items-center justify-center"
              style={{ border: "1px solid rgba(0, 0, 0, 0.10)" }}
            >
              <AllSvgs type={"humanReferIcon"} />
            </div>
            <div className="flex gap-3 items-start mt-3 w-full">
              <div className="flex flex-col flex-1 shrink justify-center items-start w-full basis-0">
                <h3 className="text-base font-[600] text-[#2C2C2C] text-ellipsis overflow-hidden whitespace-nowrap">
                  Your Friends Sign Up
                </h3>
                <p className="mt-1 text-xs text-[#939393] font-[500]">
                  Encourage friends to sign up with your link for rewards.
                </p>
              </div>
            </div>
          </div>
          <div className="flex z-0 flex-col flex-1 shrink text-center basis-5">
            <div
              className="object-contain self-center w-14 aspect-square rounded-full border flex items-center justify-center"
              style={{ border: "1px solid rgba(0, 0, 0, 0.10)" }}
            >
              <AllSvgs type={"sparkleReferIcon"} />
            </div>
            <div className="flex gap-3 items-start mt-3 w-full">
              <div className="flex flex-col flex-1 shrink justify-center items-start w-full basis-0">
                <h3 className="text-base font-[600] text-[#2C2C2C] text-ellipsis overflow-hidden whitespace-nowrap">
                  Earn Rewards Together
                </h3>
                <p className="mt-1 text-xs text-[#939393] font-[500]">
                  Friends meet criteria, both receive rewards, enhancing
                  experiences!
                </p>
              </div>
            </div>
          </div>
          <div className="absolute z-0 p-2.5 right-[160px] top-[18px] w-[5.8rem]">
            <AllSvgs type={"lineIcon"} />
          </div>
          <div className="absolute z-0 p-2.5 left-[150px] top-[18px] w-[5.8rem]">
            <AllSvgs type={"lineIcon"} />
          </div>
        </div>
      </div>
    </section>
  );
};
