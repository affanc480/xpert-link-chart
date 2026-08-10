'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  HelpCircle,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  X,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/dashboard-nav';
import { BrandMark } from './BrandMark';
import { useAuth } from '@/lib/auth-context';

function SidebarLink({ item, pathname, collapsed, onNavigate }) {
  const active = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-300 group ${
        active
          ? 'text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-white/10'
          : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/40 dark:hover:bg-white/5'
      }`}
    >
      {active && (
        <motion.span
          layoutId="dashboard-nav-indicator"
          className="absolute inset-0 bg-blue-50/60 dark:bg-white/10 rounded-xl"
          transition={{ type: 'spring', duration: 0.6 }}
        />
      )}
      <Icon
        className={`relative z-10 w-[18px] h-[18px] flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
          active ? 'text-blue-600 dark:text-blue-400' : ''
        }`}
      />
      {!collapsed && <span className="relative z-10 truncate">{item.name}</span>}
      {active && !collapsed && (
        <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
      )}
    </Link>
  );
}

function SidebarContent({ collapsed, onToggleCollapse, onNavigate, showCollapseToggle }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate?.();
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center h-20 px-5 border-b border-gray-200/70 dark:border-white/10 ${collapsed ? 'justify-center px-2' : 'justify-between'}`}>
        <BrandMark collapsed={collapsed} />
        {showCollapseToggle && !collapsed && (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50/60 dark:hover:bg-white/10 transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1.5 scrollbar-hide">
        {NAV_ITEMS.map((item) => (
          <SidebarLink key={item.href} item={item} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
        ))}
      </nav>

      {collapsed && showCollapseToggle && (
        <button
          onClick={onToggleCollapse}
          className="mx-3 mb-2 p-2 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50/60 dark:hover:bg-white/10 transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      )}

      <div className="px-3 py-4 border-t border-gray-200/70 dark:border-white/10 space-y-1.5">
        <Link
          href="/"
          onClick={onNavigate}
          className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/40 dark:hover:bg-white/5 transition-all duration-300 ${collapsed ? 'justify-center' : ''}`}
        >
          <Globe className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Go to Website</span>}
        </Link>
        <Link
          href="/faq"
          onClick={onNavigate}
          className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/40 dark:hover:bg-white/5 transition-all duration-300 ${collapsed ? 'justify-center' : ''}`}
        >
          <HelpCircle className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Help Centre</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-500/10 transition-all duration-300 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Desktop / tablet sticky sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-screen z-40 bg-white/85 dark:bg-black/60 backdrop-blur-xl border-r border-gray-200/70 dark:border-white/10 transition-all duration-300 ${
          collapsed ? 'w-[76px]' : 'w-[264px]'
        }`}
      >
        <SidebarContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} showCollapseToggle />
      </aside>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="md:hidden fixed top-0 left-0 h-screen w-[280px] max-w-[82vw] z-50 bg-white dark:bg-[#050816] border-r border-gray-200/70 dark:border-white/10 shadow-2xl"
            >
              <button
                onClick={onCloseMobile}
                className="absolute top-5 right-4 p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50/60 dark:hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent collapsed={false} onNavigate={onCloseMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
