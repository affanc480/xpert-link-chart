'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';  // ← Added CheckCircle
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const stories = [
  {
    company: 'TechCorp Global',
    industry: 'Technology',
    challenge: 'Legacy systems causing operational inefficiencies and slow response times.',
    solution: 'Implemented AI-powered automation and cloud infrastructure.',
    result: '300% increase in operational efficiency',
    metrics: ['45% Cost Reduction', '99.9% Uptime', '2x Revenue Growth'],
    icon: TrendingUp,
    testimonial: 'Xpert Link transformed our entire digital infrastructure. Their AI solutions have given us a competitive edge that\'s unmatched in our industry.',
    author: 'Sarah Yousaf',
    role: 'CTO, TechCorp Global',
  },
  {
    company: 'HealthPlus Inc',
    industry: 'Healthcare',
    challenge: 'Manual patient data processing and analysis causing delays and errors.',
    solution: 'AI diagnostic system with real-time analytics and patient management.',
    result: '80% faster patient diagnosis',
    metrics: ['60% Time Saved', '95% Accuracy', '50% Cost Reduction'],
    icon: Users,
    testimonial: 'The team at Xpert Link delivered beyond our expectations. Our operational efficiency has improved dramatically.',
    author: 'Ibrahim Ali',
    role: 'VP of Operations, HealthPlus Inc',
  },
  {
    company: 'FinSecure Bank',
    industry: 'Finance',
    challenge: 'Fraud detection and risk management were manual and inefficient.',
    solution: 'Machine learning fraud detection system with real-time monitoring.',
    result: 'Reduced fraud by 75%',
    metrics: ['75% Fraud Reduction', '99% Detection Rate', '$10M Saved'],
    icon: Award,
    testimonial: 'Working with Xpert Link has been a game-changer. Their expertise in AI and digital transformation is world-class.',
    author: 'Alishba Zahid',
    role: 'CEO, FinSecure Bank',
  },
];

export default function SuccessStories() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Real Results,
            <span className="text-gradient block">Real Impact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            See how we've transformed businesses and delivered measurable results across industries.
          </motion.p>
        </div>
      </section>

      {/* Stories */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <motion.div
                key={story.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-space text-xl font-bold">{story.company}</h3>
                      <span className="text-sm text-blue-400">{story.industry}</span>
                    </div>
                    <story.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500">Challenge</p>
                      <p className="text-sm text-gray-300">{story.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Solution</p>
                      <p className="text-sm text-gray-300">{story.solution}</p>
                    </div>
                    <div className="pt-3 border-t border-white/5">
                      <p className="text-base font-bold text-blue-400">{story.result}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {story.metrics.map((metric) => (
                        <span key={metric} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                          {metric}
                        </span>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-white/5">
                      <p className="text-sm text-gray-300 italic">"{story.testimonial}"</p>
                      <p className="text-xs text-gray-400 mt-2">{story.author}, {story.role}</p>
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
            <h2 className="font-space text-3xl font-bold mb-4">Ready to Be Our Next Success Story?</h2>
            <p className="text-gray-400 mb-8">
              Join the enterprises that have transformed their businesses with our solutions.
            </p>
            <Button size="lg">
              Start Your Transformation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}