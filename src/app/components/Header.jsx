// app/components/Header.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl font-bold text-gray-800">
              <span className="text-blue-400">White Gold</span> Aluminium
            </div>
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            {["About", "Products", "Manufacturing", "Industries", "Sustainability", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;