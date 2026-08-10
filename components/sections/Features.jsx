'use client';

import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Rocket, 
  ShieldCheck, 
  Users2,
  Activity,
  Layers,
  Lock,
  Cloud
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Intelligence',
    description: 'Advanced AI algorithms that learn and adapt to your business needs.',
    highlight: '98.7% Accuracy',
  },
  {
    icon: Rocket,
    title: 'Lightning Fast',
    description: 'Optimized performance with sub-millisecond response times.',
    highlight: '<50ms Response',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Security',
    description: 'Enterprise-grade security with continuous authentication.',
    highlight: '256-bit Encryption',
  },
  {
    icon: Users2,
    title: 'Team Collaboration',
    description: 'Seamless collaboration tools for distributed teams.',
    highlight: 'Real-time Sync',
  },
  {
    icon: Activity,
    title: 'Real-time Analytics',
    description: 'Live dashboards with actionable business insights.',
    highlight: 'Live Updates',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    description: 'Grow your business with infrastructure that scales.',
    highlight: 'Auto-scaling',
  },
  {
    icon: Lock,
    title: 'Data Privacy',
    description: 'GDPR and CCPA compliant data protection.',
    highlight: '100% Compliance',
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Built for the cloud with maximum flexibility.',
    highlight: 'Multi-cloud Ready',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-black w-full">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionTitle
          badge="Features"
          title="Everything You Need to Succeed"
          description="Powerful features designed to drive innovation and accelerate your digital transformation."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="h-full group">
                <div className="flex items-center gap-3 mb-3">
                  <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-space text-sm font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-400 text-xs leading-relaxed mb-3">
                  {feature.description}
                </p>
                <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-500/20 rounded-full text-xs font-medium text-blue-700 dark:text-blue-400">
                  {feature.highlight}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}