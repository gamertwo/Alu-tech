// app/projects/CallToAction.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

const CallToAction = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="mt-16"
    >
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white py-12 px-8 rounded-xl shadow-lg overflow-hidden relative">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: "url('/patterns/diagonal-lines.svg')",
            backgroundSize: "50px"
          }}
        ></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-4">Have a Project in Mind?</h3>
              <p className="max-w-xl mb-6">
                White Gold Aluminum is ready to provide premium aluminum solutions for your next construction or solar project. Contact our team to discuss your requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span>0324 4054632</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>info@whitegoldaluminum.com</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  href="/contact" 
                  className="bg-white text-sky-700 hover:bg-sky-50 px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap"
                >
                  Contact Us 
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  href="/products" 
                  className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap"
                >
                  View Products
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CallToAction;