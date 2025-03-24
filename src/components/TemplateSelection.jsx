import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaReddit } from "react-icons/fa";
import SelectionModal from "../ui/SelectionModal";
import axios from "axios";
import { createUrlBackend } from "../Config/generalFunctions";
import Loader from "../ui/Loader";
import NoDataYet from "../ui/NoDataYet";
import TemplateBanner from "../ui/TemplateBanner";
import TemplateCard from "../ui/TemplateCard";
import { templates } from "./Home/Home";

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [userTemplates, setUserTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const filteredTemplates = userTemplates?.filter((template) => {
    const categoryMatch =
      selectedCategory === "All" || template.category === selectedCategory;
    const platformMatch =
      selectedPlatform === "all" || template.platform === selectedPlatform;
    return categoryMatch && platformMatch;
  });

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

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <TemplateBanner
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>
      <div>
        {!isLoading && userTemplates.length === 0 && (
          <div className="w-full flex items-center justify-center">
            <NoDataYet onAction={() => navigate("/templates")} />
          </div>
        )}
        <div className="flex flex-wrap gap-6 mt-6">
          {isLoading && <Loader />}
          {!isLoading &&
            userTemplates?.length > 0 &&
            filteredTemplates?.map((el, i) => {
              const tempImage = el.elements?.find(
                (ele) => ele.type === "image"
              );
              return (
                !el?.isDeleted && (
                  <div key={i}>
                    <TemplateCard
                      imgFile={tempImage?.src}
                      title={el.title}
                      platform={el.platform}
                      idx={i}
                    />
                  </div>
                )
              );
            })}
        </div>
        <div className="flex flex-wrap gap-6 mt-6">
          {isLoading && <Loader />}
          {!isLoading &&
            userTemplates?.length > 0 &&
            templates?.map((el, i) => {
              return (
                !el?.isDeleted && (
                  <div key={i}>
                    <TemplateCard
                      imgFile={el.imgFile}
                      title={el.title}
                      platform={el.platform}
                      idx={i}
                    />
                  </div>
                )
              );
            })}
        </div>
      </div>
      <SelectionModal
        isOpen={showModal}
        onClose={toggleModal}
        selectedTemplateId={selectedTemplateId}
        userTemplates={userTemplates}
        selectedImage={selectedImage}
        fetchTemplates={fetchTemplates}
      />
    </div>
  );
};

export default TemplateSelection;
