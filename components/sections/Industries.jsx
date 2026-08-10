'use client';

import { motion } from 'framer-motion';
import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  Banknote,
  ShoppingBag,
  Cpu, 
  Bot,
  Workflow
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';

const industries = [
  {
    icon: Building2,
    name: 'Finance',
    description: 'Secure, AI-driven solutions for modern banking and financial services.',
  },
  {
    icon: Cpu,
    name: 'Machine Integration',
    description: 'Connect machines seamlessly with intelligent integration and real-time automation.',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description: 'Next-gen learning platforms powered by adaptive AI technology.',
  },
  {
    icon: Banknote,
    name: 'FinTech',
    description: 'Revolutionary solutions for the future of digital finance.',
  },
  {
    icon: ShoppingBag,
    name: 'Retail',
    description: 'Intelligent retail solutions that enhance customer experience.',
  },
  {
    icon: Bot,
    name: 'Manufacturing',
    description: 'Transforming manufacturing with intelligent software solutions.',
  },
];

export function Industries() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-black w-full">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionTitle
          badge="Industries"
          title="Solutions for Every Industry"
          description="Industry-specific expertise delivered through our cutting-edge technology platform."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-space text-lg font-bold mb-2 text-gray-900 dark:text-white">{industry.name}</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                  {industry.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}