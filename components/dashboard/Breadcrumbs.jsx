'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mb-3"
    >
      <Link
        href="/dashboard"
        className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-white transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
            {isLast || !item.href ? (
              <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-blue-600 dark:hover:text-white transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
