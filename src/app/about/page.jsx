// app/about/page.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Award, Clock, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer"
export default function AboutUs() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Header />
      <main className="bg-sky-50">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-gradient-to-r from-sky-700 to-sky-500 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/aluminium-factory.png" 
              alt="White Gold Aluminum Factory" 
              fill 
              style={{objectFit: "cover"}}
              priority
            />
          </div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About White Gold Aluminum</h1>
              <p className="text-xl text-sky-100">
                A legacy of excellence in aluminum manufacturing since 2008
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="space-y-6"
              >
                <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">A Rich Heritage of Manufacturing Excellence</h2>
                <div className="w-24 h-1 bg-sky-500"></div>
                <p className="text-gray-600 leading-relaxed">
                  White Gold Aluminum was founded in 2008 by Mr. Rizwan Habib, continuing a family legacy in manufacturing that spans over 90 years. Our journey began in 1935 when Haji Muhammad Abdullah, the grandfather of our current CEO, started manufacturing wood products.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The tradition continued with Habib Ullah, the third child of Haji Abdullah, who expanded into lathe machines, rubber, aluminum, and steel products by founding Jojo Traders in 1973. Today, under the leadership of Rizwan Habib, White Gold Aluminum has been producing premium aluminum products for 23 years.
                </p>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
              >
                <Image 
                  src="/company-history.png" 
                  alt="Company History" 
                  fill 
                  style={{objectFit: "cover"}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">90 Years of Manufacturing Heritage</h3>
                  <p className="text-sky-100">From wood to aluminum: a story of innovation and growth</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                Our Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Led by Experience</h2>
              <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-sky-50 rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
                  <Image 
                    src="/ceo-placeholder.png" 
                    alt="CEO Portrait" 
                    width={128}
                    height={128}
                    style={{objectFit: "cover"}}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">Mr. Rizwan Habib</h3>
                  <p className="text-sky-600 font-medium mb-4">Chief Executive Officer</p>
                  <p className="text-gray-600">
                    Leading White Gold Aluminum with vision and expertise since founding the company in 2008.
                    Continuing a family legacy of manufacturing excellence into the third generation.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-sky-50 rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
                  <Image 
                    src="/coo-placeholder.png" 
                    alt="COO Portrait" 
                    width={128}
                    height={128}
                    style={{objectFit: "cover"}}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">Osama Saeed Sandhu</h3>
                  <p className="text-sky-600 font-medium mb-4">Chief Operating Officer</p>
                  <p className="text-gray-600">
                    Overseeing operations with dedication and precision to ensure White Gold Aluminum 
                    maintains its reputation for quality and reliability.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values & Certifications */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Core Values */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                  Our Values
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">What Drives Us</h2>
                <div className="w-20 h-1 bg-sky-500 mb-8"></div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                        <CheckCircle2 size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Honesty</h3>
                      <p className="text-gray-600">
                        We believe in transparent business practices and building trust with our clients through honesty in every interaction.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                        <Clock size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Commitment</h3>
                      <p className="text-gray-600">
                        We are committed to delivering excellence in every product and service we provide, honoring deadlines and promises.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                        <Users size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Great Value with Low Cost</h3>
                      <p className="text-gray-600">
                        We strive to provide premium aluminum products at competitive prices, maximizing value for our customers.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Certifications & Manufacturing Process */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                  Our Credentials
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Certifications & Process</h2>
                <div className="w-20 h-1 bg-sky-500 mb-8"></div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-sky-100 mb-8">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-sky-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Industry Certifications</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sky-50 p-4 rounded-lg text-center">
                      <p className="font-semibold text-sky-700">ISO</p>
                    </div>
                    <div className="bg-sky-50 p-4 rounded-lg text-center">
                      <p className="font-semibold text-sky-700">CNW</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-sky-100">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-sky-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Manufacturing Excellence</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We receive aluminum raw material in the form of electrical wires. The material is melted in a furnace where magnesium and silicon are added to harden it. Billets are then created and processed through a hydraulic press at high temperature. Finally, the aluminum is buffered and colored according to client specifications.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Location & Hours */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                Visit Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Location & Hours</h2>
              <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-sky-50 p-6 rounded-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manufacturing Facility</h3>
                <p className="text-gray-600 mb-6">
                  <strong>Address:</strong> Racecourse road near Halloki railway station
                </p>
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                  {/* You can replace this with an actual map */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">Map Placeholder</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-sky-50 p-6 rounded-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Working Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-sky-100 pb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Office Hours</h4>
                      <p className="text-gray-600">For inquiries and meetings</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                      <p className="text-sky-700 font-medium">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">Factory Hours</h4>
                      <p className="text-gray-600">Production operations</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                      <p className="text-sky-700 font-medium">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-sky-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Contact Us</h4>
                  <p className="text-gray-600 mb-2">
                    For inquiries, please contact our sales team:
                  </p>
                  <p className="text-sky-700 font-medium">
                    WhatsApp: 0324 4054632
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <Footer/>
      </main>
    </>
  );
}