'use client';

import { useEffect, useState } from 'react';
import { FileBarChart2, TrendingUp, Boxes, Users, Download, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card } from '@/components/ui/Card';

const REPORT_TYPES = [
  { title: 'Sales Performance', type: 'sales', description: 'Revenue, growth, and trends by period.', icon: TrendingUp },
  { title: 'Inventory Summary', type: 'inventory', description: 'Stock levels and turnover across warehouses.', icon: Boxes },
  { title: 'Account Activity', type: 'accounts', description: 'New and updated accounts over time.', icon: Users },
];

export default function ReportsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState('');
  const [error, setError] = useState('');

  const loadRows = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reports?limit=50', { credentials: 'include' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to load reports.');
      setRows(json.data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, []);

  const handleGenerate = async (reportType) => {
    setError('');
    try {
      setGenerating(reportType.type);

      // Pull the live numbers for this report from the dashboard stats
      // endpoint so the generated report reflects real data.
      const statsRes = await fetch('/api/dashboard', { credentials: 'include' });
      const statsJson = await statsRes.json();
      const stats = statsJson.data || {};

      const data = [
        { metric: 'Inventory Count', value: stats.inventoryCount ?? 0 },
        { metric: 'Accounts Count', value: stats.accountsCount ?? 0 },
        { metric: 'Reports Count', value: stats.reportsCount ?? 0 },
        { metric: 'Monthly Growth (%)', value: stats.monthlyGrowth ?? 0 },
      ];

      const response = await fetch('/api/reports', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${reportType.title} — ${new Date().toLocaleDateString()}`,
          type: reportType.type,
          format: 'PDF',
          data,
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to generate report.');
      setRows((r) => [json.data, ...r]);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating('');
    }
  };

  const handleDownload = (id, format) => {
    window.open(`/api/reports/${id}/export?format=${format.toLowerCase()}`, '_blank');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this report?')) return;
    try {
      const response = await fetch(`/api/reports/${id}`, { method: 'DELETE', credentials: 'include' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to delete report.');
      setRows((r) => r.filter((row) => row.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <PageHeader title="Reports" description="Generate and download insights across your workspace." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {REPORT_TYPES.map((type) => (
          <Card
            key={type.title}
            hover
            className="cursor-pointer"
            onClick={() => generating !== type.type && handleGenerate(type)}
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4">
              <type.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-space font-bold text-gray-900 dark:text-white">{type.title}</h3>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{type.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
              <FileBarChart2 className="w-4 h-4" /> {generating === type.type ? 'Generating…' : 'Generate'}
            </span>
          </Card>
        ))}
      </div>

      <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Reports</h3>

      {error && <p className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-4 py-3">{error}</p>}

      <div className="glass rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-gray-200/70 dark:border-white/10">
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Report</th>
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Generated</th>
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Format</th>
                <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap w-56"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-gray-400 dark:text-gray-500">Loading…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-gray-400 dark:text-gray-500">No reports generated yet</td></tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-blue-50/30 dark:hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.title}</td>
                    <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{new Date(row.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.format}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleDownload(row.id, 'pdf')} className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                        <button onClick={() => handleDownload(row.id, 'xlsx')} className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                          <Download className="w-3.5 h-3.5" /> Excel
                        </button>
                        <button onClick={() => handleDelete(row.id)} className="p-1.5 rounded-lg text-red-500 bg-red-50 dark:bg-red-500/10 hover:scale-105 transition-all duration-200" aria-label="Delete report">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
