// app/components/ContactSection.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

const ContactSection = ({ formData: externalFormData, handleInputChange: externalHandleInputChange, handleSubmit: externalHandleSubmit } = {}) => {
  // Create local state to use if external props are not provided
  const [localFormData, setLocalFormData] = useState({
    name: "",
    email: "",
    inquiryType: "General",
    message: ""
  });
  const [status, setStatus] = useState({ type: null, message: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use external handlers if provided, otherwise use local handlers
  const formData = externalFormData || localFormData;
  
  const handleInputChange = externalHandleInputChange || ((e) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
  });
  
  const handleSubmit = externalHandleSubmit || (async (e) => {
    e.preventDefault();
    // Silently connect to API without showing any loading state or response
    
    try {
      // Call the API but don't wait for the response or show any feedback
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localFormData),
      }).catch((err) => {
        // Silently handle any errors
        console.log("Form submission occurred in the background");
      });
      
      // Don't reset form or show any status messages
      
    } catch (error) {
      // Silently catch errors without showing anything to the user
      console.log("Silent submission occurred");
    }
  });

  return (
    <>
      <section id="contact" className="py-12 md:py-20 bg-sky-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-600 text-xs md:text-sm font-medium mb-3 md:mb-4">
              Get In Touch
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Contact Us</h2>
            <div className="w-16 md:w-24 h-1 bg-sky-500 mx-auto mb-4 md:mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
              Get in touch with our team to discuss your aluminum needs and how we can help.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-sky-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800">Send Us a Message</h3>
              
              {/* Status message is hidden since we're doing silent submission */}
              {false && status.type && (
                <div className={`mb-6 p-3 md:p-4 rounded-md ${status.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center">
                    {status.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 mr-2" />
                    )}
                    <span className={`text-sm md:text-base ${status.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                      {status.message}
                    </span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Quote">Request a Quote</option>
                    <option value="Technical">Technical Support</option>
                    <option value="Partnership">Partnership Opportunity</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 md:py-3 px-4 rounded-md transition-colors flex items-center justify-center text-sm md:text-base"
                >
                  Send Message <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <motion.div 
                className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-sky-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800">Contact Information</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-sky-50 p-2 rounded-full text-sky-600 mr-3">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base">Address</h4>
                      <p className="text-gray-600 text-xs md:text-sm">
                        Racecourse road near Halloki railway station<br />Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-sky-50 p-2 rounded-full text-sky-600 mr-3">
                      <Phone className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base">Phone</h4>
                      <p className="text-gray-600 text-xs md:text-sm">+92 324 40546327</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-sky-50 p-2 rounded-full text-sky-600 mr-3">
                      <Mail className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base">Email</h4>
                      <p className="text-gray-600 text-xs md:text-sm break-words">info@whitegoldaluminum.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-sky-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs md:text-sm">Monday - Friday:</span>
                    <span className="text-gray-800 font-medium text-xs md:text-sm">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs md:text-sm">Saturday:</span>
                    <span className="text-gray-800 font-medium text-xs md:text-sm">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-xs md:text-sm">Sunday:</span>
                    <span className="text-gray-800 font-medium text-xs md:text-sm">Closed</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">Global Presence</h4>
                  <p className="text-gray-600 text-xs md:text-sm">
                    With manufacturing facilities and sales offices across all over Pakistan.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-sky-600 to-sky-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Start Your Aluminum Project?</h2>
            <p className="max-w-2xl mx-auto mb-6 md:mb-8 text-sky-100 text-sm md:text-base">
              Partner with White Gold Aluminum for innovative Aluminum solutions that deliver performance, quality, and value.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto"
              >
                <Link href="#contact" className="block w-full md:w-auto bg-white text-sky-600 hover:bg-sky-50 px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-colors text-center text-sm md:text-base">
                  Request a Quote
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto"
              >
                <Link href="/services" className="block w-full md:w-auto bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-colors text-center text-sm md:text-base">
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;