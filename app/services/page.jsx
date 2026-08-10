'use client';
import Link from "next/link";
import { motion } from 'framer-motion';
import { 
  Brain,
  Cloud,
  Shield,
  BarChart3,
  Users,
  Code2,
  ArrowRight,
  CheckCircle 
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Advanced AI solutions that automate, optimize, and innovate your business processes.',
    features: [
      'Predictive analytics and forecasting',
      'Natural language processing',
      'Computer vision systems',
      'Custom AI model development',
      'AI-powered automation',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud Transformation',
    description: 'Modernize your infrastructure with scalable, secure, and cost-effective cloud solutions.',
    features: [
      'Cloud migration strategy',
      'DevOps implementation',
      'Serverless architecture',
      'Multi-cloud management',
      'Cloud cost optimization',
    ],
  },
  {
    icon: Shield,
    title: 'ERP',
    description: 'Integrated ERP solutions that streamline operations, automate workflows, and drive business growth.',
    features: [
      'SAP S4 HANA',
      'SAP ECC',
      'SAP B1',
      'Oracle',
      'DMS',
    ],
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Turn your data into actionable insights with advanced analytics and visualization.',
    features: [
      'Business intelligence',
      'Data warehousing',
      'Real-time dashboards',
      'Predictive modeling',
      'Data visualization',
    ],
  },
  {
    icon: Users,
    title: 'Digital Workforce',
    description: 'Empower your team with AI assistants and collaboration tools that boost productivity.',
    features: [
      'Workflow automation',
      'AI-powered assistants',
      'Collaboration platforms',
      'Remote work solutions',
      'Digital adoption training',
    ],
  },
  {
    icon: Code2,
    title: 'SAP',
    description: 'Tailored SAP solutions designed specifically for your business processes and goals.',
    features: [
      'SAP Implementation',
      'SAP Consulting',
      'SAP S/4HANA',
      'SAP Integration',
      'SAP ECC',
    ],
  },
];

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Enterprise Solutions
            <span className="text-gradient block">That Drive Innovation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Comprehensive services designed to accelerate your digital transformation 
            and deliver measurable business outcomes.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="font-space text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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
            <h2 className="font-space text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8">
              Let's discuss how our services can transform your business.
            </p>
            <Link href="/contact">
            <Button size="lg">
              Contact Us Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            </Link>
          </motion.div>

        </div>
      </section>
    </motion.div>
  );
}