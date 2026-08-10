'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function SuccessAnimation({ title = 'Success', subtitle }) {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 14 }}
        className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-[0_8px_30px_rgba(34,197,94,0.4)]"
      >
        <motion.div
          initial={{ scale: 1.4, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full bg-green-400"
        />
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Check className="relative w-10 h-10 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="font-space text-lg font-semibold text-gray-900 dark:text-white"
      >
        {title}
      </motion.h3>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4 }}
          className="mt-1.5 text-sm text-gray-500 dark:text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
