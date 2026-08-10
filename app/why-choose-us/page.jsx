'use client';
import Link from "next/link";
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
  ArrowRight,
  CheckCircle,
  Database
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const reasons = [
  {
    icon: Award,
    title: 'Industry Expertise',
    description: '10+ years of experience delivering transformative solutions across industries.',
    details: 'Our team has deep domain expertise in finance, Machine Integration, retail, and technology sectors.',
  },
  {
    icon: Users,
    title: 'Global Team',
    description: 'Expert team of engineers, designers, and strategists worldwide.',
    details: 'We bring together diverse perspectives from our global network of professionals.',
  },
  {
    icon: Zap,
    title: 'Rapid Innovation',
    description: 'Agile development cycles delivering results 3x faster than industry average.',
    details: 'Our streamlined processes ensure you see results quickly without compromising quality.',
  },
  {
    icon: Database,
    title: 'ERP Solutions',
    description: 'Integrated ERP solutions that streamline business operations and improve productivity.',
    details: 'We deliver end-to-end ERP solutions that unify finance, inventory, procurement, HR, and operations into a single platform, providing real-time insights, automation, and scalable business management.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support with dedicated account managers.',
    details: 'Our support team is always available to ensure your systems run smoothly.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Seamless solutions deployed across 50+ countries worldwide.',
    details: 'Our infrastructure ensures reliable performance no matter where your business operates.',
  },
  {
    icon: TrendingUp,
    title: 'Proven ROI',
    description: 'Average 300% ROI for our enterprise clients within 12 months.',
    details: 'Our solutions are designed to deliver measurable business value from day one.',
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Partnership approach focused on your long-term success.',
    details: 'We view our clients as partners and are committed to their ongoing success.',
  },
];

export default function WhyChooseUs() {
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
            Built Different.
            <span className="text-gradient block">Built Better.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            We combine cutting-edge technology with deep industry expertise to deliver exceptional results
            that drive real business growth.
          </motion.p>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="h-full group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <reason.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-space text-lg font-bold mb-2">{reason.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{reason.description}</p>
                  <p className="text-xs text-gray-500">{reason.details}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="font-space text-3xl font-bold mb-4">Experience the Xpert Link Difference</h2>
            <p className="text-gray-400 mb-8">
              Join the enterprises that have already chosen us as their digital transformation partner.
            </p>
            <Link href="/signup">
              <Button size="lg">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}