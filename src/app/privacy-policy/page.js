// app/privacy-policy/page.jsx
"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Header />
      <main className="bg-sky-50">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-sky-700 to-sky-500 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-sky-100">
                How White Gold Aluminum protects your privacy
              </p>
            </motion.div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                  <div className="w-16 h-1 bg-sky-500 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    At White Gold Aluminum, we respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                  <div className="w-16 h-1 bg-sky-500 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We may collect several types of information from and about users of our website, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Personal information such as name, email address, telephone number, and any other information you provide when contacting us</li>
                    <li>Information about your internet connection, the equipment you use to access our website, and usage details</li>
                    <li>Non-personal information such as browser type, operating system, and other technical information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                  <div className="w-16 h-1 bg-sky-500 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We use information that we collect about you or that you provide to us:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>To present our website and its contents to you</li>
                    <li>To provide you with information, products, or services that you request from us</li>
                    <li>To fulfill any other purpose for which you provide it</li>
                    <li>To carry out our obligations and enforce our rights</li>
                    <li>To notify you about changes to our website or any products or services we offer</li>
                    <li>To improve our website and customer service</li>
                    <li>In any other way we may describe when you provide the information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Disclosure of Your Information</h2>
                  <div className="w-16 h-1 bg-sky-500 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We may disclose aggregated information about our users without restriction. We may disclose personal information that we collect or you provide:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>To our subsidiaries and affiliates</li>
                    <li>To contractors, service providers, and other third parties we use to support our business</li>
                    <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets</li>
                    <li>To comply with any court order, law, or legal process</li>
                    <li>To enforce or apply our terms of use and other agreements</li>
                    <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of White Gold Aluminum, our customers, or others</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
                  <div className="w-16 h-1 bg-sky-500 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website. Any transmission of personal information is at your own risk.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Our Privacy Policy</h2>
                  <div className="w-16 h-1 bg-sky-500 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    We may update our privacy policy from time to time. If we make material changes to how we treat our users personal information, we will post the new privacy policy on this page with a notice that the privacy policy has been updated. The date the privacy policy was last revised will be identified at the top of the page. You are responsible for periodically visiting our website and this privacy policy to check for any changes.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                  <div className="w-16 h-1 bg-sky-500 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    To ask questions or comment about this privacy policy and our privacy practices, contact us at:
                  </p>
                  <div className="bg-sky-50 p-4 rounded-lg mt-4">
                    <p className="text-gray-700">
                      <strong>White Gold Aluminum</strong><br />
                      Racecourse road near Halloki railway station<br />
                      WhatsApp: +92 324 4054632
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-500 text-sm">
                    Last updated: April 2025
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}