// app/components/Header.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close dropdown if mobile menu is being closed
    if (mobileMenuOpen) {
      setDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  // Function to handle navigation
  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    // We're using <a> tags now, so navigation happens automatically
    // No need to programmatically navigate
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Catalog", path: "/catalog" },
    { name: "About Us", path: "/about" },
    { name: "Partnership", path: "#", isDropdown: true },
    { name: "Contact Us", path: "/contact" }
  ];

  const dropdownItems = [
    { name: "Become a Dealer", path: "/become-dealer" },
    { name: "Become a Supplier", path: "/become-supplier" }
  ];

  return (
    <header className="sticky top-0 z-[100] bg-white shadow-md ">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="flex items-center">
              <div className="relative h-8 w-32 sm:h-12 sm:w-40">
                {/* Replace with your actual logo path */}
                <Image 
                  src="/logo.png" 
                  alt="White Gold Aluminium Logo" 
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </a>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={item.isDropdown ? "relative" : ""}
                ref={item.isDropdown ? dropdownRef : null}
              >
                {item.isDropdown ? (
                  <>
                    <button 
                      onClick={toggleDropdown}
                      className="flex items-center text-gray-600 hover:text-sky-600 font-medium transition-colors focus:outline-none"
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {dropdownOpen && (
                      <motion.div 
                        className="absolute mt-2 w-60 bg-white rounded-md shadow-lg py-1 z-[101]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {dropdownItems.map((dropItem) => (
                          <a
                            key={dropItem.name}
                            href={dropItem.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors w-full"
                            onClick={() => handleNavigation(dropItem.path)}
                          >
                            {dropItem.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <a 
                    href={item.path}
                    className="text-gray-600 hover:text-sky-600 font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </motion.div>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-600 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? 
                <X className="h-6 w-6" /> : 
                <Menu className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 py-4 border-t border-gray-100 relative z-[101]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                !item.isDropdown ? (
                  <Link 
                    key={item.name}
                    href={item.path}
                    className="text-gray-600 hover:text-sky-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                ) : (
                  dropdownItems.map((dropItem) => (
                    <Link
                      key={dropItem.name}
                      href={dropItem.path}
                      className="text-gray-600 hover:text-sky-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      {dropItem.name}
                    </Link>
                  ))
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;