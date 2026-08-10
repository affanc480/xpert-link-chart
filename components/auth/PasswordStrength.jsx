'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export function getPasswordRules(password = '') {
  return [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'One number', valid: /[0-9]/.test(password) },
    { label: 'One special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];
}

export function PasswordStrength({ password = '', showList = true }) {
  const rules = getPasswordRules(password);
  const score = rules.filter((r) => r.valid).length;

  const meta = [
    { label: '', color: 'bg-gray-200 dark:bg-white/10' },
    { label: 'Weak', color: 'bg-red-500' },
    { label: 'Fair', color: 'bg-orange-500' },
    { label: 'Good', color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-blue-500' },
    { label: 'Excellent', color: 'bg-green-500' },
  ][password.length === 0 ? 0 : score];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full bg-black/[0.06] dark:bg-white/10 overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: i < score ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
              className={`h-full rounded-full ${meta.color}`}
            />
          </div>
        ))}
      </div>
      {password.length > 0 && (
        <p className="mt-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          {meta.label} password
        </p>
      )}

      {showList && (
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3">
          {rules.map((rule) => (
            <li
              key={rule.label}
              className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${
                rule.valid ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {rule.valid ? (
                <Check className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 shrink-0" />
              )}
              {rule.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
