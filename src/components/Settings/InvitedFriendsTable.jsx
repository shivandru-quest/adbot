import React, { useState, useEffect } from "react";
import { mainConfig } from "../../Config/mainConfig";
import { getUserId, createUrl } from "../../Config/generalFunctions";
import axios from "axios";
import dayjs from "dayjs";

export const InvitedFriendsTable = () => {
  const [adminData, setAdminData] = useState([]);
  async function fetchAdmins() {
    try {
      const { url, headers } = createUrl(
        `api/entities/${
          mainConfig.QUEST_ADDBOT_ENTITY_ID
        }/admins?userId=${getUserId()}`
      );
      const res = await axios.get(url, { headers });
      setAdminData(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    fetchAdmins();
  }, []);
  console.log("adminData", adminData);
  return (
    <section className="mt-7 w-full max-md:max-w-full">
      <h2 className="text-[#2C2C2C] text-[1.125rem] leading-[1.75rem] tracking-[-0.01125rem] font-[600]">
        Invited Friends
      </h2>
      <div className="flex overflow-hidden flex-wrap items-start mt-4 w-full text-base rounded-xl border border-[#EAECF0] h-auto max-md:max-w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FCFCFD] border-b border-[#EAECF0]">
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500] text-left">
                Sr
              </th>
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500] text-left">
                Name
              </th>
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500] text-left">
                Contact
              </th>
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500] text-left">
                Created at
              </th>
              <th className="px-6 py-[1.12rem] text-[#2C2C2C] text-base font-[500] text-left">
                Credits
              </th>
            </tr>
          </thead>
          <tbody>
            {adminData.map((item, index) => (
              <tr className="border-b border-[#F0F0F0]" key={index}>
                <td className="px-6 py-4 text-[#4C4C4C] text-base font-[400]">
                  {index + 1}.
                </td>
                <td className="px-6 py-4 text-[#2C2C2C] text-base font-[500]">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-[#4C4C4C] text-base font-[400]">
                  {item.emails?.at(-1)}
                </td>
                <td className="px-6 py-4 text-[#6E6E6E] text-base font-[400]">
                  {dayjs(item.createdAt).format("DD MMMM YYYY")}
                </td>
                <td className="px-6 py-4 text-[#4C4C4C] text-base font-[400]">
                  --
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
