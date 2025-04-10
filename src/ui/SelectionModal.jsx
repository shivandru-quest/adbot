import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "@questlabs/react-sdk";
import { mainConfig } from "../Config/mainConfig";
import Loader from "./Loader";
import { createUrlBackend } from "../Config/generalFunctions";
import { AppContext } from "../context/AppContext";
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
  const { state, dispatch } = useContext(AppContext);
  const [templateData, setTemplateData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    platform: "",
    canvasSize: "",
    elements: [],
  });

  useEffect(() => {
    setFormData((prev) => ({
      title: templateData?.title || "",
      category: templateData?.category || "",
      elements: templateData?.elements || [],
      platform: templateData?.platform || "",
      canvasSize: templateData?.canvasSize || "",
    }));
  }, [templateData]);

  useEffect(() => {
    formData.canvasSize === "custom"
      ? dispatch({
          type: "user/canvasSize",
          payload: { width: "650", height: "300", name: "custom" },
        })
      : formData.canvasSize === "post"
      ? dispatch({
          type: "user/canvasSize",
          payload: { width: "540", height: "540", name: "post" },
        })
      : formData.canvasSize === "landscape"
      ? dispatch({
          type: "user/canvasSize",
          payload: { width: "650", height: "340", name: "landscape" },
        })
      : formData.canvasSize === "story"
      ? dispatch({
          type: "user/canvasSize",
          payload: { width: "400", height: "710", name: "story" },
        })
      : formData.canvasSize === "vertical"
      ? dispatch({
          type: "user/canvasSize",
          payload: { width: "500", height: "625", name: "vertical" },
        })
      : formData.canvasSize === "pin"
      ? dispatch({
          type: "user/canvasSize",
          payload: { width: "433", height: "650", name: "pin" },
        })
      : "";
  }, [formData.canvasSize]);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleSubmit() {
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
      const { url, headers } = createUrlBackend(`template/delete/${selectedTemplateId}`);
      const res = await axios.patch(url, { payload }, { headers });
      setIsLoading(false);
      Toast.success({
        text: "Ad deleted successfully",
      });
    } catch (error) {
      setIsLoading(false);
      Toast.error({
        text: "An unexpected error occurred. Please try again later.",
      });
      console.log("error", error.message);
    }
  }

  async function fetchTemplate() {
    try {
      const { url, headers } = createUrlBackend(`template/${selectedTemplateId}`);
      const res = await axios.get(url, { headers });
      setTemplateData(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchTemplate();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {isLoading && <Loader />}
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl w-full transition-transform transform scale-95 animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Ad Selection</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            ✖
          </button>
        </div>
        <div className="py-4 flex items-start justify-between w-full gap-4 h-96">
          <div className="w-1/2 h-full">
            <img
              src={templateData?.templatePoster}
              alt="templateData"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2">
            <form>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-sm ">
                    title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border w-full h-10 p-3 rounded-lg outline-none text-sm text-ellipsis overflow-hidden whitespace-nowrap"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="category" className="text-sm ">
                    selected category
                  </label>
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
                <div className="flex flex-col gap-1">
                  <label htmlFor="category" className="text-sm ">
                    selected Platform
                  </label>
                  <select
                    name="platform"
                    id="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full p-3 border outline-none rounded-lg text-sm"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedIn">Linked In</option>
                    <option value="reddit">Reddit</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="canvasSize" className="text-sm">
                    canvas layout
                  </label>
                  <select
                    name="canvasSize"
                    id="canvasSize"
                    value={formData.canvasSize}
                    onChange={handleChange}
                    className="w-full p-3 border outline-none rounded-lg text-sm"
                  >
                    <option value="custom">Custom</option>
                    <option value="post">Post</option>
                    <option value="landscape">Landscape</option>
                    <option value="story">Story</option>
                    <option value="vertical">Vertical</option>
                    <option value="pin">Pin</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full flex justify-between gap-2">
          <button
            className="text-sm font-bold px-4 py-2 rounded-lg bg-[#E2E2E2] text-[#181818] w-72"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSubmit();
            }}
          >
            Edit Ad
          </button>
          <button
            className="text-sm font-bold px-4 py-2 rounded-lg border w-72"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDelete();
            }}
          >
            Delete Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionModal;
