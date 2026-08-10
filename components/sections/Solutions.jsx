'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Shield, Globe, TrendingUp, Database } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const solutions = [
  {
    title: 'AI-Powered Automation',
    description: 'Streamline operations with intelligent automation that reduces manual work and increases efficiency.',
    icon: Zap,
    benefits: ['90% faster processing', '70% cost reduction', '24/7 operation'],
  },
  {
    title: 'Smart Analytics Suite',
    description: 'Gain deep insights into your business with AI-driven analytics and predictive modeling.',
    icon: TrendingUp,
    benefits: ['Real-time insights', 'Predictive forecasting', 'Custom dashboards'],
  },
  {
    title: 'ERP Solutions',
    description: 'Empower your enterprise with intelligent ERP solutions for seamless operations and business growth.',
    icon: Database,
    benefits: ['Integrated workflows', 'Real-time insights','Scalable enterprise solutions'],
  },
  {
    title: 'Global Connectivity',
    description: 'Connect your global workforce with seamless digital infrastructure and collaboration tools.',
    icon: Globe,
    benefits: ['Global reach', 'Seamless integration', 'Unified platform'],
  },
];

export function Solutions() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-black dark:via-blue-950/10 dark:to-black w-full">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Solutions"
          title="Transform Your Business"
          description="End-to-end solutions designed to address your most complex business challenges."
        />

        <div className="grid lg:grid-cols-2 gap-6 mt-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="group">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center flex-shrink-0">
                    <solution.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-space text-xl font-bold mb-2 text-gray-900 dark:text-white">{solution.title}</h3>
                    <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {solution.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      Explore Solution
                      <Sparkles className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}