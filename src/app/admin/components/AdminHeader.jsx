// app/admin/components/AdminHeader.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Bell, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      // Remove the admin token cookie
      Cookies.remove('admin_token');
      // Redirect to login page
      router.push('/admin/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close other dropdowns
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    // Close other dropdowns
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    // Close other dropdowns
    setIsNotificationsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link href="/" className="text-gray-800 font-bold text-xl flex items-center">
              <span className="text-blue-600 mr-2">WG</span>
              <span className="hidden md:inline">Admin Dashboard</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="text-gray-500 hover:text-gray-700 p-2 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-20"
                >
                  <div className="py-2 px-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="py-2 px-4 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-800 font-medium">New meeting request</p>
                      <p className="text-xs text-gray-500">From Ahmed Raza - 10 minutes ago</p>
                    </div>
                    <div className="py-2 px-4 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-800 font-medium">New contact message</p>
                      <p className="text-xs text-gray-500">From Salman Ali - 2 hours ago</p>
                    </div>
                    <div className="py-2 px-4 hover:bg-gray-50">
                      <p className="text-sm text-gray-800 font-medium">Meeting confirmed</p>
                      <p className="text-xs text-gray-500">With Usman Khan - Yesterday</p>
                    </div>
                  </div>
                  <div className="py-2 px-4 border-t border-gray-100 text-center">
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
                      View all notifications
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* User profile */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Admin</span>
              </button>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
                >
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <span className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="py-2 px-4">
            <div className="py-2">
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Notifications (3)
              </a>
            </div>
            <div className="py-2">
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Your Profile
              </a>
            </div>
            <div className="py-2">
              <a href="#" className="block text-gray-700 hover:text-blue-600">
                Settings
              </a>
            </div>
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 hover:text-red-800"
              >
                <span className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default AdminHeader;