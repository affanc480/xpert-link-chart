'use client';
import Link from "next/link";
import { motion } from 'framer-motion';
import { ExternalLink, Github, CheckCircle, ArrowRight } from 'lucide-react';  // ← Added CheckCircle
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const projects = [
  {
    title: 'AI Enterprise Suite',
    category: 'Artificial Intelligence',
    description: 'Comprehensive AI platform for enterprise operations and decision-making.',
    technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
    results: ['45% Efficiency Increase', '99.9% Uptime', '2x Faster Decisions'],
    image: '🚀',
  },
  {
    title: 'Smart Finance Platform',
    category: 'FinTech',
    description: 'Real-time financial analytics and trading platform with predictive AI.',
    technologies: ['Node.js', 'React', 'MongoDB', 'Docker'],
    results: ['60% Faster Trading', '$5M Daily Volume', 'Real-time Analytics'],
    image: '💰',
  },
  {
    title: 'Machine Integration System',
    category: 'Industrial Automation',
    description: 'Intelligent machine integration solutions for seamless automation, monitoring, and operational efficiency.',
    technologies: ['PLC', 'SCADA', 'OPC UA', 'Industrial IoT'],
    results: ['40% Higher Efficiency', '99.9% System Uptime', '30% Reduced Downtime'],
    image: '🏭',
  },
  {
    title: 'E-Commerce Intelligence',
    category: 'Retail',
    description: 'Personalized shopping experience powered by machine learning.',
    technologies: ['Next.js', 'GraphQL', 'Redis', 'Kubernetes'],
    results: ['3x Conversion Rate', '45% Revenue Growth', 'Personalized Experience'],
    image: '🛍️',
  },
];

export default function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-black w-full">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-black dark:text-white"
          >
            Our Recent Work
            <span className="text-gradient block">Innovation in Action</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Showcasing innovative solutions we've delivered for clients across industries.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full group">
                  <div className="text-5xl mb-4">{project.image}</div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-space text-lg font-bold text-black dark:text-white">{project.title}</h3>
                    <span className="text-xs text-blue-400 font-medium">{project.category}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs text-gray-600 dark:text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1 mb-4">
                    {project.results.map((result) => (
                      <div key={result} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {result}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="text-blue-500 dark:text-blue-400">
                      View Project
                      <ExternalLink className="ml-1 w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="font-space text-3xl font-bold mb-4 text-black dark:text-white">Ready to Build Something Amazing?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Let's create innovative solutions that drive real business results.
            </p>
            <Link href="/contact">
              <Button size="lg">
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}