'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Deterministic pseudo-random so server/client markup matches (avoids hydration mismatch)
function seeded(i, salt = 1) {
  const x = Math.sin(i * 999 * salt) * 10000;
  return x - Math.floor(x);
}

export function AuthBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        left: seeded(i, 1) * 100,
        top: seeded(i, 2) * 100,
        size: 2 + seeded(i, 3) * 3,
        duration: 6 + seeded(i, 4) * 8,
        delay: seeded(i, 5) * 6,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-white dark:bg-[#050816]">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
        }}
      />

      {/* Large animated gradient blobs / blue glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full bg-blue-500/20 dark:bg-blue-500/25 blur-[110px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[-200px] right-[-120px] w-[560px] h-[560px] rounded-full bg-blue-700/15 dark:bg-blue-600/20 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 left-[-140px] w-[420px] h-[420px] rounded-full bg-blue-400/15 dark:bg-blue-400/10 blur-[90px]"
      />

      {/* Blurred glass circles */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:block absolute top-[14%] right-[12%] w-24 h-24 rounded-full glass"
      />
      <motion.div
        animate={{ y: [0, 22, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="hidden md:block absolute bottom-[16%] left-[10%] w-16 h-16 rounded-2xl glass"
      />

      {/* Tiny floating particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-blue-500/40 dark:bg-blue-400/50"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
