'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';
import ProductGrid from './ProductGrid';
import { productData } from './productData';

const ProductOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Simulate data loading with useEffect
  useEffect(() => {
    // This ensures data is properly loaded before rendering
    const loadProducts = () => {
      // Add artificial delay to ensure proper hydration
      setTimeout(() => {
        setProducts(productData);
        setIsLoading(false);
      }, 300);
    };

    loadProducts();
    
    // Add event listener for page visibility to handle refresh
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadProducts();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Page Header with title, subtitle and intro */}
      <PageHeader 
        title="Premium Aluminum Services"
        subtitle="Engineered Excellence"
        description="Discover our comprehensive range of high-quality aluminum products designed for superior performance, durability, and versatility across various industries."
      />
      
      {/* Main content area */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Introduction Text */}
          <motion.div 
            className="max-w-3xl mx-auto mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-700">
              At White Gold Aluminum, we combine cutting-edge technology with exceptional craftsmanship to deliver superior 
              aluminum products that exceed industry standards. Our solutions are tailored to meet the specific needs of 
              diverse sectors including construction, automotive, aerospace, and more.
            </p>
          </motion.div>
          
          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            /* Product Grid */
            <ProductGrid products={products} />
          )}
          
          {/* Call to Action */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="/contact" 
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              Request Custom Quote
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductOverview;