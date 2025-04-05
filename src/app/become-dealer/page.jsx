// app/become-dealer/page.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Send, MapPin, Phone, Mail } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BecomeDealer() {
  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    businessType: "",
    yearsInBusiness: "",
    existingProducts: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
        businessType: "",
        yearsInBusiness: "",
        existingProducts: "",
        message: ""
      });
    }, 1500);
  };

  const benefits = [
    {
      title: "Premium Product Access",
      description: "Gain exclusive access to our high-quality aluminum product range with competitive dealer pricing"
    },
    {
      title: "Marketing Support",
      description: "Receive comprehensive marketing materials, including product catalogs, displays, and digital assets"
    },
    {
      title: "Technical Training",
      description: "Benefit from product knowledge and technical training to better serve your customers"
    },
    {
      title: "Dedicated Support",
      description: "Work with a dedicated account manager for personalized service and support"
    },
    {
      title: "Growth Opportunities",
      description: "Expand your business with a trusted aluminum manufacturer and access new market segments"
    },
    {
      title: "Brand Recognition",
      description: "Associate with White Gold Aluminium's established reputation for quality and innovation"
    }
  ];

  return (
    <main>
      <Header/>
      {/* Hero section - Improved Responsiveness */}
      <section className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] text-white">
        <div className="absolute inset-0 opacity-40 bg-pattern">
          <Image 
            src="/aluminium-factory.png" 
            alt="Aluminum Factory" 
            fill 
            style={{objectFit: "cover"}}
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-70"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24 h-full flex flex-col justify-center relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-4 sm:mb-6 inline-block"
            >
              <span className="bg-blue-400 text-white text-xs sm:text-sm md:text-base uppercase tracking-wider py-1 px-3 sm:py-2 sm:px-5 rounded-full font-bold shadow-lg">
                Partnership Opportunity
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
              Become a White Gold Aluminium Dealer
            </h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-blue-50 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join our network of authorized dealers and grow your business with our premium aluminum solutions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link 
                href="#application-form"
                className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-md transition-colors duration-300 shadow-md"
              >
                Apply Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Benefits section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              Why Become a Dealer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Dealer Program Benefits</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Partner with White Gold Aluminium and unlock valuable business growth opportunities with our comprehensive dealer program.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start mb-4">
                  <div className="mt-1 mr-4 text-blue-500">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Application form */}
      <section id="application-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              Application Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Apply to Become a Dealer</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Complete the form below to express your interest in becoming an authorized White Gold Aluminium dealer.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              {submitStatus === 'success' ? (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for your interest in becoming a White Gold Aluminium dealer. Our team will review your application 
                    and contact you within 2-3 business days to discuss the next steps.
                  </p>
                  <Link 
                    href="/"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
                  >
                    Return to Homepage <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Person*</label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City/Region*</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">Business Type*</label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Business Type</option>
                        <option value="Retailer">Retailer</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Contractor">Contractor</option>
                        <option value="Fabricator">Fabricator</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-700 mb-1">Years in Business*</label>
                      <input
                        type="number"
                        id="yearsInBusiness"
                        name="yearsInBusiness"
                        value={formData.yearsInBusiness}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="existingProducts" className="block text-sm font-medium text-gray-700 mb-1">Current Products Sold</label>
                      <input
                        type="text"
                        id="existingProducts"
                        name="existingProducts"
                        value={formData.existingProducts}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us about your business, sales channels, and why you're interested in becoming a dealer..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      <Send className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact information */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Have Questions About Our Dealer Program?</h2>
            <p className="mb-8">
              Our team is here to provide you with all the information you need about becoming a White Gold Aluminium dealer.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 p-3 rounded-full mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p>+92 324 4054632</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/20 p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p>info@whitegoldaluminum.com</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/20 p-3 rounded-full mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p>Racecourse road, Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}