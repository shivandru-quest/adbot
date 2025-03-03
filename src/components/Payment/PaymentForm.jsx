import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCalendar, FiLock } from 'react-icons/fi';

const PaymentForm = ({ onSubmit, isProcessing }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Please enter the cardholder name';
    }
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="relative">
          <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength="16"
          />
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          name="cardHolder"
          value={formData.cardHolder}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
            errors.cardHolder ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.cardHolder && (
          <p className="mt-1 text-sm text-red-500">{errors.cardHolder}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength="5"
            />
          </div>
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength="4"
            />
          </div>
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-lg text-white flex items-center justify-center space-x-2 ${
          isProcessing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        <FiLock className="w-4 h-4" />
        <span>{isProcessing ? 'Processing...' : 'Pay Now'}</span>
      </motion.button>
    </form>
  );
};

export default PaymentForm;