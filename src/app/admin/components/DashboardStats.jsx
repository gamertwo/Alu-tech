// app/admin/components/DashboardStats.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-gray-500 text-sm font-medium mb-2">Total Requests</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="text-gray-500 text-sm font-medium mb-2">Pending</h3>
        <p className="text-3xl font-bold text-amber-500">{stats.pending || 0}</p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-gray-500 text-sm font-medium mb-2">Confirmed</h3>
        <p className="text-3xl font-bold text-green-500">{stats.confirmed || 0}</p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="text-gray-500 text-sm font-medium mb-2">Completed</h3>
        <p className="text-3xl font-bold text-blue-500">{stats.completed || 0}</p>
      </motion.div>
    </div>
  );
};

export default DashboardStats;