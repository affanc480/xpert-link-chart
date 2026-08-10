'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function OTPInput({ length = 6, onComplete, error }) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const focusInput = (index) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (index, raw) => {
    const digit = raw.replace(/[^0-9]/g, '').slice(-1);
    const next = [...values];
    next[index] = digit;
    setValues(next);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    if (next.every((v) => v !== '')) {
      onComplete?.(next.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (values[index]) {
        const next = [...values];
        next[index] = '';
        setValues(next);
      } else if (index > 0) {
        focusInput(index - 1);
        const next = [...values];
        next[index - 1] = '';
        setValues(next);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length);
    if (!pasted) return;
    const next = Array(length).fill('');
    pasted.split('').forEach((char, i) => {
      next[i] = char;
    });
    setValues(next);
    const lastIndex = Math.min(pasted.length, length) - 1;
    focusInput(lastIndex >= 0 ? lastIndex : 0);
    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-2.5 sm:gap-3" onPaste={handlePaste}>
        {values.map((value, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            animate={{ scale: value ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 0.25 }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            aria-label={`Digit ${index + 1} of verification code`}
            className={`h-14 w-12 sm:w-14 rounded-2xl border bg-black/[0.03] dark:bg-white/[0.04] text-center text-xl font-semibold text-gray-900 dark:text-white outline-none transition-all duration-300 ${
              error
                ? 'border-red-400/60 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-black/[0.08] dark:border-white/[0.1] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 focus:shadow-[0_0_20px_rgba(37,99,235,0.18)]'
            }`}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-center text-xs text-red-500">{error}</p>}
    </div>
  );
}
