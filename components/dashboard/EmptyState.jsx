'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl card-shadow flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-5">
          <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>
      )}
      {actionLabel && (
        <Button onClick={onAction} className="mt-6" size="sm">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
