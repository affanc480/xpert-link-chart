'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const faqs = [
  {
    question: 'What is Xpert Link?',
    answer: 'Xpert Link is a cutting-edge digital transformation company specializing in AI-powered solutions, cloud infrastructure, and enterprise innovation. We help businesses modernize their operations and leverage technology for growth.',
  },
  {
    question: 'How can Xpert Link help my business?',
    answer: 'We provide end-to-end digital transformation services including AI implementation, cloud migration, data analytics, cybersecurity, and custom software development. Our solutions are tailored to your specific business needs and goals.',
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve a wide range of industries including Finance, Machine Integration, Education, Retail, Technology, and FinTech. Our solutions are adaptable to any sector seeking digital transformation.',
  },
  {
    question: 'What is your implementation process?',
    answer: 'Our process follows four phases: Discovery & Strategy, Design & Development, Launch & Deployment, and Scale & Optimize. We use agile methodology to ensure rapid delivery and continuous improvement.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Implementation timelines vary based on project scope. Typically, our projects take 8-12 weeks from discovery to deployment, with ongoing optimization and support.',
  },
  {
    question: 'What security measures do you implement?',
    answer: 'We implement enterprise-grade security including zero-trust architecture, 256-bit encryption, continuous monitoring, and compliance with GDPR, CCPA, and industry standards.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-black dark:via-blue-950/5 dark:to-black w-full">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services and solutions."
        />

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-left text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-700 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}