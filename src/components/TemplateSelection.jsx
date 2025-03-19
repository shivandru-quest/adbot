import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiGrid } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaReddit } from "react-icons/fa";
import SelectionModal from "../ui/SelectionModal";
import axios from "axios";
import { mainConfig } from "../Config/mainConfig";
import {
  createUrlBackend,
  getToken,
  getUserId,
} from "../Config/generalFunctions";
import Loader from "../ui/Loader";
import NoDataYet from "../ui/NoDataYet";
import TemplateBanner from "../ui/TemplateBanner";

export const templates = [
  {
    id: 1,
    name: "Summer Sale",
    category: "E-commerce",
    type: "image",
    platform: "instagram",
    src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Agency Portfolio",
    category: "Agency",
    type: "image",
    platform: "facebook",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Fashion Collection",
    category: "Fashion",
    type: "image",
    platform: "instagram",
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Tech Product",
    category: "E-commerce",
    type: "image",
    platform: "reddit",
    src: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Food Delivery",
    category: "Food",
    type: "image",
    platform: "facebook",
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Travel Package",
    category: "Travel",
    type: "image",
    platform: "instagram",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=300&fit=crop",
  },
];

const categories = ["All", "E-commerce", "Agency", "Fashion", "Food", "Travel"];

const platforms = [
  { id: "all", icon: FiGrid, label: "All" },
  { id: "instagram", icon: FaInstagram, label: "Instagram" },
  { id: "facebook", icon: FaFacebook, label: "Facebook" },
  { id: "reddit", icon: FaReddit, label: "Reddit" },
];

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
        {/* <div className="flex items-center">
          <Link to="/dashboard">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center text-gray-600 hover:text-indigo-600"
            >
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </motion.button>
          </Link>
          <h1 className="text-2xl font-bold ml-8">Choose a Template</h1>
        </div> */}
        <TemplateBanner
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Filters */}

      {/* <div className="mb-8">
        <div className="flex flex-col space-y-4">
          
          <div className="flex space-x-4">
            {platforms.map((platform) => (
              <motion.button
                key={platform.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  selectedPlatform === platform.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <platform.icon className="mr-2" />
                {platform.label}
              </motion.button>
            ))}
          </div>

          
          <div className="flex space-x-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Blank Canvas Option */}
      {/* <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-sm mb-8 border-2 border-dashed border-gray-300 cursor-pointer"
        onClick={() => {
          toggleModal();
          setSelectedTemplateId("blank");
        }}
        // onClick={() => handleTemplateSelect("blank")}
      >
        <div className="flex items-center">
          <FiLayout className="w-8 h-8 text-indigo-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Start with a Blank Canvas</h3>
            <p className="text-gray-600">Create your ad from scratch</p>
          </div>
        </div>
      </motion.div> */}

      {/* Templates Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
            onClick={() => {
              toggleModal();
              setSelectedTemplateId(template.id);
            }}
          >
            <img
              src={template.src}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{template.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">
                  {template.category}
                </span>
                <div className="text-indigo-600">
                  {template.platform === "instagram" && <FaInstagram />}
                  {template.platform === "facebook" && <FaFacebook />}
                  {template.platform === "reddit" && <FaReddit />}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {isLoading && <Loader />}
        {!isLoading && userTemplates?.length > 0
          ? filteredTemplates?.map((el) => {
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
            })
          : !isLoading && (
              <div className="w-full m-auto border">
                <NoDataYet onAction={() => navigate("/templates")} />
              </div>
            )}
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
