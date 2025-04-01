'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, Building, MessageSquare } from 'lucide-react';
import Image from 'next/image';

const MeetingModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    productId: product?.id || '',
    productName: product?.title || '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.preferredDate) errors.preferredDate = 'Please select a date';
    if (!formData.preferredTime) errors.preferredTime = 'Please select a time';
    
    return errors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would call an API endpoint
      // For this demo, we'll simulate an API call
      const response = await fetch('/api/meeting-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requestDate: new Date().toISOString(),
          status: 'pending'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Reset form and show success message
      setIsSubmitted(true);
      
      // Reset form data after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
          productId: product?.id || '',
          productName: product?.title || '',
        });
        setIsSubmitting(false);
      }, 500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // Handle error (in a real app, you'd show an error message)
    }
  };
  
  const handleCloseModal = () => {
    // Reset form state when closing
    setIsSubmitted(false);
    setFormErrors({});
    onClose();
  };
  
  // Generate available time slots for the form
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour >= 12 ? 'PM' : 'AM';
      
      slots.push(`${hourFormatted}:00 ${period}`);
      if (hour !== endHour) {
        slots.push(`${hourFormatted}:30 ${period}`);
      }
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Get tomorrow's date for min date in date picker
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  // Get date 3 months from now for max date in date picker
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  if (!product) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
          />
          
          {/* Modal */}
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-start p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800">
                  Schedule a Consultation
                </h3>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
                {/* Product Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill 
                      style={{objectFit: "cover"}}
                      className="rounded-md"
                    />
                  </div>
                  
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{product.title}</h4>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700">Key Features:</h5>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {product.details.slice(0, 3).map((detail, idx) => (
                        <li key={idx}><span className="font-medium">{detail.label}:</span> {detail.value}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {product.price && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                        {product.oldPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Form */}
                <div>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Contact Information */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name*
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input 
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`pl-10 w-full py-2 px-4 border ${formErrors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input 
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`pl-10 w-full py-2 px-4 border ${formErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input 
                            type="tel"
                            name="phone"
                            placeholder="(123) 456-7890"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`pl-10 w-full py-2 px-4 border ${formErrors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company/Organization
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                          </div>
                          <input 
                            type="text"
                            name="company"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={handleChange}
                            className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      {/* Meeting Preferences */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Date*
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                              type="date"
                              name="preferredDate"
                              value={formData.preferredDate}
                              onChange={handleChange}
                              min={getTomorrowDate()}
                              max={getMaxDate()}
                              className={`pl-10 w-full py-2 px-4 border ${formErrors.preferredDate ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          {formErrors.preferredDate && <p className="mt-1 text-sm text-red-500">{formErrors.preferredDate}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Time*
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock className="h-5 w-5 text-gray-400" />
                            </div>
                            <select 
                              name="preferredTime"
                              value={formData.preferredTime}
                              onChange={handleChange}
                              className={`pl-10 w-full py-2 px-4 border ${formErrors.preferredTime ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                            >
                              <option value="">Select Time</option>
                              {timeSlots.map((slot, idx) => (
                                <option key={idx} value={slot}>{slot}</option>
                              ))}
                            </select>
                          </div>
                          {formErrors.preferredTime && <p className="mt-1 text-sm text-red-500">{formErrors.preferredTime}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Information
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-gray-400" />
                          </div>
                          <textarea 
                            name="message"
                            placeholder="Share any specific requirements or questions you have..."
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-10">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Consultation Request Submitted!</h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for your interest in {product.title}. Our team will contact you shortly to confirm your consultation.
                      </p>
                      <button
                        onClick={handleCloseModal}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MeetingModal;