'use client';

import { motion } from 'framer-motion';

export function SectionTitle({ badge, title, description, className = '' }) {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-blue-400 mb-4"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-gray-400 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}