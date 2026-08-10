'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function BrandMark({ collapsed = false, className = '' }) {
  return (
    <Link href="/dashboard" className={`group inline-flex items-center gap-2.5 min-w-0 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-9 h-9 flex-shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </motion.div>
      {!collapsed && (
        <span className="font-space text-lg font-bold tracking-tight truncate">
          <span className="text-gray-900 dark:text-white">X</span>
          <span className="text-gradient">pert</span>
          <span className="text-gray-900 dark:text-white">Link</span>
        </span>
      )}
    </Link>
  );
}
