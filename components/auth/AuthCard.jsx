'use client';

import { motion } from 'framer-motion';

export function AuthCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-[24px] border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-[#050816]/55 backdrop-blur-[20px] shadow-[0_20px_60px_rgba(15,23,42,0.12),0_0_80px_rgba(37,99,235,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_80px_rgba(37,99,235,0.18)] px-8 py-10 sm:px-10 sm:py-12 ${className}`}
    >
      {children}
    </motion.div>
  );
}
