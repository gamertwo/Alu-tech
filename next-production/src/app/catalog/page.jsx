// app/catalog/page.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, FileText, Book, FileDown } from "lucide-react";
import Header from "../components/Header";

export default function Catalog() {
  // Path to your PDF catalog
  const pdfPath = "/catalog/white-gold-aluminum-catalog.pdf";
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[300px] bg-gradient-to-r from-sky-700 to-sky-500 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/catalog/catalog-hero.jpg" 
              alt="White Gold Aluminum Catalog" 
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Catalog</h1>
              <p className="text-xl text-sky-100">
                Access our comprehensive catalog of aluminum products and solutions
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Catalog Download Section */}
        <section className="py-16 bg-sky-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                Our Products
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">White Gold Aluminum Catalog</h2>
              <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Download our complete product catalog for detailed specifications and product information
              </p>
            </motion.div>
            
            {/* Catalog Download Card */}
            <div className="max-w-3xl mx-auto">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-md border border-sky-100 text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative w-40 h-52 bg-sky-50 rounded-md shadow-md overflow-hidden flex items-center justify-center">
                    <FileText size={60} className="text-sky-400" />
                    <div className="absolute bottom-0 w-full py-2 bg-sky-600 text-white text-xs font-medium">
                      PDF CATALOG
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Product Catalog</h3>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                  Our catalog includes detailed specifications, measurements, and installation guidelines for all our aluminum products.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a 
                    href={pdfPath} 
                    download="White_Gold_Aluminum_Catalog.pdf"
                    className="px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors flex items-center justify-center"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ y: 0 }}
                  >
                    <Download size={20} className="mr-2" />
                    Download Catalog (PDF)
                  </motion.a>
                  
                  <motion.a 
                    href="/contact"
                    className="px-6 py-3 border border-sky-600 text-sky-600 rounded-md hover:bg-sky-50 transition-colors flex items-center justify-center"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ y: 0 }}
                  >
                    <Book size={20} className="mr-2" />
                    Request Physical Copy
                  </motion.a>
                </div>
              </motion.div>
              
              {/* Additional Info */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mt-8 bg-sky-600 p-6 rounded-lg shadow-md text-white"
              >
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <FileDown size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Need Help?</h4>
                    <p>
                      If you have any questions about our products or need assistance with the catalog, 
                      please contact our sales team at <span className="font-medium">0324 4054632</span>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Product Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Product Categories</h2>
              <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                Our catalog is organized by these main product categories for easy navigation
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Window Profiles",
                  image: "/catalog/window-profiles.jpg",
                  description: "Aluminum profiles for all types of windows including sliding, casement, and fixed designs."
                },
                {
                  title: "Door Systems",
                  image: "/catalog/door-systems.jpg",
                  description: "Complete aluminum door solutions for residential and commercial applications."
                },
                {
                  title: "Solar Panel Channels",
                  image: "/catalog/solar-channels.jpg",
                  description: "Specialized aluminum channels designed for solar panel mounting and installation."
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.6,
                        delay: index * 0.1
                      } 
                    }
                  }}
                  className="bg-sky-50 rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image 
                      src={category.image} 
                      alt={category.title}
                      fill
                      style={{objectFit: "cover"}}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <a 
                      href={pdfPath}
                      download="White_Gold_Aluminum_Catalog.pdf"
                      className="text-sky-600 hover:text-sky-800 font-medium flex items-center"
                    >
                      Download Catalog
                      <Download size={16} className="ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}