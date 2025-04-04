// app/components/LogoSection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LogoSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-6 bg-slate-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* LLA Affiliation - Left Side */}
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
          >
            <div className="bg-white rounded-lg shadow-md mr-4 flex items-center justify-center p-2 overflow-hidden">
              <Image 
                src="/LLAlogo.png" 
                alt="LLA Logo" 
                width={50} 
                height={50}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Proudly part of</p>
              <h3 className="text-xl font-bold text-blue-800">LLA - Long Life Aluminum</h3>
              <p className="text-gray-600 text-sm">Sustainable aluminum solutions since 1975</p>
            </div>
          </motion.div>

          {/* Right Side - Excellence Badges - Visible on desktop only */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            variants={itemVariants}
          >
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium shadow-sm border border-blue-100">
              Modern Production
            </span>
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium shadow-sm border border-blue-100">
              Skilled Workforce
            </span>
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium shadow-sm border border-blue-100">
              Superior Quality
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSection;