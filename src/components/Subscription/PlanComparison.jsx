import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

const PlanComparison = ({ onClose }) => {
  const features = [
    {
      category: 'Content Creation',
      items: [
        {
          name: 'AI-generated ads',
          free: '5/month',
          basic: '50/month',
          pro: 'Unlimited'
        },
        {
          name: 'Templates',
          free: 'Basic only',
          basic: 'All templates',
          pro: 'Custom templates'
        },
        {
          name: 'Export quality',
          free: 'Standard',
          basic: 'HD',
          pro: '4K'
        }
      ]
    },
    {
      category: 'Team Features',
      items: [
        {
          name: 'Team members',
          free: '1 user',
          basic: '3 users',
          pro: 'Unlimited'
        },
        {
          name: 'Brand kit',
          free: false,
          basic: true,
          pro: true
        },
        {
          name: 'Team collaboration',
          free: false,
          basic: true,
          pro: true
        }
      ]
    },
    {
      category: 'Support & Analytics',
      items: [
        {
          name: 'Customer support',
          free: 'Community',
          basic: 'Priority email',
          pro: '24/7 priority'
        },
        {
          name: 'Analytics',
          free: 'Basic',
          basic: 'Advanced',
          pro: 'Advanced + API'
        },
        {
          name: 'API access',
          free: false,
          basic: false,
          pro: true
        }
      ]
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white rounded-xl w-full max-w-5xl m-4 p-6 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Plan Comparison</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-8">
            {features.map((feature) => (
              <div key={feature.category}>
                <h3 className="text-lg font-semibold mb-4">{feature.category}</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left">Feature</th>
                        <th className="py-3 px-4 text-center">Free</th>
                        <th className="py-3 px-4 text-center">Basic</th>
                        <th className="py-3 px-4 text-center">Pro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feature.items.map((item) => (
                        <tr key={item.name} className="border-t">
                          <td className="py-3 px-4">{item.name}</td>
                          <td className="py-3 px-4 text-center">
                            {typeof item.free === 'boolean' ? (
                              item.free ? (
                                <FiCheck className="mx-auto text-green-500" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )
                            ) : (
                              item.free
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {typeof item.basic === 'boolean' ? (
                              item.basic ? (
                                <FiCheck className="mx-auto text-green-500" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )
                            ) : (
                              item.basic
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {typeof item.pro === 'boolean' ? (
                              item.pro ? (
                                <FiCheck className="mx-auto text-green-500" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )
                            ) : (
                              item.pro
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PlanComparison;