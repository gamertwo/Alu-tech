// app/components/IndustriesSection.jsx
"use client";

import { motion } from "framer-motion";
import { Factory } from "lucide-react";

const IndustriesSection = () => {
  const industries = [
    {
      title: "Aerospace",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>,
      description: "Lightweight, high-strength components for aircraft and spacecraft applications."
    },
    {
      title: "Automotive",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      description: "Fuel-efficient solutions for vehicle bodies, engines, and structural components."
    },
    {
      title: "Construction",
      icon: <Factory className="h-12 w-12" />,
      description: "Durable and aesthetic profiles for facades, windows, doors, and structural applications."
    },
    {
      title: "Electronics",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>,
      description: "Heat sinks, enclosures, and components for electronic devices and equipment."
    },
    {
      title: "Packaging",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>,
      description: "Sustainable aluminium foils and containers for food and beverage packaging."
    },
    {
      title: "Renewable Energy",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>,
      description: "Frames and components for solar panels, wind turbines, and energy systems."
    }
  ];

  return (
    <section id="industries" className="py-20 bg-sky-50 text-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Industries
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our aluminium solutions are trusted across diverse industries worldwide.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-sm border border-sky-100 text-center hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px -10px rgba(14, 165, 233, 0.15)" }}
            >
              <div className="flex justify-center mb-4 text-sky-600 bg-sky-50 p-4 rounded-full w-20 h-20 mx-auto">
                {industry.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{industry.title}</h3>
              <p className="text-gray-600">{industry.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Client Logos */}
        <motion.div 
          className="mt-20 p-10 bg-sky-600 rounded-xl shadow-lg text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">Trusted By Industry Leaders</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((logo) => (
              <motion.div 
                key={logo} 
                className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg w-32 h-16 flex items-center justify-center border border-sky-200 border-opacity-30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: logo * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              >
                <div className="text-white font-semibold">Client Logo</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;