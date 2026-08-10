'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserMenu } from './UserMenu';
import { useAuth } from '@/lib/auth-context';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Industries', href: '/industries' },
  { name: 'Why Choose Us', href: '/why-choose-us' },
  { name: 'Features', href: '/features' },
  { name: 'Process', href: '/process' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Success Stories', href: '/success-stories' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export function MobileMenu({ onClose }) {
  const pathname = usePathname();
  const { ready, authed } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl lg:hidden"
    >
      <div className="flex flex-col h-full pt-24 px-6 pb-6 overflow-y-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 bg-black/5 dark:bg-white/10'
                    : 'text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-black/10 dark:border-white/10"
        >
          {ready && authed ? (
            <UserMenu variant="mobile" onNavigate={onClose} />
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="block w-full px-6 py-4 text-center bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg font-medium text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
            >
              Login
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
