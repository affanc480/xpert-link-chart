'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Zap,
  Shield,
  Clock,
  Globe,
  TrendingUp,
  Heart,
  Database
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';

const reasons = [
  {
    icon: Award,
    title: 'Industry Expertise',
    description: '10+ years of experience delivering transformative solutions across industries.',
  },
  {
    icon: Users,
    title: 'Global Team',
    description: 'Expert team of engineers, designers, and strategists worldwide.',
  },
  {
    icon: Zap,
    title: 'Rapid Innovation',
    description: 'Agile development cycles delivering results 3x faster than industry average.',
  },
  {
    icon: Database,
    title: 'ERP Solutions',
    description: 'Integrated ERP solutions that streamline operations, automate workflows, and drive business growth.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support with dedicated account managers.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Seamless solutions deployed across 50+ countries worldwide.',
  },
  {
    icon: TrendingUp,
    title: 'Proven ROI',
    description: 'Average 300% ROI for our enterprise clients within 12 months.',
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Partnership approach focused on your long-term success.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-black dark:via-blue-950/5 dark:to-black w-full">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Why Choose Us"
          title="Built Different. Built Better."
          description="We combine cutting-edge technology with deep industry expertise to deliver exceptional results."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="text-center h-full group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <reason.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-space text-sm font-bold mb-2 text-gray-900 dark:text-white">{reason.title}</h4>
                <p className="text-gray-700 dark:text-gray-400 text-xs leading-relaxed">{reason.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}