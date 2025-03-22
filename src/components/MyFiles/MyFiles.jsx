import React, { useState } from "react";
import { importConfig } from "../../Config/importConfig";
import GeneralSelect from "../../ui/GeneralSelect";
import AllSvgs from "../../assets/AllSvgs";
import NoDataYet from "../../ui/NoDataYet";
import { useNavigate } from "react-router-dom";
import LoginSuccessModal from "../Auth/LoginSuccessModal";
const categoryOptions = [{ value: "category", label: "Category" }];
const dateOptions = [{ value: "date", label: "Date" }];
const MyFiles = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  function handleCategoryChange(selectedOption) {
    setSelectedCategory(selectedOption.value);
  }
  function handleDateChange(selectedOption) {
    setSelectedDate(selectedOption.value);
  }
  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      <div
        className="h-[21rem] w-full rounded-lg flex items-center justify-start pl-20 relative"
        style={{
          backgroundImage: `url('${importConfig.bannerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-[#FAFAFA] text-[3rem] leading-[3.5rem] tracking-[-0.06rem] font-[900]">
              My Files
            </p>
            <p className="text-[#fff] text-[2rem] font-[500] leading-[3.5rem] tracking-[-0.04rem]">
              Your Ad Assets, Always Ready.
            </p>
          </div>
          <div className="w-[30rem] absolute bottom-0 right-0">
            <img
              src={importConfig.fileBannerImage}
              alt="fileBannerImage"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-1/2 flex items-center justify-start">
          <button
            className={`px-6 py-4 text-sm ${
              selectedItem === "all"
                ? "text-[#181818] font-[500] border-b border-[#808080]"
                : "text-[#979797] font-[400]"
            }`}
            onClick={() => setSelectedItem("all")}
          >
            All
          </button>
          <button
            className={`px-6 py-4 text-sm ${
              selectedItem === "myTemplates"
                ? "text-[#181818] font-[500] border-b border-[#808080]"
                : "text-[#979797] font-[400]"
            }`}
            onClick={() => setSelectedItem("myTemplates")}
          >
            My Templates
          </button>
          <button
            className={`px-6 py-4 text-sm ${
              selectedItem === "favourite"
                ? "text-[#181818] font-[500] border-b border-[#808080]"
                : "text-[#979797] font-[400]"
            }`}
            onClick={() => setSelectedItem("favourite")}
          >
            Favourite
          </button>
        </div>
        <div className="w-1/2 flex items-center justify-end gap-3">
          <GeneralSelect
            options={categoryOptions}
            value={selectedCategory}
            Placeholder={"Category"}
            onChange={handleCategoryChange}
          />
          <GeneralSelect
            options={dateOptions}
            value={selectedDate}
            Placeholder={"Date modified"}
            onChange={handleDateChange}
          />
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="pl-3 py-2 w-[23rem] outline-none rounded-lg border border-[#E2E2E2] placeholder:text-[#979797] text-[#181818] text-sm font-[500] text-ellipsis overflow-hidden whitespace-nowrap pr-10 h-full"
            />
            <div className="absolute top-3 right-3">
              <AllSvgs type={"searchIcon"} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <NoDataYet onAction={() => navigate("/templates")} />
      </div>
    </div>
  );
};

export default MyFiles;
