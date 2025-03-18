import React from "react";

export const InvitedFriendsTable = () => {
  return (
    <section className="mt-7 w-full max-md:max-w-full">
      <h2 className="text-lg font-semibold tracking-normal leading-loose text-ellipsis text-zinc-800">
        Invited Friends
      </h2>
      <div className="flex overflow-hidden flex-wrap items-start mt-4 w-full text-base rounded-xl border border-solid border-neutral-200 h-[392px] text-neutral-600 max-md:max-w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-5 font-medium text-left text-zinc-800">
                Sr
              </th>
              <th className="px-6 py-5 font-medium text-left text-zinc-800">
                Name
              </th>
              <th className="px-6 py-5 font-medium text-left text-zinc-800">
                Contact
              </th>
              <th className="px-6 py-5 font-medium text-left text-zinc-800">
                Created at
              </th>
              <th className="px-6 py-5 font-medium text-left text-zinc-800">
                Credits
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#F0F0F0]">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4 font-medium text-zinc-800">
                Rich Explorer
              </td>
              <td className="px-6 py-4">captaintrunk@tartanhq.com</td>
              <td className="px-6 py-4 text-neutral-500">15 March 2024</td>
              <td className="px-6 py-4">--</td>
            </tr>
            <tr className="border-b border-[#F0F0F0]">
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
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
