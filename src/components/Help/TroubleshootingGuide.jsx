import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const TroubleshootingGuide = () => {
  const [openIssue, setOpenIssue] = useState(null);

  const issues = [
    {
      id: 1,
      title: 'Ad Download Failed',
      steps: [
        'Check your internet connection',
        'Ensure the ad has been saved',
        'Try downloading in a different format',
        'Clear browser cache and try again'
      ]
    },
    {
      id: 2,
      title: 'Text Editing Issues',
      steps: [
        'Refresh the page',
        'Check if the text layer is locked',
        'Try using a different browser',
        'Contact support if the issue persists'
      ]
    },
    {
      id: 3,
      title: 'Image Upload Problems',
      steps: [
        'Verify file format (PNG, JPG, SVG supported)',
        'Check file size (max 5MB)',
        'Ensure image meets minimum dimensions',
        'Try compressing the image'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Troubleshooting Guide</h2>
      <div className="space-y-4">
        {issues.map((issue) => (
          <motion.div
            key={issue.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => setOpenIssue(openIssue === issue.id ? null : issue.id)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
            >
              <div className="flex items-center">
                <FiAlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                <span className="font-medium">{issue.title}</span>
              </div>
              {openIssue === issue.id ? (
                <FiChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </motion.button>
            <AnimatePresence>
              {openIssue === issue.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50">
                    <ol className="list-decimal list-inside space-y-2">
                      {issue.steps.map((step, index) => (
                        <li key={index} className="text-gray-600">{step}</li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TroubleshootingGuide;