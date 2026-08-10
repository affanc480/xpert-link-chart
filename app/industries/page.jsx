'use client';
import Link from "next/link";
import { motion } from 'framer-motion';
import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  Banknote,
  ShoppingBag,
  Cpu,
  ArrowRight,
  CheckCircle, 
  Bot
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const industries = [
  {
    icon: Building2,
    name: 'Finance',
    description: 'Secure, AI-driven solutions for modern banking and financial services.',
    solutions: ['Fraud Detection', 'Risk Management', 'Automated Trading', 'Customer Analytics'],
  },
  {
    icon: Cpu,
    name: 'Machine integration',
    description: 'Transform industrial operations with intelligent machine integration and smart automation systems.',
    solutions: ['PLC Integration', 'SCADA Systems', 'Industrial Automation', 'Machine Monitoring'],
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description: 'Next-gen learning platforms powered by adaptive AI technology.',
    solutions: ['Adaptive Learning', 'Student Analytics', 'Virtual Classrooms', 'Content Creation'],
  },
  {
    icon: Banknote,
    name: 'FinTech',
    description: 'Revolutionary solutions for the future of digital finance.',
    solutions: ['Payment Processing', 'Blockchain Solutions', 'Financial Analytics', 'Digital Banking'],
  },
  {
    icon: ShoppingBag,
    name: 'Retail',
    description: 'Intelligent retail solutions that enhance customer experience.',
    solutions: ['Personalization', 'Inventory Management', 'Customer Analytics', 'Omnichannel Solutions'],
  },
  {
    icon: Bot,
    name: 'Manufacturing',
    description: 'Smart manufacturing software built to optimise production and operational efficiency.',
    solutions: ['Production Planning', 'Inventory Management', 'Warehouse Management', 'Production Analytics'],
  },
];

export default function Industries() {
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
            Industry Solutions
            <span className="text-gradient block">Tailored for Success</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Industry-specific expertise delivered through our cutting-edge technology platform.
          </motion.p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4">
                    <industry.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="font-space text-xl font-bold mb-2">{industry.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {industry.solutions.map((solution) => (
                      <div key={solution} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{solution}</span>
                      </div>
                    ))}
                  </div>
                  {/* <Button variant="ghost" className="text-blue-400">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button> */}
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
            <h2 className="font-space text-3xl font-bold mb-4">Ready to Transform Your Industry?</h2>
            <p className="text-gray-400 mb-8">
              Let's discuss how our industry solutions can drive your business forward.
            </p>
            <Link href="/login">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}