import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQSection = ({ searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [openQuestions, setOpenQuestions] = useState(new Set());

  const faqCategories = {
    'getting-started': {
      title: 'Getting Started',
      questions: [
        {
          id: 'gs1',
          question: 'How do I create my first ad?',
          answer: 'Click on "Create New Ad" from your dashboard, choose a template or start from scratch, and follow the step-by-step guide.'
        },
        {
          id: 'gs2',
          question: 'What file formats are supported?',
          answer: 'We support PNG, JPG, and SVG files for images. Videos can be uploaded in MP4 format.'
        }
      ]
    },
    'ad-creative': {
      title: 'Ad Creative Generator',
      questions: [
        {
          id: 'ac1',
          question: 'How does the AI generate ads?',
          answer: 'Our AI analyzes your input, brand guidelines, and successful ad patterns to generate optimized advertisements.'
        },
        {
          id: 'ac2',
          question: 'Can I customize AI-generated ads?',
          answer: 'Yes, you can fully customize any AI-generated ad using our editor, including text, images, and layout.'
        }
      ]
    },
    'billing': {
      title: 'Subscription & Billing',
      questions: [
        {
          id: 'b1',
          question: 'How do I upgrade my plan?',
          answer: 'Go to Subscription in your dashboard, click "Upgrade Plan," and choose your preferred plan.'
        },
        {
          id: 'b2',
          question: 'What payment methods are accepted?',
          answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
        }
      ]
    }
  };

  const toggleQuestion = (questionId) => {
    setOpenQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const filteredQuestions = (questions) => {
    if (!searchQuery) return questions;
    return questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-6">
        {Object.entries(faqCategories).map(([key, category]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.title}
          </motion.button>
        ))}
      </div>

      {/* FAQ Questions */}
      <div className="space-y-4">
        {filteredQuestions(faqCategories[activeCategory].questions).map((item) => (
          <motion.div
            key={item.id}
            initial={false}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => toggleQuestion(item.id)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium text-left">{item.question}</span>
              {openQuestions.has(item.id) ? (
                <FiChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </motion.button>
            <AnimatePresence>
              {openQuestions.has(item.id) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 text-gray-600">
                    {item.answer}
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

export default FAQSection;