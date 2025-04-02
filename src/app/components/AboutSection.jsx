// app/components/AboutSection.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Award, Factory, Users, Globe, Building2 } from "lucide-react";

const AboutSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const certifications = [
    { title: "ISO 9001:2015", subtitle: "Quality Management", icon: <CheckCircle2 className="h-5 w-5" /> },
    { title: "ISO 14001:2015", subtitle: "Environmental Management", icon: <Globe className="h-5 w-5" /> },
    { title: "OHSAS 18001", subtitle: "Occupational Health & Safety", icon: <Users className="h-5 w-5" /> },
    { title: "ASI Certified", subtitle: "Aluminum Stewardship Initiative", icon: <Award className="h-5 w-5" /> }
  ];
  
  const stats = [
    { value: "35+", label: "Years of Excellence" },
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "20+", label: "Countries Served" }
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About White Gold Aluminum</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            A proud subsidiary of LLA Long Live Aluminum, pioneering excellence in Aluminum solutions with innovation, precision, and unwavering commitment to quality.
          </p>
        </motion.div>
        
        {/* LLA Subsidiary Banner */}
        <motion.div 
          className="mb-12 p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg shadow-lg text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex items-center mb-3 md:mb-0 md:mr-6">
              <Building2 className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-semibold">Subsidiary of LLA Long Live Aluminum</h3>
            </div>
            <p className="text-center md:text-left">
              Leveraging the global strength and resources of our parent company to deliver exceptional quality.
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
                With over three decades of expertise, White Gold Aluminum has established itself as an industry leader in premium Aluminum solutions. As a key subsidiary of LLA Long Live Aluminum, we combine cutting-edge technology with exceptional craftsmanship to deliver superior products that exceed industry standards and client expectations.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our state-of-the-art manufacturing facilities and dedicated team of professionals ensure consistent quality, innovation, and sustainability across all our operations, backed by the global expertise of LLA.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={`mr-3 text-sky-600 transition-all duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`}>
                    {cert.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{cert.title}</h4>
                    <p className="text-sm text-gray-600">{cert.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            As part of the LLA Long Live Aluminum family, White Gold Aluminum is committed to delivering superior Aluminum solutions through innovation, 
            sustainability, and customer-focused approach. Our dedication to excellence is reflected in every 
            product we manufacture and every service we provide.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;