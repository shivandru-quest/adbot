import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiCreditCard, FiEdit2, FiDownload, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const recentProjects = [
    {
      id: 1,
      name: 'Summer Campaign',
      platform: 'Instagram',
      date: '2 days ago',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Product Launch',
      platform: 'Facebook',
      date: '5 days ago',
      status: 'Draft'
    },
    {
      id: 3,
      name: 'Holiday Special',
      platform: 'Reddit',
      date: '1 week ago',
      status: 'Completed'
    },
  ];

  const handleCreateAd = () => {
    navigate('/create');
  };

  const handleManageSubscription = () => {
    navigate('/subscription');
  };

  return (
    <div className="ml-64 p-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
          <p className="text-gray-600">Here's what's happening with your ads</p>
        </div>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateAd}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            <FiPlus className="mr-2" />
            Create New Ad
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleManageSubscription}
            className="flex items-center px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg"
          >
            <FiCreditCard className="mr-2" />
            Manage Subscription
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-gray-700">Available Credits</h3>
            <FiTrendingUp className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600 mt-2">2,450</p>
          <p className="text-sm text-gray-500 mt-1">Credits remaining</p>
        </motion.div>
        {/* Add more stat cards here */}
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <Link to="/projects" className="text-indigo-600 hover:text-indigo-700">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-gray-500">
                  {project.platform} • {project.date}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'Draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {project.status}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 text-gray-600 hover:text-indigo-600"
                >
                  <FiEdit2 />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 text-gray-600 hover:text-indigo-600"
                >
                  <FiDownload />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;