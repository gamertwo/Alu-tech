// app/become-supplier/page.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Send, BarChart2, Shield, Clock, CreditCard, Truck, ThumbsUp } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BecomeSupplier() {
  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    materialsSupplied: "",
    certifications: "",
    productionCapacity: "",
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
        website: "",
        businessType: "",
        materialsSupplied: "",
        certifications: "",
        productionCapacity: "",
        message: ""
      });
    }, 1500);
  };

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality",
      description: "We expect the highest quality materials and components that meet or exceed industry standards"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Reliability",
      description: "Consistent and on-time delivery is essential to maintain our production schedules"
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Innovation",
      description: "We value suppliers who bring innovative solutions and continuous improvement"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Competitive Pricing",
      description: "Fair and competitive pricing that enables mutual growth and sustainability"
    },
    {
      icon: <ThumbsUp className="h-8 w-8" />,
      title: "Ethical Standards",
      description: "Commitment to ethical business practices, social responsibility, and environmental stewardship"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Long-term Partnership",
      description: "We seek to build lasting relationships with our suppliers based on mutual trust and respect"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Submit Application",
      description: "Complete our supplier application form with your company information and capabilities"
    },
    {
      number: "02",
      title: "Initial Review",
      description: "Our procurement team will review your application and assess alignment with our needs"
    },
    {
      number: "03",
      title: "Due Diligence",
      description: "We conduct thorough evaluation including quality systems, certifications, and references"
    },
    {
      number: "04",
      title: "Sample Evaluation",
      description: "If applicable, we'll request product samples for testing and quality assessment"
    },
    {
      number: "05",
      title: "Contract & Onboarding",
      description: "Upon approval, we'll establish terms and integrate you into our supplier network"
    }
  ];

  return (
    <main>
      <Header/>
      {/* Hero section - Made Responsive */}
      <section className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] text-white">
        <div className="absolute inset-0 opacity-40 bg-pattern">
          <Image 
            src="/CNC-machine.png" 
            alt="Aluminum Manufacturing" 
            fill 
            style={{objectFit: "cover"}}
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-sky-600 opacity-70"></div>
        
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
              <span className="bg-sky-400 text-white text-xs sm:text-sm md:text-base uppercase tracking-wider py-1 px-3 sm:py-2 sm:px-5 rounded-full font-bold shadow-lg">
                Supply Chain Partnership
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
              Become a White Gold Aluminium Supplier
            </h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-sky-50 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join our network of trusted suppliers and be part of our commitment to excellence in aluminum manufacturing.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link 
                href="#supplier-application"
                className="inline-flex items-center bg-white text-sky-600 hover:bg-sky-50 font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-md transition-colors duration-300 shadow-md"
              >
                Apply Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Our Values section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
              Our Expectations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What We Value in Suppliers</h2>
            <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              At White Gold Aluminium, we seek suppliers who share our commitment to excellence and can help us deliver premium aluminum products.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg p-6 border border-sky-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-sky-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-sky-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 flex-grow">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process steps */}
      <section className="py-16 bg-sky-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white text-sky-600 text-sm font-medium mb-4">
              Supplier Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How to Become a Supplier</h2>
            <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our supplier onboarding process is designed to ensure mutual success and establish strong business relationships.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex mb-8 last:mb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 mr-6">
                  <div className="bg-sky-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-full w-0.5 bg-sky-200 mx-auto mt-4"></div>
                  )}
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Application form */}
      <section id="supplier-application" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
              Supplier Application
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Apply to Become a Supplier</h2>
            <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Complete the form below to begin the supplier qualification process with White Gold Aluminium.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border border-sky-100">
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
                    Thank you for your interest in becoming a White Gold Aluminium supplier. Our procurement team will review 
                    your application and contact you within 5-7 business days to discuss potential opportunities.
                  </p>
                  <Link 
                    href="/"
                    className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      >
                        <option value="">Select Business Type</option>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Service Provider">Service Provider</option>
                        <option value="Raw Materials">Raw Materials Supplier</option>
                        <option value="Equipment">Equipment Supplier</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="materialsSupplied" className="block text-sm font-medium text-gray-700 mb-1">Products/Materials Supplied*</label>
                      <input
                        type="text"
                        id="materialsSupplied"
                        name="materialsSupplied"
                        value={formData.materialsSupplied}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                      <input
                        type="text"
                        id="certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                        placeholder="ISO 9001, ISO 14001, etc."
                      />
                    </div>
                    <div>
                      <label htmlFor="productionCapacity" className="block text-sm font-medium text-gray-700 mb-1">Production Capacity</label>
                      <input
                        type="text"
                        id="productionCapacity"
                        name="productionCapacity"
                        value={formData.productionCapacity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Tell us about your company, relevant experience, and any other information that might be useful..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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
      
      {/* CTA section */}
      <section className="py-12 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Partner with White Gold Aluminium?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join our network of trusted suppliers and be part of our commitment to delivering premium aluminum solutions.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="#supplier-application"
              className="inline-flex items-center bg-white text-sky-600 hover:bg-sky-50 px-8 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}