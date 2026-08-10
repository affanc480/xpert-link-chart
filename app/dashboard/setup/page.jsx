'use client';

import { useEffect, useState } from 'react';
import { Building2, Bell, ShieldCheck, Palette, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
        checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white/10'
      }`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

const PREFERENCES = [
  { key: 'notifications', label: 'Email notifications', description: 'Get notified about account and inventory activity.', icon: Bell },
  { key: 'twoFactor', label: 'Two-factor authentication', description: 'Add an extra layer of security to your account.', icon: ShieldCheck },
  { key: 'autoDarkMode', label: 'Auto dark mode', description: 'Follow system appearance automatically.', icon: Palette },
];

const emptyProfile = { companyName: '', registrationNo: '', businessEmail: '', phone: '', address: '' };

export default function SetupPage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [prefs, setPrefs] = useState({ notifications: true, twoFactor: false, autoDarkMode: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/setup', { credentials: 'include' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const d = json.data;
          setProfile({
            companyName: d.companyName || '',
            registrationNo: d.registrationNo || '',
            businessEmail: d.businessEmail || '',
            phone: d.phone || '',
            address: d.address || '',
          });
          setPrefs({ notifications: d.notifications, twoFactor: d.twoFactor, autoDarkMode: d.autoDarkMode });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const togglePref = async (key) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    try {
      await fetch('/api/setup', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: next[key] }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (field) => (e) => setProfile((p) => ({ ...p, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setSaving(true);
      const response = await fetch('/api/setup', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.message || 'Failed to save company profile.');
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Setup" description="Configure your company profile and workspace preferences." />
        <Card className="h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Setup"
        description="Configure your company profile and workspace preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">Company Profile</h3>
            </div>
            {saved && (
              <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                <Check className="w-3.5 h-3.5" /> Saved
              </motion.span>
            )}
          </div>

          {error && <p className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-4 py-3">{error}</p>}

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company Name</label>
              <Input placeholder="Xpert Link" value={profile.companyName} onChange={handleChange('companyName')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Registration No.</label>
              <Input placeholder="e.g. XL-108452" value={profile.registrationNo} onChange={handleChange('registrationNo')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Business Email</label>
              <Input type="email" placeholder="workspace@xpertlink.com" value={profile.businessEmail} onChange={handleChange('businessEmail')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
              <Input type="tel" placeholder="+1 (555) 000-0000" value={profile.phone} onChange={handleChange('phone')} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Business Address</label>
              <Input placeholder="Street, city, country" value={profile.address} onChange={handleChange('address')} />
            </div>
            <div className="sm:col-span-2 flex justify-end pt-2">
              <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
            </div>
          </form>
        </Card>

        <Card className="space-y-5">
          <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">Preferences</h3>
          {PREFERENCES.map((pref) => (
            <div key={pref.key} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <pref.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{pref.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{pref.description}</p>
                </div>
              </div>
              <Toggle checked={prefs[pref.key]} onChange={() => togglePref(pref.key)} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
