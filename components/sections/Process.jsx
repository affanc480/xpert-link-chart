'use client';
import Link from "next/link";
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Code2, 
  Rocket, 
  Award,
  ArrowRight 
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
  },
  {
    icon: Code2,
    title: 'Design & Development',
    description: 'Our team builds your solution using agile development methodology.',
    duration: '4-8 Weeks',
  },
  {
    icon: Rocket,
    title: 'Launch & Deployment',
    description: 'Seamless deployment with comprehensive testing and optimization.',
    duration: '1-2 Weeks',
  },
  {
    icon: Award,
    title: 'Scale & Optimize',
    description: 'Continuous improvement and scaling based on real-world feedback.',
    duration: 'Ongoing',
  },
];

export function Process() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-black dark:via-blue-950/5 dark:to-black w-full">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Our Process"
          title="From Vision to Reality"
          description="A proven methodology that delivers exceptional results, every time."
        />

        <div className="relative mt-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-4">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">Step {index + 1}</div>
                  <h3 className="font-space text-lg font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed mb-3">{step.description}</p>
                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs text-gray-700 dark:text-gray-300">
                    ⏱ {step.duration}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/contact">
            <Button size="lg">
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}