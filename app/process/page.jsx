'use client';

import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Code2, 
  Rocket, 
  Award,
  ArrowRight,
  CheckCircle 
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const steps = [
  {
    icon: Lightbulb,
    title: 'Discovery & Strategy',
    description: 'We collaborate to understand your vision, challenges, and goals.',
    duration: '2-3 Weeks',
    details: [
      'Deep dive into your business requirements',
      'Competitive analysis and market research',
      'Technology stack recommendation',
      'Project roadmap creation',
      'Success metrics definition',
    ],
  },
  {
    icon: Code2,
    title: 'Design & Development',
    description: 'Our team builds your solution using agile development methodology.',
    duration: '4-8 Weeks',
    details: [
      'UX/UI design and prototyping',
      'Agile sprint development',
      'Continuous integration and testing',
      'Regular client demos and feedback',
      'Quality assurance and optimization',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch & Deployment',
    description: 'Seamless deployment with comprehensive testing and optimization.',
    duration: '1-2 Weeks',
    details: [
      'Production environment setup',
      'Security and performance testing',
      'Data migration and integration',
      'Staff training and documentation',
      'Launch and go-live support',
    ],
  },
  {
    icon: Award,
    title: 'Scale & Optimize',
    description: 'Continuous improvement and scaling based on real-world feedback.',
    duration: 'Ongoing',
    details: [
      'Performance monitoring and optimization',
      'User feedback collection and analysis',
      'Feature enhancements and updates',
      'Scalability planning and implementation',
      'Ongoing support and maintenance',
    ],
  },
];

export default function Process() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            From Vision to Reality
            <span className="text-gradient block">A Proven Process</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            A proven methodology that delivers exceptional results, every time.
          </motion.p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-3">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-blue-400 font-medium">Step {index + 1}</div>
                    <h3 className="font-space text-xl font-bold mt-1">{step.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3 text-center">
                    {step.description}
                  </p>
                  <div className="inline-block w-full text-center px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 mb-4">
                    ⏱ {step.duration}
                  </div>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
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
            <h2 className="font-space text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-400 mb-8">
              Let's begin your digital transformation journey with our proven process.
            </p>
            <Button size="lg">
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}