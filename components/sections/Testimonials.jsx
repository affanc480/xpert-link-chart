'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';

const testimonials = [
  {
    quote: "Xpert Link transformed our entire digital infrastructure. Their AI solutions have given us a competitive edge that's unmatched in our industry.",
    author: 'Sarah Yousaf',
    role: 'CTO, TechCorp Global',
    rating: 5,
  },
  {
    quote: "The team at Xpert Link delivered beyond our expectations. Our operational efficiency has improved dramatically, and the ROI has been phenomenal.",
    author: 'Ibrahim Ali',
    role: 'VP of Operations, HealthPlus Inc',
    rating: 5,
  },
  {
    quote: "Working with Xpert Link has been a game-changer. Their expertise in AI and digital transformation is world-class.",
    author: 'Alishba Zahid',
    role: 'CEO, FinSecure Bank',
    rating: 5,
  },
  {
    quote: "The innovation and quality of work from Xpert Link is outstanding. They've become an essential partner in our digital journey.",
    author: 'Musa Khan',
    role: 'Director of Innovation, RetailTech',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-black w-full">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionTitle
          badge="Testimonials"
          title="What Our Clients Say"
          description="Real feedback from real clients who've transformed their businesses with us."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <Quote className="w-8 h-8 text-blue-400/30 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-space font-bold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
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
  );
}