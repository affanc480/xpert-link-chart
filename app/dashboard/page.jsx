'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Boxes, FileBarChart2, UserPlus, TrendingUp, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { DataTable } from '@/components/dashboard/DataTable';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/lib/auth-context';

const COLUMNS = [
  { key: 'description', label: 'Activity' },
  { key: 'module', label: 'Module' },
  {
    key: 'createdAt',
    label: 'When',
    render: (row) => new Date(row.createdAt).toLocaleString(),
  },
  {
    key: 'action',
    label: 'Type',
    render: (row) => (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        {row.action}
      </span>
    ),
  },
];

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const name = user?.fullName?.split(' ')[0] || '';

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/dashboard', { credentials: 'include' })
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json.success) setStats(json.data);
      })
      .catch((err) => console.error(err))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  const statCards = [
    { label: 'Total Inventory Items', value: stats?.inventoryCount ?? '—', icon: Boxes },
    { label: 'Accounts Entered', value: stats?.accountsCount ?? '—', icon: UserPlus },
    { label: 'Reports Generated', value: stats?.reportsCount ?? '—', icon: FileBarChart2 },
    { label: 'Monthly Growth', value: stats ? `${stats.monthlyGrowth}%` : '—', icon: TrendingUp },
  ];

  return (
    <div>
      <PageHeader
        title={name ? `Welcome back, ${name}` : 'Welcome back'}
        description="Here's what's happening across your workspace today."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6 sm:mt-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            <a
              href="/dashboard/reports"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              View reports <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <DataTable
            columns={COLUMNS}
            rows={stats?.recentActivity || []}
            emptyLabel={loading ? 'Loading…' : 'No recent activity yet'}
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <Card className="!p-2 space-y-1">
            {[
              { label: 'Add account entry', href: '/dashboard/account-entry' },
              { label: 'Update inventory', href: '/dashboard/inventory' },
              { label: 'Generate report', href: '/dashboard/reports' },
              { label: 'Workspace setup', href: '/dashboard/setup' },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors"
              >
                {action.label}
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
