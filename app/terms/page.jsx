'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, Scale, CheckCircle } from 'lucide-react';

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Terms & Conditions
            <span className="text-gradient block">Our Agreement</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Please read these terms carefully. By using our services, you agree to these terms.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                By accessing and using Xpert Link' services, you agree to be bound by these 
                Terms and Conditions. If you do not agree to these terms, please do not use 
                our services.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Services Description</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Xpert Link provides digital transformation services including but not limited to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  AI and machine learning solutions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Cloud infrastructure services
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Cybersecurity solutions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Custom software development
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">User Obligations</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Provide accurate and complete information
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Maintain the security of your account
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Comply with all applicable laws and regulations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Not misuse or abuse our services
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed">
                All content, features, and functionality of our services are owned by Xpert Link 
                and are protected by international copyright, trademark, and other intellectual 
                property laws. You may not copy, modify, or distribute our content without 
                our express permission.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">
                Xpert Link shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of our services. 
                Our total liability shall not exceed the amount paid by you for our services 
                in the preceding 12 months.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-gray-400 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws 
                of the State of California, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to update these terms at any time. Changes will be 
                effective immediately upon posting. Your continued use of our services 
                constitutes acceptance of the updated terms.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-400 leading-relaxed">
                For questions about these terms, please contact us at:
              </p>
              <p className="text-blue-400 mt-2">legal@xpertlink.com</p>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Last updated: January 2024</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}