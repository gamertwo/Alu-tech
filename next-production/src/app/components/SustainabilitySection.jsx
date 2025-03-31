// app/components/SustainabilitySection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Recycle } from "lucide-react";

const SustainabilitySection = () => {
  const sustainabilityItems = [
    { 
      icon: <Recycle className="h-6 w-6 text-green-600 mt-1 mr-3" />,
      title: "100% Recyclable Material",
      description: "Our aluminium products are fully recyclable, supporting a circular economy."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
      title: "Reduced Carbon Footprint",
      description: "Energy-efficient production processes and renewable energy sources."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      title: "Energy-Efficient Products",
      description: "Our aluminium solutions help customers reduce their energy consumption."
    }
  ];

  const innovations = [
    {
      title: "Advanced Alloys",
      description: "Developing next-generation aluminium alloys with enhanced properties for demanding applications."
    },
    {
      title: "Smart Manufacturing",
      description: "Industry 4.0 technologies for precision control and real-time quality monitoring."
    },
    {
      title: "Digital Solutions",
      description: "Online tools for customers to design, visualize, and order custom aluminium products."
    }
  ];

  return (
    <section id="sustainability" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sustainability & Innovation</h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            We're committed to environmentally responsible practices and continuous innovation.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Leading the Way in Sustainable Aluminium</h3>
            <p className="text-gray-600 mb-6">
              At White Gold Aluminium, sustainability isn't just a buzzword—it's integrated into everything we do. 
              Our state-of-the-art facilities are designed to minimize environmental impact while 
              maximizing efficiency and product quality.
            </p>
            <div className="space-y-4">
              {sustainabilityItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {item.icon}
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/sustaintability.png" 
              alt="Sustainable Aluminum Production" 
              fill 
              style={{objectFit: "cover"}}
            />
          </motion.div>
        </div>
        
       
      </div>
    </section>
  );
};

export default SustainabilitySection;