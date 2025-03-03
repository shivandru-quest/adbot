import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const PreviewGenerator = ({ platform, text }) => {
  const [currentProduct, setCurrentProduct] = useState(0);

  const products = [
    {
      name: "Premium Headphones",
      description: "Experience crystal clear sound with our premium headphones. Perfect for music lovers!",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      price: "$299",
      category: "Electronics"
    },
    {
      name: "Smart Watch Pro",
      description: "Stay connected and track your fitness with our latest smartwatch.",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300",
      price: "$199",
      category: "Wearables"
    },
    {
      name: "Wireless Earbuds",
      description: "True wireless freedom with exceptional sound quality.",
      image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=300",
      price: "$149",
      category: "Audio"
    }
  ];

  const platformStyles = {
    instagram: {
      width: '400px',
      height: '400px',
      layout: 'square'
    },
    facebook: {
      width: '400px',
      height: '300px',
      layout: 'landscape'
    },
    reddit: {
      width: '400px',
      height: '350px',
      layout: 'vertical'
    }
  };

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={platformStyles[platform]}
        className="rounded-lg shadow-lg overflow-hidden bg-white"
      >
        {/* Platform Label */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </span>
        </div>

        {/* Content Container */}
        <div className="relative h-full">
          {/* Product Image */}
          <div className="w-full h-1/2 relative overflow-hidden">
            <motion.img
              key={currentProduct}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={products[currentProduct].image}
              alt={products[currentProduct].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>

          {/* Product Info */}
          <div className="p-6">
            <motion.div
              key={currentProduct}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-600 font-medium">
                  {products[currentProduct].category}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {products[currentProduct].price}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900">
                {products[currentProduct].name}
              </h3>
              
              <p className="text-sm text-gray-600">
                {text || products[currentProduct].description}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium"
              >
                Shop Now
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevProduct}
          className="absolute left-2 top-1/3 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
        >
          <FiChevronLeft className="w-4 h-4 text-gray-800" />
        </button>
        <button
          onClick={nextProduct}
          className="absolute right-2 top-1/3 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
        >
          <FiChevronRight className="w-4 h-4 text-gray-800" />
        </button>

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
        >
          <FiDownload className="w-5 h-5 text-gray-600" />
        </motion.button>

        {/* Product Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProduct(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentProduct === index ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PreviewGenerator;