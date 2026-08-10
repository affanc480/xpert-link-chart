'use client';

import { forwardRef, useState } from 'react';

export const AuthInput = forwardRef(
  (
    {
      label,
      icon: Icon,
      error,
      className = '',
      containerClassName = '',
      rightElement,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                focused ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'
              }`}
            />
          )}
          <input
            ref={ref}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={!!error}
            className={`h-14 w-full rounded-2xl border bg-black/[0.03] dark:bg-white/[0.04] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-300 ${
              Icon ? 'pl-12' : 'pl-4'
            } ${rightElement ? 'pr-12' : 'pr-4'} ${
              error
                ? 'border-red-400/60 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-black/[0.08] dark:border-white/[0.1] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 focus:shadow-[0_0_20px_rgba(37,99,235,0.18)]'
            } ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';
