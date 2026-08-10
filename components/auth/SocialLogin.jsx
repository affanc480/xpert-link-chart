'use client';

import { motion } from 'framer-motion';

const icons = {
  google: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47c-.28 1.5-1.13 2.78-2.4 3.63v3.01h3.88c2.27-2.09 3.57-5.17 3.57-8.83z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11C3.24 21.3 7.28 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 014.9 12c0-.79.14-1.56.37-2.28V6.61H1.26A11.98 11.98 0 000 12c0 1.94.46 3.77 1.26 5.39l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.61l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  ),
  microsoft: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect x="1" y="1" width="10.2" height="10.2" fill="#F25022" />
      <rect x="12.8" y="1" width="10.2" height="10.2" fill="#7FBA00" />
      <rect x="1" y="12.8" width="10.2" height="10.2" fill="#00A4EF" />
      <rect x="12.8" y="12.8" width="10.2" height="10.2" fill="#FFB900" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-gray-900 dark:text-white">
      <path d="M16.365 1.43c0 1.14-.417 2.06-1.25 2.94-.833.87-1.833 1.5-3 1.42-.083-1.1.417-2.15 1.25-3.02.833-.87 2.083-1.42 3-1.34zM20.7 17.32c-.417 1.15-.9 2.24-1.583 3.24-.917 1.33-1.667 2.25-2.75 2.27-1.083.02-1.417-.65-2.667-.65-1.25 0-1.583.63-2.667.67-1.083.04-1.917-1.02-2.833-2.35-1.5-2.24-2.417-4.74-2.417-6.94 0-2.9 1.917-4.45 3.833-4.45 1.083 0 2 .68 2.667.68.667 0 1.833-.85 3.083-.72.583.02 2.083.24 3.083 1.8-.083.05-1.833 1.07-1.833 3.11 0 2.35 2.083 3.15 2.083 3.15z" />
    </svg>
  ),
};

const labels = {
  google: 'Continue with Google',
  microsoft: 'Continue with Microsoft',
  apple: 'Continue with Apple',
};

export function SocialLogin({ providers = ['google', 'microsoft'], onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => (
        <motion.button
          key={provider}
          type="button"
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect?.(provider)}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-2 border-black/[0.08] dark:border-white/[0.12] text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-black/[0.03] dark:hover:bg-white/5 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300"
        >
          {icons[provider]}
          {labels[provider]}
        </motion.button>
      ))}
    </div>
  );
}
