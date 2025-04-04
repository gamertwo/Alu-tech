// app/about/page.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Award, Clock, Users, User, X, ExternalLink } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LogoSection from "../components/LogoSection";

export default function AboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <main className="bg-sky-50">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-gradient-to-r from-sky-700 to-sky-500 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/aluminium-factory.png" 
              alt="White Gold Aluminum Factory" 
              fill 
              style={{objectFit: "cover"}}
              priority
            />
          </div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About White Gold Aluminum</h1>
              <p className="text-xl text-sky-100">
                A legacy of excellence in aluminum manufacturing since 2008
              </p>
            </motion.div>
          </div>
        </section>

        {/* Integrated Logo Section */}
        <LogoSection />

        {/* Company Overview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="space-y-6"
              >
                <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">A Rich Heritage of Manufacturing Excellence</h2>
                <div className="w-24 h-1 bg-sky-500"></div>
                <p className="text-gray-600 leading-relaxed">
                  White Gold Aluminum was founded in 2008 by Mr. Rizwan Habib, continuing a family legacy in manufacturing that spans over 90 years. Our journey began in 1935 when Haji Muhammad Abdullah, the grandfather of our current CEO, started manufacturing wood products.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The tradition continued with Habib Ullah, the third child of Haji Abdullah, who expanded into lathe machines, rubber, aluminum, and steel products by founding Jojo Traders in 1973. Today, under the leadership of Rizwan Habib, White Gold Aluminum has been producing premium aluminum products for 23 years.
                </p>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
              >
                <Image 
                  src="/aluminium-factory.png" 
                  alt="Company History" 
                  fill 
                  style={{objectFit: "cover"}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">90 Years of Manufacturing Heritage</h3>
                  <p className="text-sky-100">From wood to aluminum: a story of innovation and growth</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                Our Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Led by Experience</h2>
              <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-sky-50 rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg bg-sky-200 flex items-center justify-center">
                  <User size={64} className="text-sky-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">Mr. Rizwan Habib</h3>
                  <p className="text-sky-600 font-medium mb-4">Chief Executive Officer</p>
                  <p className="text-gray-600">
                    Leading White Gold Aluminum with vision and expertise since founding the company in 2008.
                    Continuing a family legacy of manufacturing excellence into the third generation.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-sky-50 rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg bg-sky-200 flex items-center justify-center">
                  <User size={64} className="text-sky-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">Osama Saeed Sandhu</h3>
                  <p className="text-sky-600 font-medium mb-4">Chief Operating Officer</p>
                  <p className="text-gray-600">
                    Overseeing operations with dedication and precision to ensure White Gold Aluminum 
                    maintains its reputation for quality and reliability.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values & Certifications */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Core Values */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                  Our Values
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">What Drives Us</h2>
                <div className="w-20 h-1 bg-sky-500 mb-8"></div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                        <CheckCircle2 size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Honesty</h3>
                      <p className="text-gray-600">
                        We believe in transparent business practices and building trust with our clients through honesty in every interaction.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                        <Clock size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Commitment</h3>
                      <p className="text-gray-600">
                        We are committed to delivering excellence in every product and service we provide, honoring deadlines and promises.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                        <Users size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Great Value with Low Cost</h3>
                      <p className="text-gray-600">
                        We strive to provide premium aluminum products at competitive prices, maximizing value for our customers.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Certifications & Manufacturing Process */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                  Our Credentials
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Certifications & Process</h2>
                <div className="w-20 h-1 bg-sky-500 mb-8"></div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-sky-100 mb-8">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-sky-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Industry Certifications</h3>
                  </div>
                  <div className="bg-sky-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer" onClick={openModal}>
                    <div className="mb-4 flex justify-center">
                      <Image 
                        src="/ISOcert.png" 
                        alt="ISO Certificate Thumbnail" 
                        width={80}
                        height={80}
                        style={{objectFit: "contain"}}
                        className="opacity-70"
                      />
                    </div>
                    <p className="font-semibold text-sky-700 mb-3">ISO Certification</p>
                    <button 
                      className="flex items-center mx-auto gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
                      onClick={openModal}
                    >
                      <ExternalLink size={16} />
                      <span>View Certificate</span>
                    </button>
                  </div>
                </div>
                
                {/* LLA Subsidiary Banner */}
                <motion.div 
                  className="mb-8 p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg shadow-lg text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="bg-white rounded-lg shadow-sm p-2 flex items-center justify-center">
                      <Image 
                        src="/LLAlogo.png" 
                        alt="LLA Logo" 
                        width={40} 
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="flex items-center mb-3 md:mb-0 md:mr-6 pl-4">
                      <h3 className="text-xl font-semibold">Subsidiary of LLA Long Life Aluminum</h3>
                    </div>
                    <p className="text-center md:text-left">
                    </p>
                  </div>
                </motion.div>
                
             
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Location & Hours */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Location & Hours</h2>
              <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-sky-50 p-6 rounded-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manufacturing Facility</h3>
                <p className="text-gray-600 mb-6">
                  <strong>Address:</strong> Racecourse road near Halloki railway station
                </p>
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
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
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-sky-50 p-6 rounded-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Working Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-sky-100 pb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Office Hours</h4>
                      <p className="text-gray-600">For inquiries and meetings</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                      <p className="text-sky-700 font-medium">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">Factory Hours</h4>
                      <p className="text-gray-600">Production operations</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                      <p className="text-sky-700 font-medium">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-sky-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Contact Us</h4>
                  <p className="text-gray-600 mb-2">
                    For inquiries, please contact our sales team:
                  </p>
                  <p className="text-sky-700 font-medium">
                    WhatsApp: +92 324 4054632
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <Footer/>
      </main>

      {/* Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="bg-white rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-sky-600 text-white flex justify-between items-center">
                <h3 className="text-xl font-semibold">ISO Certification</h3>
                <button 
                  className="text-white hover:text-sky-100"
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
                <div className="flex justify-center">
                  <div className="relative h-[60vh] w-full">
                    <Image 
                      src="/ISOcert.png" 
                      alt="ISO Certificate" 
                      fill
                      style={{objectFit: "contain"}}
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button 
                  className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}