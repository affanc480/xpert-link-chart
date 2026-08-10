'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Menu, ChevronDown, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { getPageTitle } from '@/lib/dashboard-nav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/lib/auth-context';

const NOTIFICATIONS = [
  { id: 1, title: 'New inventory sync completed', time: '5 min ago' },
  { id: 2, title: 'Monthly report is ready to view', time: '2 hours ago' },
  { id: 3, title: 'New account entry needs review', time: 'Yesterday' },
];

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onOutside]);
}

export function DashboardHeader({ onOpenMobileSidebar }) {
  const pathname = usePathname();
  const router = useRouter();
  const title = getPageTitle(pathname);

  const { user, logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);
  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(userRef, () => setUserOpen(false));

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const initials = (user?.fullName || user?.email || 'User')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header
      className={`sticky top-0 z-30 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200/70 dark:border-white/10 transition-all duration-300`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 -ml-2 rounded-lg text-gray-700 dark:text-white hover:bg-blue-50/50 dark:hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="min-w-0">
          <h1 className="font-space text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
            Welcome back to your Xpert Link workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        <div className="relative" ref={notifRef}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setNotifOpen((v) => !v);
              setUserOpen(false);
            }}
            className="relative p-2.5 rounded-xl glass hover:glass-hover transition-colors border border-black/10 dark:border-white/10"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 ring-2 ring-white dark:ring-black" />
          </motion.button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-80 max-w-[85vw] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/95 dark:bg-[#0a0f1f]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-200/70 dark:border-white/10">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-blue-50/40 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">{n.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={userRef}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setUserOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-1.5 pr-2.5 sm:pr-3 py-1.5 rounded-xl glass hover:glass-hover transition-colors border border-black/10 dark:border-white/10"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 overflow-hidden">
              {user?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                initials || <User className="w-4 h-4" />
              )}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-800 dark:text-gray-200 max-w-[120px] truncate">
              {user?.fullName || user?.email || 'Account'}
            </span>
            <ChevronDown className="hidden sm:block w-4 h-4 text-gray-400" />
          </motion.button>

          <AnimatePresence>
            {userOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-60 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/95 dark:bg-[#0a0f1f]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden py-1.5"
              >
                <div className="px-4 py-2.5 border-b border-gray-200/70 dark:border-white/10 mb-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user?.fullName || 'Signed in'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors"
                >
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                <Link
                  href="/faq"
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" /> Help Centre
                </Link>
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
      </div>
    </header>
  );
}
