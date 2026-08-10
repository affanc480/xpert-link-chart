'use client';

import { motion } from 'framer-motion';

export function PageHeader({ title, description, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8"
    >
      <div>
        <h2 className="font-space text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
    </motion.div>
  );
}
