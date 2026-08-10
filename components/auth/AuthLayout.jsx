'use client';

import { motion } from 'framer-motion';
import { AuthBackground } from './AuthBackground';
import { AuthCard } from './AuthCard';
import { AuthLogo } from './AuthLogo';

export function AuthLayout({ title, subtitle, icon, children, footer }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-16 sm:py-20 overflow-hidden">
      <AuthBackground />

      <div className="relative z-10 w-full flex flex-col items-center max-w-[480px] md:max-w-[480px] sm:max-w-[420px]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <AuthLogo />
        </motion.div>

        <AuthCard className="w-[92%] sm:w-full mx-auto">
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              {icon}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-space text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        </AuthCard>

        {footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
          >
            {footer}
          </motion.div>
        )}
      </div>
    </div>
  );
}
