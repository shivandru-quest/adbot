import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiPlayCircle } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaReddit } from 'react-icons/fa';
import PreviewGenerator from './PreviewGenerator';

const LandingPage = () => {
  const [currentPlatform, setCurrentPlatform] = useState('instagram');
  const [adText, setAdText] = useState('');
  const [isYearly, setIsYearly] = useState(false);

  const features = [
    {
      title: "AI-Powered Creation",
      description: "Generate professional ads in seconds using advanced AI technology",
      icon: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300"
    },
    {
      title: "Multi-Platform Ready",
      description: "Optimize your ads for any social media platform automatically",
      icon: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300"
    },
    {
      title: "Smart Analytics",
      description: "Track performance and optimize your campaigns with AI insights",
      icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300"
    }
  ];

  const steps = [
    { title: "Pick a Template", description: "Choose from hundreds of proven templates" },
    { title: "Customize with AI", description: "Let AI enhance your ad content" },
    { title: "Optimize", description: "Perfect for each platform" },
    { title: "Publish", description: "Go live in minutes" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      text: "Adbot.ai has transformed our ad creation process. We're saving hours every week."
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      company: "Chen's Boutique",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      text: "The AI suggestions are incredible. Our engagement has increased by 150%."
    },
    {
      name: "Emma Williams",
      role: "Social Media Manager",
      company: "Bright Agency",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      text: "The multi-platform optimization is a game-changer. One click, perfect ads everywhere."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: isYearly ? 29 : 39,
      features: ["5 AI-generated ads/month", "Basic templates", "Email support"]
    },
    {
      name: "Pro",
      price: isYearly ? 79 : 99,
      features: ["Unlimited ads", "All templates", "Priority support", "Analytics"]
    },
    {
      name: "Enterprise",
      price: isYearly ? 199 : 249,
      features: ["Custom solutions", "Dedicated manager", "API access", "Advanced analytics"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Animated Shapes */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-purple-200 to-pink-200 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Generate Ads 10x Faster with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create stunning, conversion-focused ads in minutes. Harness the power of AI to generate
              professional advertisements for any platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Get Started Free
                  <FiArrowRight className="ml-2" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#demo"
                  className="inline-flex items-center px-8 py-3 text-lg font-medium text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg hover:bg-indigo-50"
                >
                  <FiPlayCircle className="mr-2" />
                  Watch Demo
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Bento Box */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 shadow-lg"
              >
                <div className="h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Create perfect ads in four simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-indigo-600 mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-indigo-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview Section */}
      <div id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">See It in Action</h2>
            <p className="text-xl text-gray-600">Experience the power of AI-driven ad creation</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex space-x-4 mb-4">
                  {[
                    { id: 'instagram', icon: FaInstagram, label: 'Instagram' },
                    { id: 'facebook', icon: FaFacebook, label: 'Facebook' },
                    { id: 'reddit', icon: FaReddit, label: 'Reddit' }
                  ].map(platform => (
                    <motion.button
                      key={platform.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPlatform(platform.id)}
                      className={`flex flex-col items-center p-3 rounded-lg ${
                        currentPlatform === platform.id
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600'
                      }`}
                    >
                      <platform.icon className="w-6 h-6 mb-1" />
                      <span className="text-xs">{platform.label}</span>
                    </motion.button>
                  ))}
                </div>
                <textarea
                  value={adText}
                  onChange={(e) => setAdText(e.target.value)}
                  placeholder="Enter your ad text here..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                  rows="4"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <PreviewGenerator platform={currentPlatform} text={adText} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that works for you</p>
            
            <div className="flex justify-center items-center mt-8">
              <span className={`mr-3 ${!isYearly ? 'text-indigo-600' : 'text-gray-500'}`}>Monthly</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  isYearly ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <motion.div
                  className="absolute w-6 h-6 bg-white rounded-full top-1"
                  animate={{ left: isYearly ? '1.5rem' : '0.25rem' }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
              <span className={`ml-3 ${isYearly ? 'text-indigo-600' : 'text-gray-500'}`}>
                Yearly (Save 20%)
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/{isYearly ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Supercharge Your Ads?</h2>
            <p className="text-xl opacity-90 mb-8">Join thousands of marketers creating better ads with AI</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 text-lg font-medium bg-white text-indigo-600 rounded-lg hover:bg-gray-100"
              >
                Get Started Free
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-indigo-400">Features</a></li>
                <li><a href="#pricing" className="hover:text-indigo-400">Pricing</a></li>
                <li><a href="#demo" className="hover:text-indigo-400">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-indigo-400">About</a></li>
                <li><a href="/blog" className="hover:text-indigo-400">Blog</a></li>
                <li><a href="/careers" className="hover:text-indigo-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/help" className="hover:text-indigo-400">Help Center</a></li>
                <li><a href="/contact" className="hover:text-indigo-400">Contact</a></li>
                <li><a href="/status" className="hover:text-indigo-400">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-indigo-400">Privacy</a></li>
                <li><a href="/terms" className="hover:text-indigo-400">Terms</a></li>
                <li><a href="/security" className="hover:text-indigo-400">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2024 Adbot.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;