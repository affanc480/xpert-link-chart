'use client';

import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01 } : {}}
      className={`glass rounded-2xl p-6 transition-all duration-500 card-shadow ${hover ? 'card-shadow-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}