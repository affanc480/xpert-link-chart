'use client';

import { motion } from 'framer-motion';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const testimonials = [
  {
    quote: "Xpert Link transformed our entire digital infrastructure. Their AI solutions have given us a competitive edge that's unmatched in our industry. The team's expertise and dedication to our success was evident from day one.",
    author: 'Sarah Yousaf',
    role: 'CTO, TechCorp Global',
    rating: 5,
    company: 'TechCorp Global',
  },
  {
    quote: "The team at Xpert Link delivered beyond our expectations. Our operational efficiency has improved dramatically, and the ROI has been phenomenal. They truly understand enterprise needs.",
    author: 'Ibrahim Ali',
    role: 'VP of Operations, HealthPlus Inc',
    rating: 5,
    company: 'HealthPlus Inc',
  },
  {
    quote: "Working with Xpert Link has been a game-changer. Their expertise in AI and digital transformation is world-class. They've become an essential partner in our growth.",
    author: 'Alishba Zahid',
    role: 'CEO, FinSecure Bank',
    rating: 5,
    company: 'FinSecure Bank',
  },
  {
    quote: "The innovation and quality of work from Xpert Link is outstanding. They've become an essential partner in our digital journey. I highly recommend their services.",
    author: 'Musa Khan',
    role: 'Director of Innovation, RetailTech',
    rating: 5,
    company: 'RetailTech',
  },
  {
    quote: "Xpert Link brought fresh perspectives and cutting-edge solutions to our business. Their team's professionalism and expertise made the entire process smooth and effective.",
    author: 'Lisa Thompson',
    role: 'COO, Global Solutions Inc',
    rating: 5,
    company: 'Global Solutions Inc',
  },
  {
    quote: "The impact of Xpert Link' solutions on our business has been tremendous. We've seen significant improvements in efficiency, customer satisfaction, and revenue.",
    author: 'James Wilson',
    role: 'CEO, Innovate Corp',
    rating: 5,
    company: 'Innovate Corp',
  },
];

export default function Testimonials() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            What Our Clients Say
            <span className="text-gradient block">Real Feedback, Real Results</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Real feedback from real clients who've transformed their businesses with our solutions.
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <Quote className="w-8 h-8 text-blue-400/30 mb-4" />
                  <p className="text-gray-300 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-space font-bold">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-blue-400 mt-1">{testimonial.company}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
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
            <h2 className="font-space text-3xl font-bold mb-4">Join Our Satisfied Clients</h2>
            <p className="text-gray-400 mb-8">
              Experience the same level of service and results that our clients rave about.
            </p>
            <Button size="lg">
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}