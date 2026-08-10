'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function StatCard({ label, value, change, trend = 'up', icon: Icon }) {
  const positive = trend === 'up';

  return (
    <Card hover className="!p-5 sm:!p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{label}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-2 font-space text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
          >
            {value}
          </motion.p>
        </div>
        {Icon && (
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        )}
      </div>

      {change && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
              positive
                ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10'
                : 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10'
            }`}
          >
            {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </span>
          <span className="text-gray-400 dark:text-gray-500">vs last month</span>
        </div>
      )}
    </Card>
  );
}
