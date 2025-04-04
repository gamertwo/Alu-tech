'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';
import MeetingModal from './MeetingModal';

const HorizontalProductCard = ({ product, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div 
        className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        variants={itemVariants}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Image */}
          <div className="relative w-full md:w-2/5 h-60 md:h-full">
            {/* Badge for New or Popular products */}
            {product.badge && (
              <div className={`absolute top-4 left-4 z-10 ${
                product.badge === 'new' 
                  ? 'bg-green-500' 
                  : product.badge === 'popular' 
                    ? 'bg-amber-500' 
                    : 'bg-blue-500'
              } text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                {product.badge === 'new' ? 'NEW' : product.badge === 'popular' ? 'POPULAR' : 'SALE'}
              </div>
            )}
            
            <Image 
              src={product.image} 
              alt={product.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{objectFit: "cover"}}
              className={`transition-all duration-700 ${isHovered ? 'scale-110 filter brightness-90' : 'scale-100'}`}
              loading={index < 4 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
            />
          </div>
          
          {/* Right side - Content */}
          <div className="p-6 md:w-3/5 flex flex-col">
          
            
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {product.title}
            </h3>
            
            <p className="text-gray-600 mb-5 flex-grow">
              {product.description}
            </p>
            
            <div className="flex flex-col xs:flex-row xs:items-center gap-3 mt-auto">
              <motion.button
                onClick={openModal}
                className="flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`Schedule meeting for ${product.title}`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Get a Quote
              </motion.button>
              
          
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Meeting Request Modal */}
      <MeetingModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={product}
      />
    </>
  );
};

export default HorizontalProductCard;