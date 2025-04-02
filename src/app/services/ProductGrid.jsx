'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HorizontalProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're running in client environment before animations
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (!isClient) {
    // SSR fallback (non-animated version)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {products.map((product, index) => (
          <div key={product.id} className="opacity-0">
            <HorizontalProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {products.map((product, index) => (
        <HorizontalProductCard key={product.id} product={product} index={index} />
      ))}
    </motion.div>
  );
};

export default ProductGrid;