'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function AuthLogo() {
  return (
    <Link href="/" className="group inline-flex flex-col items-center gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="relative w-14 h-14"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
        <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.35)]">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
      </motion.div>
      <span className="font-space text-2xl font-bold tracking-tight">
        <span className="text-gray-900 dark:text-white">X</span>
        <span className="text-gradient">pert</span>
        <span className="text-gray-900 dark:text-white">Link</span>
      </span>
    </Link>
  );
}
