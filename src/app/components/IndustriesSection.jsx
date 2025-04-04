// app/components/IndustriesSection.jsx
"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const IndustriesSection = () => {
  const industries = [
    {
      title: "Construction",
      icon: <Building2 className="h-10 w-10" />,
      description: "Durable and aesthetic profiles for facades, windows, doors, and structural applications.",
      features: ["Curtain Wall Systems", "Window & Door Frames", "Structural Supports", "Decorative Elements"]
    },
    {
      title: "Renewable Energy",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>,
      description: "Frames and components for solar panels. Our lightweight aluminum enhances efficiency and extends installation lifespan.",
      features: ["Solar Panel Frames","Mounting Systems"]
    }
  ];

  return (
    <section id="industries" className="py-20 bg-sky-50 text-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Core Industries
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Specialize In</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our aluminum solutions are tailored specifically for construction and renewable energy applications.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border border-sky-100 hover:shadow-xl transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(14, 165, 233, 0.15)" }}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4 text-sky-600 bg-sky-50 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{industry.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{industry.description}</p>
              
              <div className="mt-auto bg-gradient-to-r from-sky-50 to-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-sky-700 mb-2 text-sm uppercase tracking-wide">Key Applications</h4>
                <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                  {industry.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-700 text-sm">
                      <svg className="h-3.5 w-3.5 text-blue-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Our specialized focus allows us to develop deep expertise and deliver exceptional solutions tailored to these industries' unique requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;