// app/admin/components/ProductStats.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProductStats = ({ productStats, totalRequests }) => {
  // Sort products by count and take top 5
  const topProducts = Object.values(productStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Requested Products</h3>
      
      {topProducts.length > 0 ? (
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center">
              <div className="w-full bg-gray-100 rounded-full h-4 mr-2">
                <div 
                  className="bg-blue-600 h-4 rounded-full" 
                  style={{ width: `${(product.count / totalRequests) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 min-w-[30px] text-right">{product.count}</span>
              <span className="ml-2 text-sm text-gray-800 truncate">{product.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No product data available</p>
      )}
    </motion.div>
  );
};

export default ProductStats;