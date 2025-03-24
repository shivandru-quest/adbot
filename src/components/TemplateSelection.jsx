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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {isLoading && <Loader />}
          {!isLoading &&
            userTemplates?.length > 0 &&
            filteredTemplates?.map((el) => {
              const tempImage = el.elements?.find(
                (ele) => ele.type === "image"
              );
              return (
                !el?.isDeleted && (
                  <motion.div
                    key={el.templateId}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                    onClick={() => {
                      toggleModal();
                      setSelectedImage(tempImage?.src);
                      setSelectedTemplateId(el.templateId);
                    }}
                  >
                    {tempImage ? (
                      <div>
                        <img
                          src={tempImage?.src}
                          alt="Image Not Found"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="p-4">
                      <p className="font-semibold">{el.title}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          {el.description}
                        </p>
                        <div className="text-indigo-600">
                          {el.platform?.toLowerCase() === "instagram" ? (
                            <FaInstagram />
                          ) : el.platform?.toLowerCase() === "reddit" ? (
                            <FaReddit />
                          ) : (
                            <FaFacebook />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
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
