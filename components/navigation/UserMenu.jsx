'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, User, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onOutside]);
}

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Help Centre', href: '/faq', icon: HelpCircle },
];

export function UserMenu({ variant = 'desktop', onNavigate }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  const initials = (user?.fullName || user?.email || 'User')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    setOpen(false);
    onNavigate?.();
    logout();
    router.push('/');
  };

  const Avatar = (
    <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 overflow-hidden">
      {user?.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.avatar} alt="" className="w-full h-full object-cover" />
      ) : (
        initials || <User className="w-4 h-4" />
      )}
    </div>
  );

  if (variant === 'mobile') {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5">
          {Avatar}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.fullName || 'Signed in'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl glass hover:glass-hover transition-colors border border-black/10 dark:border-white/10"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {Avatar}
        <span className="hidden xl:block text-sm font-medium text-gray-800 dark:text-gray-200 max-w-[120px] truncate">
          {user?.fullName || user?.email || 'Account'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-64 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/95 dark:bg-[#0a0f1f]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden py-1.5 z-50"
          >
            <div className="px-4 py-2.5 border-b border-gray-200/70 dark:border-white/10 mb-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.fullName || 'Signed in'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors"
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
