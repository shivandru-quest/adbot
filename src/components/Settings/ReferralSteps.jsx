import React from "react";
import AllSvgs from "../../assets/AllSvgs";

export const ReferralSteps = () => {
  return (
    <section className="flex flex-1 shrink px-5 py-7 w-full bg-white rounded-xl basis-0 min-w-60 max-md:max-w-full">
      <div className="w-full">
        <div className="flex gap-5 items-start w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink justify-center w-full basis-0 min-w-60 max-md:max-w-full">
            <h2 className="text-xl font-semibold tracking-tight text-ellipsis text-zinc-800 max-md:max-w-full">
              Invite your friends
            </h2>
            <p className="mt-2 text-xs leading-none text-neutral-400 max-md:max-w-full">
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
                <h3 className="text-base font-semibold text-ellipsis text-zinc-800">
                  Share Your Unique Link
                </h3>
                <p className="mt-1 text-xs font-medium leading-4 text-neutral-400">
                  Access invite link and share via socials, email, or DMs.
                </p>
              </div>
            </div>
          </div>
          <div className="flex z-0 flex-col flex-1 shrink text-center basis-5">
            <div
              className="object-contain self-center w-14 aspect-square rounded-full border flex items-center justify-center"
              style={{ border: "1px solid rgba(0, 0, 0, 0.10)" }}
            >
              <AllSvgs type={"humanReferIcon"} />
            </div>
            <div className="flex gap-3 items-start mt-3 w-full">
              <div className="flex flex-col flex-1 shrink justify-center items-start w-full basis-0">
                <h3 className="text-base font-semibold text-ellipsis text-zinc-800">
                  Your Friends Sign Up
                </h3>
                <p className="mt-1 text-xs font-medium leading-4 text-neutral-400">
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
                <h3 className="text-base font-semibold text-ellipsis text-zinc-800">
                  Earn Rewards Together
                </h3>
                <p className="mt-1 text-xs font-medium leading-4 text-neutral-400">
                  Friends meet criteria, both receive rewards, enhancing
                  experiences!
                </p>
              </div>
            </div>
          </div>
          <div className="absolute z-0 p-2.5 right-[149px] top-[18px] w-[114px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/722a3d8dfda1324327c0b7bcfde67fe56f9feaadb67a9be5595cf02c9467c40f?placeholderIfAbsent=true&apiKey=a7712d980bfb46c2be2ec5204f77df41"
              alt="Arrow Right"
              className="object-contain stroke-[1px] stroke-white w-[94px]"
            />
          </div>
          <div className="absolute z-0 p-2.5 left-[155px] top-[18px] w-[114px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6602362a80edbbeaf370241fdaf865350506f7afdff2a50108e9d02a36f7fb9d?placeholderIfAbsent=true&apiKey=a7712d980bfb46c2be2ec5204f77df41"
              alt="Arrow Left"
              className="object-contain stroke-[1px] stroke-white w-[94px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
