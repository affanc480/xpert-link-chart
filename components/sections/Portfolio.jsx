'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, CheckCircle } from 'lucide-react';
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
    description: 'Advanced machine integration solutions for seamless connectivity, automation, and real-time monitoring.',
    technologies: ['PLC', 'SCADA', 'OPC UA', 'Industrial IoT'],
    results: ['40% Higher Efficiency', '99.9% System Uptime', '35% Reduced Downtime'],
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

export function Portfolio() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black w-full">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Portfolio"
          title="Our Recent Work"
          description="Showcasing innovative solutions we've delivered for clients across industries."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="group h-full">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{project.image}</div>
                  <div className="flex-1">
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