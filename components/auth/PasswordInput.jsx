'use client';

import { forwardRef, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { AuthInput } from './AuthInput';

export const PasswordInput = forwardRef(({ label = 'Password', ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <AuthInput
      ref={ref}
      label={label}
      icon={Lock}
      type={visible ? 'text' : 'password'}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors"
          tabIndex={-1}
        >
          {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
