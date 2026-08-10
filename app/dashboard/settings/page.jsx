'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShieldCheck,
  Smartphone,
  History,
  Bell,
  Palette,
  Languages,
  Clock,
  Lock,
  Trash2,
  Check,
  AlertTriangle,
  Monitor,
  MapPin,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/lib/auth-context';
import { applyTheme, LANGUAGES, TIMEZONES } from '@/lib/settings';

const ACTIVE_SESSIONS = [
  { id: 1, device: 'This device · Current session', location: '—', current: true },
];

function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <Card className="!p-0 overflow-hidden">
      <div className="px-5 sm:px-6 py-5 border-b border-gray-200/70 dark:border-white/10 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="min-w-0">
          <h3 className="font-space text-base font-bold text-gray-900 dark:text-white">{title}</h3>
          {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="p-5 sm:p-6 space-y-5">{children}</div>
    </Card>
  );
}

function Row({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { user, ready, updateUser, logout } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [prefs, setPrefs] = useState(null);
  const [savedFlags, setSavedFlags] = useState({});
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) setName(user.fullName || '');
  }, [user]);

  useEffect(() => {
    fetch('/api/settings', { credentials: 'include' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setPrefs(json.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const flash = (key) => {
    setSavedFlags((f) => ({ ...f, [key]: true }));
    setTimeout(() => setSavedFlags((f) => ({ ...f, [key]: false })), 2500);
  };

  const handlePrefChange = async (partial) => {
    const optimistic = { ...prefs, ...partial };
    setPrefs(optimistic);
    if (partial.theme) applyTheme(partial.theme);

    try {
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partial),
      });
      const json = await response.json();
      if (json.success) setPrefs(json.data);
      flash('prefs');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveName = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ fullName: name });
      flash('name');
    } catch (err) {
      alert(err.message || 'Failed to save name.');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    if (!passwords.current || !passwords.next) {
      setPasswordError('Fill in your current and new password.');
      return;
    }
    if (passwords.next.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.next }),
      });
      const json = await response.json();
      if (!response.ok) {
        setPasswordError(json.message || 'Failed to update password.');
        return;
      }
      setPasswords({ current: '', next: '', confirm: '' });
      flash('password');
    } catch (err) {
      setPasswordError('Something went wrong. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');
    try {
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword }),
      });
      const json = await response.json();
      if (!response.ok) {
        setDeleteError(json.message || 'Failed to delete account.');
        return;
      }
      await logout();
      router.push('/');
    } catch (err) {
      setDeleteError('Something went wrong. Please try again.');
    }
  };

  if (!ready || !user || !prefs) {
    return (
      <div>
        <PageHeader title="Settings" description="Manage your account, security, and preferences." />
        <Card className="h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account, security, and preferences." />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Account Settings */}
        <SectionCard icon={User} title="Account Settings" description="Update your name and view your email address.">
          <form onSubmit={handleSaveName} className="space-y-2">
            <Row label="Full Name" description="Shown across the dashboard and website.">
              {savedFlags.name && <SavedTag />}
            </Row>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              <Button type="submit" size="sm" variant="outline" className="sm:flex-shrink-0">Save</Button>
            </div>
          </form>

          <div className="space-y-2 pt-5 border-t border-gray-200/70 dark:border-white/10">
            <Row label="Email Address" description="Used to sign in. Contact support to change your email." />
            <Input type="email" value={user.email} disabled />
          </div>
        </SectionCard>

        {/* Security */}
        <SectionCard icon={ShieldCheck} title="Security" description="Password, two-factor auth, and session monitoring.">
          <form onSubmit={handleUpdatePassword} className="space-y-3">
            <Row label="Update Password" description="Choose a strong password you don't use elsewhere." >
              {savedFlags.password && <SavedTag />}
            </Row>
            <Input type="password" placeholder="Current password" value={passwords.current} onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))} />
            <Input type="password" placeholder="New password" value={passwords.next} onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))} />
            <Input type="password" placeholder="Confirm new password" value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} />
            {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
            <Button type="submit" size="sm" className="gap-2">
              <Lock className="w-3.5 h-3.5" /> Update Password
            </Button>
          </form>

          <div className="pt-5 border-t border-gray-200/70 dark:border-white/10">
            <Row label="Two-Factor Authentication" description="Add an extra layer of security to your account.">
              <div className="flex items-center gap-2">
                <Switch checked={prefs.twoFactorEnabled} onChange={(v) => handlePrefChange({ twoFactorEnabled: v })} label="Two-factor authentication" />
              </div>
            </Row>
          </div>

          <div className="pt-5 border-t border-gray-200/70 dark:border-white/10">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-gray-400" /> Active Sessions
            </p>
            <div className="space-y-2">
              {ACTIVE_SESSIONS.map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Monitor className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{s.device}</p>
                    </div>
                  </div>
                  <Badge variant="success" className="flex-shrink-0">This device</Badge>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Notifications */}
        <SectionCard icon={Bell} title="Notifications" description="Choose what you want to be notified about.">
          <Row label="Email Notifications" description="Receive updates and alerts by email.">
            <Switch checked={prefs.emailNotifications} onChange={(v) => handlePrefChange({ emailNotifications: v })} label="Email notifications" />
          </Row>
          <Row label="System Notifications" description="In-app notifications about account activity.">
            <Switch checked={prefs.systemNotifications} onChange={(v) => handlePrefChange({ systemNotifications: v })} label="System notifications" />
          </Row>
        </SectionCard>

        {/* Preferences */}
        <SectionCard icon={Palette} title="Preferences" description="Personalize how Xpert Link looks and feels.">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Theme</p>
            <div className="grid grid-cols-3 gap-2">
              {['light', 'dark', 'system'].map((t) => (
                <button
                  key={t}
                  onClick={() => handlePrefChange({ theme: t })}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium capitalize transition-all duration-300 border ${
                    prefs.theme === t
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white mb-2">
              <Languages className="w-4 h-4 text-gray-400" /> Language
            </label>
            <select
              value={prefs.language}
              onChange={(e) => handlePrefChange({ language: e.target.value })}
              className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l} className="bg-white text-black">{l}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white mb-2">
              <Clock className="w-4 h-4 text-gray-400" /> Time Zone
            </label>
            <select
              value={prefs.timezone}
              onChange={(e) => handlePrefChange({ timezone: e.target.value })}
              className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz} className="bg-white text-black">{tz}</option>
              ))}
            </select>
          </div>
          {savedFlags.prefs && <SavedTag />}
        </SectionCard>

        {/* Privacy */}
        <SectionCard icon={Lock} title="Privacy" description="Control your data and manage account deletion." >
          <Row label="Privacy Preferences" description="Allow anonymized usage analytics to improve the product.">
            <Switch checked={prefs.privacyAnalytics} onChange={(v) => handlePrefChange({ privacyAnalytics: v })} label="Privacy analytics" />
          </Row>

          <div className="pt-5 border-t border-gray-200/70 dark:border-white/10">
            <Row
              label="Delete Account"
              description="Permanently remove your account and all associated data. This cannot be undone."
            >
              <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)} className="!text-red-500 !border-red-300 dark:!border-red-500/30 hover:!bg-red-50 dark:hover:!bg-red-500/10 gap-2 flex-shrink-0">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </Button>
            </Row>
          </div>
        </SectionCard>
      </div>

      <AnimatePresence>
        {deleteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={() => setDeleteOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#0a0f1f] border border-black/10 dark:border-white/10 shadow-2xl p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">Delete your account?</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This will permanently remove your account and all associated data. Enter your password to confirm.
              </p>
              <Input
                type="password"
                className="mt-4"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Your password"
              />
              {deleteError && <p className="text-xs text-red-500 mt-2">{deleteError}</p>}
              <div className="flex items-center gap-3 mt-5">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!deletePassword}
                  onClick={handleDeleteAccount}
                  className="!bg-none !bg-red-600 hover:!bg-red-700 !shadow-none disabled:opacity-40 disabled:pointer-events-none"
                >
                  Delete Account
                </Button>
                <Button variant="ghost" size="sm" onClick={() => { setDeleteOpen(false); setDeletePassword(''); setDeleteError(''); }}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SavedTag() {
  return (
    <motion.span
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400"
    >
      <Check className="w-3.5 h-3.5" /> Saved
    </motion.span>
  );
}
