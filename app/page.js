'use client';

import { Hero } from '@/components/hero/Hero.jsx'; // Added .jsx
import { Services } from '@/components/sections/Services.jsx';
import { Solutions } from '@/components/sections/Solutions.jsx';
import { Industries } from '@/components/sections/Industries.jsx';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs.jsx';
import { Features } from '@/components/sections/Features.jsx';
import { Process } from '@/components/sections/Process.jsx';
import { Portfolio } from '@/components/sections/Portfolio.jsx';
import { SuccessStories } from '@/components/sections/SuccessStories.jsx';
import { Testimonials } from '@/components/sections/Testimonials.jsx';
import { FAQ } from '@/components/sections/FAQ.jsx';
import { Contact } from '@/components/sections/Contact.jsx';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Hero />
      <Services />
      <Solutions />
      <Industries />
      <WhyChooseUs />
      <Features />
      <Process />
      <Portfolio />
      <SuccessStories />
      <Testimonials />
      <FAQ />
      <Contact />
    </motion.div>
  );
}
