'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Privacy Policy
            <span className="text-gradient block">Your Data Matters</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            We take your privacy seriously. Learn how we collect, use, and protect your data.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Name and contact information
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Company details and job title
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Communications and feedback
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Usage data and analytics
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Provide and improve our services
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Communicate with you about updates and offers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Personalize your experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Ensure security and prevent fraud
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-gray-400 leading-relaxed">
                We implement robust security measures to protect your data, including encryption, 
                access controls, and regular security audits. Your information is stored securely 
                and accessed only by authorized personnel.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Access your personal data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Correct inaccurate information
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Request deletion of your data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Opt-out of marketing communications
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="font-space text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have any questions about our privacy policy or how we handle your data, 
                please contact us at:
              </p>
              <p className="text-blue-400 mt-2">privacy@xpertlink.com</p>
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