import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "@questlabs/react-sdk";
import { mainConfig } from "../Config/mainConfig";
import Loader from "./Loader";
import {
  createUrlBackend,
  getToken,
  getUserId,
} from "../Config/generalFunctions";
const SelectionModal = ({
  isOpen,
  onClose,
  selectedTemplateId,
  userTemplates,
  selectedImage,
  fetchTemplates,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [templateData, setTemplateData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "",
    category: "",
    elements: [],
  });
  useEffect(() => {
    setTemplateData(
      userTemplates?.find(
        (template) => template?.templateId === selectedTemplateId
      )
    );
    return () => setTemplateData({});
  }, [selectedTemplateId]);

  useEffect(() => {
    setFormData((prev) => ({
      title: templateData?.title || "",
      description: templateData?.description || "",
      platform: templateData?.platform || "",
      category: templateData?.category || "",
      elements: templateData?.elements || [],
    }));
  }, [templateData]);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/editor/${selectedTemplateId}`, {
      state: { ...location.state, formData },
    });
  }
  async function handleDelete() {
    setIsLoading(true);
    try {
      const payload = {
        isDeleted: true,
      };
      const { url, headers } = createUrlBackend(`delete/${selectedTemplateId}`);
      const res = await axios.patch(url, { payload }, { headers });
      setIsLoading(false);
      Toast.success({
        text: "Ad deleted successfully",
      });
      await fetchTemplates();
      onClose();
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.log("error", error.message);
    }
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {isLoading && <Loader />}
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full transition-transform transform scale-95 animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Ad Selection</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            ✖
          </button>
        </div>
        <div className="py-4 flex items-start justify-between w-full gap-3 h-80">
          <div className="w-1/2 h-full">
            <img
              src={selectedImage}
              alt="templateData"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2">
            <form>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="title" className="text-sm ">
                    your template title
                  </label>
                  <br />
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border w-full h-10 p-3 rounded-lg outline-none text-sm text-ellipsis overflow-hidden whitespace-nowrap"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="text-sm ">
                    description a bit about your template
                  </label>
                  <br />
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border w-full h-10 p-3 rounded-lg outline-none text-sm text-ellipsis overflow-hidden whitespace-nowrap"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="text-sm ">
                    select a category
                  </label>
                  <br />
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border outline-none rounded-lg text-sm"
                  >
                    <option value="All">All</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Agency">Agency</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="platform" className="text-sm ">
                    choose a platform
                  </label>
                  <br />
                  <select
                    name="platform"
                    id="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full p-3 border outline-none rounded-lg text-sm"
                  >
                    <option value="all">All</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="reddit">Reddit</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 w-72"
            onClick={handleSubmit}
          >
            Edit Ad
          </button>
          <button
            className="text-sm font-semibold px-4 py-2 rounded-lg border w-72"
            onClick={handleDelete}
          >
            Delete Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionModal;
