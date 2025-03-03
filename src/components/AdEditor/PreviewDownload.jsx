import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiEdit2, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaReddit } from 'react-icons/fa';

const PreviewDownload = ({ adContent, onClose }) => {
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [selectedResolution, setSelectedResolution] = useState('1080x1080');
  const [isDownloading, setIsDownloading] = useState(false);
  
  const downloadFormats = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
  ];

  const resolutions = [
    { value: '1080x1080', label: '1080 × 1080 px (Square)' },
    { value: '1080x1350', label: '1080 × 1350 px (Portrait)' },
    { value: '1080x566', label: '1080 × 566 px (Landscape)' },
  ];

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onClose}
              className="flex items-center text-gray-600 hover:text-indigo-600"
            >
              <FiArrowLeft className="mr-2" />
              Back to Editor
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FiCheckCircle className="text-green-500" />
              <span>Credits remaining: 245</span>
            </div>
          </div>

          {/* Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { platform: 'Instagram', icon: FaInstagram },
              { platform: 'Facebook', icon: FaFacebook },
              { platform: 'Reddit', icon: FaReddit },
            ].map((item) => (
              <motion.div
                key={item.platform}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center">
                    <item.icon className="mr-2 text-gray-700" />
                    {item.platform}
                  </span>
                </div>
                <div className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center">
                  {/* Preview Content */}
                  <div className="text-gray-400">Preview</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download Options */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Download Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <div className="flex space-x-4">
                  {downloadFormats.map((format) => (
                    <motion.button
                      key={format.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedFormat(format.value)}
                      className={`px-4 py-2 rounded-lg ${
                        selectedFormat === format.value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700'
                      }`}
                    >
                      {format.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Resolution Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution
                </label>
                <select
                  value={selectedResolution}
                  onChange={(e) => setSelectedResolution(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {resolutions.map((resolution) => (
                    <option key={resolution.value} value={resolution.value}>
                      {resolution.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onClose()}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Edit Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg ${
                  isDownloading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
                }`}
              >
                <FiDownload className="mr-2" />
                {isDownloading ? 'Downloading...' : 'Download'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDownload;