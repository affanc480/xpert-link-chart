'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Cloud, 
  Shield, 
  BarChart3, 
  Users, 
  Code2,
  ArrowRight 
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Leverage cutting-edge AI algorithms to automate processes, gain insights, and make data-driven decisions.',
    features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision'],
  },
  {
    icon: Cloud,
    title: 'Cloud Transformation',
    description: 'Modernize your infrastructure with scalable cloud solutions that enhance agility and reduce costs.',
    features: ['Cloud Migration', 'DevOps Automation', 'Serverless Architecture'],
  },
  {
    icon: Shield,
    title: 'ERP',
    description: 'Transform your business operations with intelligent ERP solutions and integrated enterprise management.',
    features: ['SAP S4 HANA', 'ERP ECC', 'SAP B1', 'Oracle', 'DMS'],
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with advanced analytics and visualization tools.',
    features: ['Business Intelligence', 'Data Warehousing', 'Real-time Dashboards'],
  },
  {
    icon: Users,
    title: 'Digital Workforce',
    description: 'Empower your team with digital tools and AI assistants that boost productivity and collaboration.',
    features: ['Workflow Automation', 'Collaboration Tools', 'AI Assistants'],
  },
  {
    icon: Code2,
    title: 'SAP',
    description: 'Transform your enterprise with customised SAP solutions that streamline operations and improve efficiency.',
    features: ['SAP Implementation', 'SAP Consulting', 'SAP Integration'],
  },
];

export function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-black w-full">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionTitle
          badge="Our Services"
          title="Enterprise-Grade Solutions"
          description="Comprehensive digital transformation services designed to propel your business into the future."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-space text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature) => (
                    <span key={feature} className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  ))}
                </div>
                {/* <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button> */}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}