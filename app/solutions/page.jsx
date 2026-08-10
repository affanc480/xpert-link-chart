'use client';
import Link from "next/link";
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  Globe,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Database
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const solutions = [
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Streamline operations with intelligent automation that reduces manual work and increases efficiency.',
    benefits: ['90% faster processing', '70% cost reduction', '24/7 operation'],
    detailed: 'Our AI automation solutions leverage machine learning to handle repetitive tasks, freeing your team to focus on strategic initiatives.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Analytics Suite',
    description: 'Gain deep insights into your business with AI-driven analytics and predictive modeling.',
    benefits: ['Real-time insights', 'Predictive forecasting', 'Custom dashboards'],
    detailed: 'Transform raw data into actionable intelligence with our advanced analytics platform powered by machine learning.',
  },
  {
    icon: Database,
    title: 'ERP Solutions',
    description: 'Streamline your business with integrated ERP solutions that automate operations and improve efficiency.',
    benefits: ['Business process automation', 'Real-time analytics', 'Scalable enterprise management'],
    detailed: 'Our ERP solutions unify finance, inventory, HR, procurement, and operations into a single intelligent platform, enabling real-time insights, streamlined workflows, and sustainable business growth.',
  },
  {
    icon: Globe,
    title: 'Global Connectivity',
    description: 'Connect your global workforce with seamless digital infrastructure and collaboration tools.',
    benefits: ['Global reach', 'Seamless integration', 'Unified platform'],
    detailed: 'Enable your distributed teams with secure, high-performance connectivity and collaboration tools.',
  },
];

export default function Solutions() {
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
            Enterprise Solutions
            <span className="text-gradient block">Built for Scale</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Comprehensive solutions designed to address your most complex business challenges
            and drive sustainable growth.
          </motion.p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center flex-shrink-0">
                      <solution.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-space text-xl font-bold mb-2">{solution.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        {solution.description}
                      </p>
                      <p className="text-sm text-gray-300 mb-4">
                        {solution.detailed}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {solution.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      {/* <Button variant="ghost" className="text-blue-400">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button> */}
                    </div>
                  </div>
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
            <h2 className="font-space text-3xl font-bold mb-4">Find the Right Solution for You</h2>
            <p className="text-gray-400 mb-8">
              Let's discuss which of our solutions best fits your business needs.
            </p>
            <Link href="/contact">
              <Button size="lg">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}