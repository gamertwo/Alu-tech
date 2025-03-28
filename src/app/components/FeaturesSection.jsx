// app/components/FeaturesSection.jsx
"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Recycle, Users, Star } from "lucide-react";
import Image from "next/image";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-sky-600" />,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control at every stage of production to ensure superior products."
    },
    {
      icon: <Truck className="h-12 w-12 text-sky-600" />,
      title: "Reliable Delivery",
      description: "On-time delivery with flexible logistics solutions to clients worldwide."
    },
    {
      icon: <Recycle className="h-12 w-12 text-sky-600" />,
      title: "Sustainability",
      description: "Eco-friendly processes and commitment to reducing environmental impact."
    },
    {
      icon: <Users className="h-12 w-12 text-sky-600" />,
      title: "Expert Team",
      description: "Skilled professionals with decades of aluminum industry expertise."
    }
  ];


  return (
    <section className="py-6 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Our Advantages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose White Gold Aluminium</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our unwavering commitment to excellence and innovation sets us apart in the aluminium industry.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-white border border-sky-100 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0 15px 30px -10px rgba(14, 165, 233, 0.15)" }}
            >
              <div className="flex justify-center mb-4 bg-sky-50 p-4 rounded-full w-20 h-20 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Achievements Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-20 bg-white p-8 rounded-xl shadow-md border border-sky-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Industry Recognition</h3>
            <p className="text-gray-600 mb-4">
              White Gold Aluminium has been recognized for excellence in product quality, innovation, and sustainability
              by leading industry organizations. Our award-winning solutions have set new standards in the aluminium industry.
            </p>
            <div className="flex space-x-2 mt-4">
              <span className="bg-sky-100 text-sky-700 text-sm py-1 px-3 rounded-full font-medium">Award Winning</span>
              <span className="bg-sky-100 text-sky-700 text-sm py-1 px-3 rounded-full font-medium">Industry Leader</span>
              <span className="bg-sky-100 text-sky-700 text-sm py-1 px-3 rounded-full font-medium">Top Rated</span>
            </div>
          </div>
          <div className="md:w-1/2 relative h-48 md:h-64 w-full md:rounded-lg overflow-hidden">
            <Image
              src="/aluminium-about.png" 
              alt="Industry Award"
              fill
              style={{objectFit: "cover"}}
            />
          </div>
        </motion.div>
        
       
      </div>
    </section>
  );
};

export default FeaturesSection;