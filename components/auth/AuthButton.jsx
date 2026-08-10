'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';

export const AuthButton = forwardRef(
  ({ children, loading = false, variant = 'primary', className = '', disabled, ...props }, ref) => {
    const variants = {
      primary:
        'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_36px_rgba(37,99,235,0.5)]',
      outline:
        'border-2 border-black/10 dark:border-white/15 text-gray-800 dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/5 hover:border-blue-500 dark:hover:border-blue-400',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || loading ? {} : { scale: 1.02, y: -2 }}
        whileTap={disabled || loading ? {} : { scale: 0.98, y: 0 }}
        disabled={disabled || loading}
        className={`relative h-14 w-full rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size={18} />
            <span>Please wait…</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

AuthButton.displayName = 'AuthButton';
