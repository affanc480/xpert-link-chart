'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Search } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const faqs = [
  {
    category: 'General',
    question: 'What is Xpert Link?',
    answer: 'Xpert Link is a cutting-edge digital transformation company specializing in AI-powered solutions, cloud infrastructure, and enterprise innovation. We help businesses modernize their operations and leverage technology for growth.',
  },
  {
    category: 'General',
    question: 'How can Xpert Link help my business?',
    answer: 'We provide end-to-end digital transformation services including AI implementation, cloud migration, data analytics, cybersecurity, and custom software development. Our solutions are tailored to your specific business needs and goals.',
  },
  {
    category: 'Services',
    question: 'What services do you offer?',
    answer: 'We offer AI & Machine Learning, Cloud Transformation, Cybersecurity, Data Analytics, Digital Workforce solutions, and Custom Development. Each service is designed to address specific business challenges and drive growth.',
  },
  {
    category: 'Industries',
    question: 'What industries do you serve?',
    answer: 'We serve a wide range of industries including Finance, Machine Integration, Education, Retail, Technology, and FinTech. Our solutions are adaptable to any sector seeking digital transformation.',
  },
  {
    category: 'Process',
    question: 'What is your implementation process?',
    answer: 'Our process follows four phases: Discovery & Strategy, Design & Development, Launch & Deployment, and Scale & Optimize. We use agile methodology to ensure rapid delivery and continuous improvement.',
  },
  {
    category: 'Process',
    question: 'How long does implementation take?',
    answer: 'Implementation timelines vary based on project scope. Typically, our projects take 8-12 weeks from discovery to deployment, with ongoing optimization and support.',
  },
  {
    category: 'Security',
    question: 'What security measures do you implement?',
    answer: 'We implement enterprise-grade security including zero-trust architecture, 256-bit encryption, continuous monitoring, and compliance with GDPR, CCPA, and industry standards.',
  },
  {
    category: 'Security',
    question: 'Is my data secure with Xpert Link?',
    answer: 'Absolutely. We maintain the highest security standards with regular audits, compliance checks, and strict data protection protocols. Your data is encrypted and protected at all times.',
  },
  {
    category: 'Support',
    question: 'What kind of support do you provide?',
    answer: 'We provide 24/7 support with dedicated account managers, technical support teams, and ongoing maintenance. Our support includes regular check-ins, performance monitoring, and rapid issue resolution.',
  },
  {
    category: 'Support',
    question: 'Do you offer training for our team?',
    answer: 'Yes, we provide comprehensive training and onboarding for your team. This includes documentation, hands-on workshops, and ongoing support to ensure successful adoption of our solutions.',
  },
];

const categories = ['All', 'General', 'Services', 'Industries', 'Process', 'Security', 'Support'];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            Frequently Asked
            <span className="text-gradient block">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Find answers to common questions about our services, solutions, and processes.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-3 text-left">
                      <span className="text-xs text-blue-400 font-medium mt-0.5">
                        {faq.category}
                      </span>
                      <span className="font-medium">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
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
                        <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 glass rounded-2xl p-8 text-center"
          >
            <h3 className="font-space text-xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Can't find the answer you're looking for? We're here to help.
            </p>
            <Button>
              Contact Support
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}