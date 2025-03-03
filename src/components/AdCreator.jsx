import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaReddit } from "react-icons/fa";
import { FiUpload, FiX, FiCheck, FiImage } from "react-icons/fi";

const platforms = [
  { id: "instagram", name: "Instagram", icon: FaInstagram },
  { id: "facebook", name: "Facebook", icon: FaFacebook },
  { id: "linkedin", name: "LinkedIn", icon: FaLinkedin },
  { id: "reddit", name: "Reddit", icon: FaReddit },
];
const categories = ["All", "E-commerce", "Agency", "Fashion", "Food", "Travel"];
const AdCreator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [adData, setAdData] = useState({
    title: "",
    description: "",
    platform: selectedPlatform || "",
    category: selectedCategory || "",
    images: [],
  });
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setAdData((prev) => ({
      ...prev,
      platform: selectedPlatform || "",
      category: selectedCategory || "",
    }));
  }, [selectedPlatform, selectedCategory]);

  console.log("adData", adData);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newImage = {
          elementId: `ele-${uuidv4()}`,
          name: file.name,
          url: URL.createObjectURL(file),
          src: reader.result,
          type: "image",
          width: 200,
          height: 200,
          x: 100,
          y: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        };

        setAdData((prev) => ({
          ...prev,
          images: [...prev.images, newImage],
        }));
      };
    });
  };

  const removeImage = (index) => {
    setAdData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleButtonClick = (e) => {
    document.getElementById("file-upload").click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/editor/new", { state: { ...location.state, adData } });
  };

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Ad</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Platform Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Choose Platform</h2>
            <div className="flex space-x-4">
              {platforms?.map((platform) => (
                <motion.button
                  key={platform.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    selectedPlatform === platform.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <platform.icon className="mr-2" />
                  {platform.name}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Select a Category</h2>
            <div className="flex space-x-4">
              {categories?.map((category, i) => (
                <motion.button
                  key={i}
                  type="button"
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

          {/* Ad Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Ad Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Title
                </label>
                <input
                  type="text"
                  value={adData.title}
                  onChange={(e) =>
                    setAdData({ ...adData, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-ellipsis whitespace-nowrap overflow-hidden"
                  placeholder="Enter ad title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Description
                </label>
                <input
                  value={adData.description}
                  onChange={(e) =>
                    setAdData({ ...adData, description: e.target.value })
                  }
                  rows="4"
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder:absolute placeholder:top-3 text-ellipsis whitespace-nowrap overflow-hidden"
                  placeholder="Enter ad description"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Media</h2>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FiUpload className="w-12 h-12 text-gray-400 mb-4" />
                <span className="text-gray-600">
                  Drag & drop your images here or click to browse
                </span>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={handleButtonClick}
                >
                  Upload Files
                </motion.button>
              </label>
            </div>

            {/* Image Preview */}
            {adData.images.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-4">
                {adData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            Create Ad
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default AdCreator;
