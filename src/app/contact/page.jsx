// app/contact/page.jsx
"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Building
} from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'General',
    message: ''
  });

  const [status, setStatus] = useState({
    type: null,
    message: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        inquiryType: 'General',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to send your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header/>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <div className="w-24 h-1 bg-sky-400 mx-auto mb-6"></div>
            <p className="text-lg text-sky-100 mb-8">
              Get in touch with our team to discuss your aluminum needs. We're here to help with any questions or inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-sky-50 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Address</h3>
                      <p className="text-gray-600 mt-1">
                        Racecourse road near Halloki railway station<br />
                        Lahore, Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-sky-50 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Phone</h3>
                      <p className="text-gray-600 mt-1">+92 324 4054632</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-sky-50 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Email</h3>
                      <p className="text-gray-600 mt-1">info@whitegoldaluminum.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Business Hours Box */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Business Hours</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-sky-600 mr-2" />
                      <span className="text-gray-800 font-medium">Office Hours</span>
                    </div>
                    <span className="text-sky-600 font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-sky-600 mr-2" />
                      <span className="text-gray-800 font-medium">Factory Hours</span>
                    </div>
                    <span className="text-sky-600 font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <p className="text-gray-600 text-sm">
                      Our factory operates 9:00 AM - 6:00 PM to meet production demands while our office is open Monday through Saturday.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
                
                {status.type && (
                  <div className={`mb-6 p-4 rounded-md ${
                    status.type === 'success' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                  }`}>
                    <div className="flex items-center">
                      {status.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className={status.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                        {status.message}
                      </span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Enter your name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Enter your email"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Enter your phone number"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Enter your company name"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      disabled={isSubmitting}
                    >
                      <option value="General">General Inquiry</option>
                      <option value="Quote">Request a Quote</option>
                      <option value="Product">Product Information</option>
                      <option value="Technical">Technical Support</option>
                      <option value="Partnership">Partnership Opportunity</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Please provide details about your inquiry..."
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          Sending... 
                          <div className="ml-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
              Visit Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Location</h2>
            <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="h-[400px] bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3406.303283044412!2d74.29094307560587!3d31.378199974279397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDIyJzQxLjUiTiA3NMKwMTcnMzYuNyJF!5e0!3m2!1sen!2s!4v1743782388034!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Manufacturing Facility</h3>
              <p className="text-gray-600">
                <strong>Address:</strong> Racecourse road near Halloki railway station, Lahore, Pakistan
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-sky-600 mr-2" />
                  <span className="text-gray-700"><strong>Office Hours:</strong> 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-sky-600 mr-2" />
                  <span className="text-gray-700"><strong>Factory Hours:</strong> 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}