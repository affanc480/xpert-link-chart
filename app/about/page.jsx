'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Users,
  Award,
  Target,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We push boundaries and embrace cutting-edge technology to solve complex challenges.',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our success. We build lasting partnerships through exceptional service.',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'We focus on delivering measurable outcomes that drive real business growth.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from code to client relationships.',
  },
];

const team = [
  {
    name: 'Hamza Waheed',
    role: 'CEO & Founder',
    description: 'Former tech executive with 15+ years in AI and enterprise software.',
  },
  {
    name: 'Abdul Rafay',
    role: 'CTO',
    description: 'AI researcher and systems architect with multiple patents in ML.',
  },
  {
    name: 'Minahil Ali',
    role: 'Head of Product',
    description: 'Product visionary with a track record of launching successful SaaS platforms.',
  },
  {
    name: 'Alina Amir',
    role: 'Lead Designer',
    description: 'Award-winning designer specializing in enterprise UX and AI interfaces.',
  },
];

export default function About() {
  const router = useRouter();


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
            Shaping the Future of
            <span className="text-gradient block">Digital Innovation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            We're on a mission to democratize AI and digital transformation,
            making enterprise-grade technology accessible to businesses of all sizes.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Years Experience', value: '10+' },
            { label: 'Enterprise Clients', value: '500+' },
            { label: 'Projects Delivered', value: '1000+' },
            { label: 'Global Team', value: '50+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="font-space text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            badge="Our Values"
            title="Built on Principles"
            description="The core values that guide everything we do."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="font-space text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-blue-950/5 to-black">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            badge="Our Team"
            title="Meet the Experts"
            description="The brilliant minds behind Xpert Link."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/30 flex items-center justify-center mb-4">
                    <span className="font-space text-2xl font-bold text-blue-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-space font-bold">{member.name}</h4>
                  <p className="text-sm text-blue-400 mb-2">{member.role}</p>
                  <p className="text-sm text-gray-400">{member.description}</p>
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
            <h2 className="font-space text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8">
              Join hundreds of enterprises that have already started their digital transformation journey with us.
            </p>

            <Button
              size="lg"
              onClick={() => router.push('/contact')}>Get Started Today<ArrowRight className="ml-2 w-4 h-4" /></Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}


