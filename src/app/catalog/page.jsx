// app/catalog/page.jsx
"use client";

import { motion } from "framer-motion";
import { Download, FileText, Book, HelpCircle, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Link from "next/link";

export default function Catalog() {
  // Path to your PDF catalog
  const pdfPath = "/Catalog Design.pdf";
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500 text-white text-sm font-medium">
                Product Information
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Aluminium Products Catalog</h1>
              <p className="text-xl text-blue-100 mb-8">
                Access our comprehensive guide to premium aluminium solutions for your projects
              </p>
              
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="inline-block"
              >
                <Link 
                  href="#download-section" 
                  className="group bg-white text-blue-600 px-8 py-3 rounded-md font-medium transition-all duration-300 flex items-center shadow-md"
                >
                  <span>View Catalog</span>
                  <motion.span 
                    className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Catalog Download Section */}
        <section id="download-section" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                Our Catalog
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">White Gold Aluminum Catalog</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Download our complete product catalog featuring our extensive range of aluminium solutions with detailed specifications
              </p>
            </motion.div>
            
            {/* Catalog Download Card */}
            <div className="max-w-3xl mx-auto">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-md border border-blue-100"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-36 h-48 bg-blue-50 rounded-md shadow-md overflow-hidden flex items-center justify-center">
                      <FileText size={60} className="text-blue-400" />
                    
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Product Catalog</h3>
                    <p className="text-gray-600 mb-3">
                      Our comprehensive catalog includes:
                    </p>
                    <ul className="text-gray-600 mb-6 list-disc list-inside text-left">
                      <li>Detailed technical specifications</li>
                      <li>Product dimensions and tolerances</li>
                      <li>Material properties and finishes</li>
                      <li>Application guidelines and best practices</li>
                      <li>Installation instructions</li>
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.a 
                        href={pdfPath} 
                        download="White_Gold_Aluminum_Catalog.pdf"
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ y: 0 }}
                      >
                        <Download size={20} className="mr-2" />
                        Download Catalog
                      </motion.a>
                      
                      <motion.a 
                        href="/contact"
                        className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center"
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ y: 0 }}
                      >
                        <Book size={20} className="mr-2" />
                        Request Physical Copy
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Additional Info */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mt-8 bg-blue-600 p-6 rounded-lg shadow-md text-white"
              >
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Need Assistance?</h4>
                    <p className="mb-2">
                      Our team is available to help you find the right aluminium solutions for your project.
                    </p>
                    <p>
                      Contact our product specialists at <span className="font-medium">0324 4054632</span> or email us at <span className="font-medium">info@whitegoldaluminium.com</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Customized Solutions Available</h2>
              <p className="text-gray-600 mb-8">
                Can't find exactly what you need in our catalog? We offer custom aluminium solutions tailored to your specific requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link 
                    href="/contact" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 inline-block"
                  >
                    Request Custom Quote
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link 
                    href="/products" 
                    className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium transition-all duration-300 inline-block"
                  >
                    View All Products
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}