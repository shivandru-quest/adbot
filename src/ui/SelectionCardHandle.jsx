import React from "react";
import AllSvgs from "../assets/AllSvgs";
import { createUrlBackend } from "../Config/generalFunctions";
import axios from "axios";
import { Toast } from "@questlabs/react-sdk";
const SelectionCardHandle = ({
  setSelectedTemplateId,
  selectedTemplateId,
  setIsLoading,
  fetchTemplates,
}) => {
  async function handleDelete() {
    if (selectedTemplateId.length === 0) return;
    setIsLoading(true);
    try {
      const payload = {
        isDeleted: true,
      };
      const deleteRequests = selectedTemplateId?.map((id) => {
        const { url, headers } = createUrlBackend(`template/delete/${id}`);
        return axios.patch(url, { payload }, { headers });
      });
      await Promise.all(deleteRequests);
      setIsLoading(false);
      Toast.success({
        text: "Ad deleted successfully",
      });
      await fetchTemplates();
      setSelectedTemplateId([]);
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.log("error", error.message);
    }
  }
  return (
    <div className="w-[25rem] h-[4.5rem] p-4 flex items-center justify-between rounded-xl border border-[#E2E2E2]">
      <div className="flex items-center gap-5">
        <button
          className="p-2 rounded-[3rem] bg-[#E2E2E2] flex items-center justify-center"
          onClick={() => setSelectedTemplateId([])}
        >
          <AllSvgs type={"cancelIcon"} />
        </button>
        <span className="text-[#181818] text-base font-[600]">
          {selectedTemplateId?.length || 0} Selected
        </span>
      </div>
      <div className="flex justify-center items-center gap-5">
        <button
          className="flex items-center gap-1 px-3 py-2 border border-[#C9C9C9] rounded-md"
          onClick={handleDelete}
        >
          <AllSvgs type={"deleteIcon"} />{" "}
          <span className="text-sm font-[600] text-[#A60724]">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default SelectionCardHandle;
