// app/components/AboutSection.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Award, Factory, Users, Globe, Building2, X, Eye } from "lucide-react";

const AboutSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const certifications = [
    { title: "ISO 9001:2015", subtitle: "Quality Management", icon: <CheckCircle2 className="h-5 w-5" /> },
  ];
  
  const stats = [
    { value: "35+", label: "Years of Excellence" },
    { value: "500+", label: "Projects Completed" },
    // { value: "98%", label: "Client Satisfaction" },
    // { value: "20+", label: "Countries Served" }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Our Legacy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About WHITE GOLD ALUMINUM (PRIVATE) LIMITED</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          
          {/* LLA Logo with Text */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <p className="max-w-2xl text-gray-600">
              A proud subsidiary of LLA Long Life Aluminum, pioneering excellence in Aluminum solutions with innovation, precision, and unwavering commitment to quality.
            </p>
          </div>
        </motion.div>
        
     
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Excellence in Aluminum Since 1985</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With over three decades of expertise, White Gold Aluminum has established itself as an industry leader in premium Aluminum solutions. As a key subsidiary of LLA Long Life Aluminum, we combine cutting-edge technology with exceptional craftsmanship to deliver superior products that exceed industry standards and client expectations.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our state-of-the-art manufacturing facilities and dedicated team of professionals ensure consistent quality, innovation, and sustainability across all our operations, backed by the global expertise of LLA.
              </p>
            </div>
            
            {/* Enhanced Certificate Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-md border border-sky-100 hover:shadow-lg transition-all duration-300 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div className={`mr-3 text-sky-600 transition-all duration-300 ${hoveredIndex === 0 ? 'scale-110' : ''}`}>
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">ISO 9001:2015</h4>
                    <p className="text-gray-600">Quality Management System</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCertificate(true)}
                  className="flex items-center bg-sky-50 hover:bg-sky-100 text-sky-600 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Certificate
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600">Our ISO 9001:2015 certification demonstrates our commitment to consistent quality and customer satisfaction through continuous improvement and rigorous quality management processes.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Certified since 2010</span>
                  <span className="text-sm text-gray-500">Last audit: January 2024</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="space-y-8">
            <motion.div 
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image 
                src="/aluminium-factory.png" 
                alt="Our Factory" 
                fill 
                style={{objectFit: "cover"}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 to-transparent">
                <div className="absolute bottom-0 left-0 p-6">
                  <h4 className="text-white text-xl font-bold mb-2">State-of-the-Art Facilities</h4>
                  <p className="text-sky-100 max-w-xs">Our modern production facilities utilize advanced technology to ensure the highest quality standards.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-sky-100 shadow-sm text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-sky-600">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-16 p-6 bg-sky-600 rounded-lg shadow-lg text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <Factory className="h-6 w-6 mr-2" />
            <h3 className="text-xl font-semibold">Our Commitment to Excellence</h3>
          </div>
          <p className="max-w-3xl mx-auto">
            As part of the LLA Long Life Aluminum family, White Gold Aluminum is committed to delivering superior Aluminum solutions through innovation, 
            sustainability, and customer-focused approach. Our dedication to excellence is reflected in every 
            product we manufacture and every service we provide.
          </p>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-4 relative">
            <button 
              onClick={() => setShowCertificate(false)}
              className="absolute right-4 top-4 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 text-gray-700 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">ISO 9001:2015 Certificate</h3>
            <div className="relative h-[500px] w-full rounded overflow-hidden">
              <Image 
                src="/ISOcert.png" 
                alt="ISO 9001:2015 Certificate" 
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <button 
                onClick={() => setShowCertificate(false)}
                className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded font-medium transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;