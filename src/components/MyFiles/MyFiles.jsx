import React, { useState, useEffect } from "react";
import { importConfig } from "../../Config/importConfig";
import GeneralSelect from "../../ui/GeneralSelect";
import AllSvgs from "../../assets/AllSvgs";
import NoDataYet from "../../ui/NoDataYet";
import { useNavigate } from "react-router-dom";
import { createUrlBackend } from "../../Config/generalFunctions";
import axios from "axios";
import Loader from "../../ui/Loader";
import TemplateCard from "../../ui/TemplateCard";
import SelectionCardHandle from "../../ui/SelectionCardHandle";
import { templates } from "../Home/Home";

const categoryOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "reddit", label: "Reddit" },
  { value: "saas", label: "SaaS" },
  { value: "eCommerce", label: "E-commerce" },
  { value: "fintech", label: "FinTech" },
  { value: "agency", label: "Agency" },
  { value: "fashion", label: "Fashion" },
  { value: "food", label: "Food" },
  { value: "travel", label: "Travel" },
  { value: "realEstate", label: "Real-estate" },
  { value: "custom", label: "Custom" },
  { value: "post", label: "Post" },
  { value: "landscape", label: "Landscape" },
  { value: "story", label: "Story" },
  { value: "vertical", label: "Vertical" },
  { value: "pin", label: "Pin" },
  { value: "all", label: "All" },
];
const dateOptions = [
  { value: "today", label: "Today" },
  { value: "thisWeek", label: "This Week" },
  { value: "thisMonth", label: "This Month" },
  { value: "thisYear", label: "This Year" },
  { value: "all", label: "All" },
];
const MyFiles = () => {
  const [selectedItem, setSelectedItem] = useState("myTemplates");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userTemplates, setUserTemplates] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState([]);
  function handleCategoryChange(selectedOption) {
    setSelectedCategory(selectedOption);
  }
  function handleDateChange(selectedOption) {
    setSelectedDate(selectedOption);
  }
  async function fetchTemplates() {
    setIsLoading(true);
    try {
      const { url, headers } = createUrlBackend();
      const res = await axios.get(url, { headers });
      setUserTemplates(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error.message);
    }
  }
  useEffect(() => {
    fetchTemplates();
  }, []);
  useEffect(() => {
    const filtered = userTemplates?.filter((template) => {
      return template?.title
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase());
    });
    setFilteredData(filtered);
  }, [searchQuery, userTemplates]);
  console.log("userTemplates", userTemplates);
  function handleClick(templateId) {
    if (selectedTemplateId.includes(templateId)) {
      setSelectedTemplateId((prev) => prev.filter((id) => id !== templateId));
    } else {
      setSelectedTemplateId((prev) => [...prev, templateId]);
    }
  }
  console.log("templateId", selectedTemplateId);
  return (
    <div className="w-full flex flex-col gap-6 mt-6 mb-4 relative">
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
          <div className="w-[9rem]">
            <GeneralSelect
              options={categoryOptions}
              value={selectedCategory}
              Placeholder={"Category"}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="w-[9rem]">
            <GeneralSelect
              options={dateOptions}
              value={selectedDate}
              Placeholder={"Date modified"}
              onChange={handleDateChange}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Search"
              className="pl-3 py-2 w-[23rem] outline-none rounded-lg border border-[#E2E2E2] placeholder:text-[#979797] text-[#181818] text-sm font-[500] text-ellipsis overflow-hidden whitespace-nowrap pr-10 h-full"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute top-2 right-3">
              <AllSvgs type={"searchIcon"} />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
      <div className="py-4 px-6 grid grid-cols-4 gap-x-4 gap-y-4 rounded-[1rem] h-auto w-full">
        {selectedItem === "favourite" ? (
          <>
            {filteredData?.map((ele, i) => {
              const tempImage = ele.elements?.find(
                (ele) => ele.type === "image"
              );
              return (
                <div
                  className="relative"
                  key={i}
                  onClick={() => handleClick(ele?.templateId)}
                >
                  <TemplateCard
                    idx={i}
                    imgFile={tempImage?.src}
                    platform={ele?.platform}
                    title={ele?.title}
                  />
                  {selectedTemplateId?.includes(ele?.templateId) && (
                    <button className="absolute top-6 left-6">
                      <AllSvgs type={"priceTickIcon"} />
                    </button>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          selectedItem === "myTemplates" &&
          templates?.map((ele, i) => (
            <div key={i}>
              <TemplateCard
                idx={i}
                imgFile={ele?.imgFile}
                title={ele?.title}
                platform={ele?.platform}
              />
            </div>
          ))
        )}
      </div>
      {!isLoading && userTemplates?.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <NoDataYet onAction={() => navigate("/templates")} />
        </div>
      )}
      {!isLoading && searchQuery?.length > 0 && filteredData?.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <p className="text-[#181818] text-sm font-[600]">
            No Search Result Found...!
          </p>
        </div>
      )}
      {selectedTemplateId?.length > 0 && (
        <div className="absolute z-10 bottom-4 left-1/4">
          <SelectionCardHandle
            setSelectedTemplateId={setSelectedTemplateId}
            selectedTemplateId={selectedTemplateId}
            setIsLoading={setIsLoading}
            fetchTemplates={fetchTemplates}
          />
        </div>
      )}
    </div>
  );
};

export default MyFiles;
