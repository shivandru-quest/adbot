import React from "react";

export const InvitedFriendsTable = () => {
  return (
    <section className="mt-7 w-full max-md:max-w-full">
      <h2 className="text-[#2C2C2C] text-[1.125rem] leading-[1.75rem] tracking-[-0.01125rem] font-[600]">
        Invited Friends
      </h2>
      <div className="flex overflow-hidden flex-wrap items-start mt-4 w-full text-base rounded-xl border border-[#EAECF0] h-auto max-md:max-w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FCFCFD] border-b border-[#EAECF0]">
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500]">
                Sr
              </th>
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500]">
                Name
              </th>
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500]">
                Contact
              </th>
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500]">
                Created at
              </th>
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500]">
                Credits
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#F0F0F0]">
              <td className="px-6 py-4 text-[#4C4C4C] text-base font-[400]">
                1
              </td>
              <td className="px-6 py-4 text-[#2C2C2C] text-base font-[500]">
                Rich Explorer
              </td>
              <td className="px-6 py-4 text-[#4C4C4C] text-base font-[400]">
                captaintrunk@tartanhq.com
              </td>
              <td className="px-6 py-4 text-[#6E6E6E] text-base font-[400]">
                15 March 2024
              </td>
              <td className="px-6 py-4 text-[#4C4C4C] text-base font-[400]">
                --
              </td>
            </tr>
            {/* <tr className="border-b border-[#F0F0F0]">
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4 font-medium text-zinc-800">
                Black Marvin
              </td>
              <td className="px-6 py-4">blackmarvin@marvin.com</td>
              <td className="px-6 py-4 text-neutral-500">10 March 2024</td>
              <td className="px-6 py-4">100</td>
            </tr>
            <tr className="border-b border-[#F0F0F0]">
              <td className="px-6 py-4">3</td>
              <td className="px-6 py-4 font-medium text-zinc-800">
                Mile Esther
              </td>
              <td className="px-6 py-4">mileesther26@gmail.com</td>
              <td className="px-6 py-4 text-neutral-500">08 March 2024</td>
              <td className="px-6 py-4">100</td>
            </tr>
            <tr className="border-b border-[#F0F0F0]">
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4 font-medium text-zinc-800">
                Henry Arthur
              </td>
              <td className="px-6 py-4">henryauthur@gmail.com</td>
              <td className="px-6 py-4 text-neutral-500">08 March 2024</td>
              <td className="px-6 py-4">100</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </section>
  );
};
