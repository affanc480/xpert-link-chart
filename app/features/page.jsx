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
  Cloud,
  ArrowRight,
  CheckCircle 
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Intelligence',
    description: 'Advanced AI algorithms that learn and adapt to your business needs.',
    highlight: '98.7% Accuracy',
    details: 'Our AI models continuously improve through machine learning, delivering increasingly accurate results.',
  },
  {
    icon: Rocket,
    title: 'Lightning Fast',
    description: 'Optimized performance with sub-millisecond response times.',
    highlight: '<50ms Response',
    details: 'Built on modern architecture that ensures rapid response times even at scale.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Security',
    description: 'Enterprise-grade security with continuous authentication.',
    highlight: '256-bit Encryption',
    details: 'Every request is authenticated and authorized with our zero-trust security framework.',
  },
  {
    icon: Users2,
    title: 'Team Collaboration',
    description: 'Seamless collaboration tools for distributed teams.',
    highlight: 'Real-time Sync',
    details: 'Keep your entire organization aligned with real-time updates and shared workspaces.',
  },
  {
    icon: Activity,
    title: 'Real-time Analytics',
    description: 'Live dashboards with actionable business insights.',
    highlight: 'Live Updates',
    details: 'Monitor key metrics and make data-driven decisions with our real-time analytics.',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    description: 'Grow your business with infrastructure that scales.',
    highlight: 'Auto-scaling',
    details: 'Our cloud-native architecture automatically scales to handle your growing needs.',
  },
  {
    icon: Lock,
    title: 'Data Privacy',
    description: 'GDPR and CCPA compliant data protection.',
    highlight: '100% Compliance',
    details: 'We maintain strict compliance with global data protection regulations.',
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Built for the cloud with maximum flexibility.',
    highlight: 'Multi-cloud Ready',
    details: 'Deploy across any cloud provider with our cloud-agnostic architecture.',
  },
];

export default function Features() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Everything You Need
            <span className="text-gradient block">to Succeed</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Powerful features designed to drive innovation and accelerate your digital transformation.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="h-full group">
                  <div className="flex items-center gap-3 mb-3">
                    <feature.icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <h4 className="font-space text-base font-bold">{feature.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">{feature.details}</p>
                  <div className="inline-block px-3 py-1 bg-blue-500/20 rounded-full text-xs font-medium text-blue-400">
                    {feature.highlight}
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
            <h2 className="font-space text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
            <p className="text-gray-400 mb-8">
              Start leveraging our powerful features to transform your business today.
            </p>
            <Button size="lg">
              Get Started Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}