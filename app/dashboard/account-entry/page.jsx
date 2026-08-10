'use client';

import { useEffect, useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const typeLabels = { CUSTOMER: 'Customer', VENDOR: 'Vendor', PARTNER: 'Partner' };

export default function AccountEntryPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [form, setForm] = useState({ name: '', type: 'CUSTOMER', contact: '' });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const loadRows = async () => {
    setLoading(true);
    setListError('');
    try {
      const response = await fetch('/api/accounts?limit=100', { credentials: 'include' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to load accounts.');
      setRows(json.data.items);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, []);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.name || !form.contact) return;

    try {
      setSaving(true);
      const response = await fetch('/api/accounts', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountName: form.name,
          accountType: form.type,
          contactEmail: form.contact,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        setFormError(json.message || 'Failed to add account.');
        return;
      }
      setRows((r) => [json.data, ...r]);
      setForm({ name: '', type: 'CUSTOMER', contact: '' });
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this account?')) return;
    try {
      const response = await fetch(`/api/accounts/${id}`, { method: 'DELETE', credentials: 'include' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Failed to delete account.');
      setRows((r) => r.filter((row) => row.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <PageHeader title="Account Entry" description="Add new accounts and manage existing entries." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">New Account</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && <p className="text-xs text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-3 py-2">{formError}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Account Name</label>
              <Input placeholder="e.g. Nova Retail Group" value={form.name} onChange={handleChange('name')} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Account Type</label>
              <select
                value={form.type}
                onChange={handleChange('type')}
                className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              >
                <option value="CUSTOMER" className="bg-white text-black">Customer</option>
                <option value="VENDOR" className="bg-white text-black">Vendor</option>
                <option value="PARTNER" className="bg-white text-black">Partner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Contact Email</label>
              <Input type="email" placeholder="name@company.com" value={form.contact} onChange={handleChange('contact')} required />
            </div>
            <Button type="submit" className="w-full justify-center" disabled={saving}>
              {saving ? 'Adding...' : 'Add Account'}
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-2">
          <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Entries</h3>
          {listError && <p className="mb-3 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-4 py-3">{listError}</p>}
          <div className="glass rounded-2xl card-shadow overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200/70 dark:border-white/10">
                    <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Account Name</th>
                    <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Type</th>
                    <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Contact</th>
                    <th className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap">Status</th>
                    <th className="text-center font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs px-5 py-3.5 whitespace-nowrap w-16">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400 dark:text-gray-500">Loading…</td></tr>
                  ) : rows.length === 0 ? (
                    <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400 dark:text-gray-500">No accounts yet</td></tr>
                  ) : (
                    rows.map((row) => (
                      <tr key={row.id} className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-blue-50/30 dark:hover:bg-white/[0.03] transition-colors">
                        <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.accountName}</td>
                        <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{typeLabels[row.accountType]}</td>
                        <td className="px-5 py-3.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.contactEmail || '—'}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                            {row.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <button onClick={() => handleDelete(row.id)} className="p-2 rounded-lg text-red-500 bg-red-50 dark:bg-red-500/10 hover:scale-105 transition-all duration-200" aria-label={`Delete ${row.accountName}`}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
