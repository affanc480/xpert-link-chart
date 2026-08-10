'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, Pencil, User, Mail, Phone, Building2, Briefcase, Globe2, CalendarClock, ShieldCheck, X } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/lib/auth-context';

const BUSINESS_TYPES = ['Retail', 'Wholesale', 'Manufacturing', 'Services', 'E-commerce', 'Other'];

const FIELDS = [
  { key: 'fullName', label: 'Full Name', icon: User, placeholder: 'Jordan Miller' },
  { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'you@company.com' },
  { key: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+1 (555) 000-0000' },
  { key: 'company', label: 'Company Name', icon: Building2, placeholder: 'Acme Inc.' },
  { key: 'country', label: 'Country', icon: Globe2, placeholder: 'United States' },
];

function formatMemberSince(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '—';
  }
}

export default function ProfilePage() {
  const { user, ready, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  if (!ready || !user) {
    return (
      <div>
        <PageHeader title="Profile" description="Manage your personal and business information." />
        <Card className="h-40 animate-pulse" />
      </div>
    );
  }

  const startEditing = () => {
    setForm(user);
    setEditing(true);
    setSaved(false);
  };

  const cancelEditing = () => {
    setForm(user);
    setEditing(false);
  };

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { fullName, phone, company, businessType, country } = form;
      await updateUser({ fullName, phone, company, businessType, country });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err.message || 'Failed to save profile.');
    }
  };

  const handleAvatarPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await updateUser({ avatar: reader.result });
      } catch (err) {
        alert(err.message || 'Failed to update avatar.');
      }
    };
    reader.readAsDataURL(file);
  };

  const initials = (user.fullName || user.email || 'User')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Manage your personal and business information."
        actions={
          !editing ? (
            <Button variant="outline" size="sm" onClick={startEditing} className="gap-2">
              <Pencil className="w-4 h-4" /> Edit Profile
            </Button>
          ) : null
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile picture + status */}
        <Card className="lg:col-span-1 flex flex-col items-center text-center !py-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-3xl font-bold text-white overflow-hidden shadow-[0_8px_30px_rgba(37,99,235,0.35)]">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-white dark:bg-[#0a0f1f] border border-gray-200 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md hover:scale-105 transition-transform"
              aria-label="Change profile picture"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarPick}
              className="hidden"
            />
          </div>

          <h2 className="mt-5 font-space text-xl font-bold text-gray-900 dark:text-white truncate max-w-full">
            {user.fullName || 'Your Name'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-full">{user.email}</p>

          <div className="mt-4">
            <Badge variant="success" className="gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> {user.status || 'Active'}
            </Badge>
          </div>

          <div className="mt-6 w-full pt-6 border-t border-gray-200/70 dark:border-white/10 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarClock className="w-4 h-4" />
            Member since {formatMemberSince(user.createdAt)}
          </div>
        </Card>

        {/* Details */}
        <Card className="lg:col-span-2">
          <form onSubmit={handleSave}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-space text-lg font-bold text-gray-900 dark:text-white">Account Details</h3>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400"
                >
                  <Check className="w-3.5 h-3.5" /> Saved
                </motion.span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FIELDS.map(({ key, label, icon: Icon, type, placeholder }) => (
                <div key={key}>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </label>
                  {editing ? (
                    <Input
                      type={type || 'text'}
                      value={form[key] || ''}
                      onChange={handleChange(key)}
                      placeholder={placeholder}
                    />
                  ) : (
                    <p className="px-4 py-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] text-sm text-gray-900 dark:text-white truncate">
                      {user[key] || <span className="text-gray-400 dark:text-gray-600">Not set</span>}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Business Type
                </label>
                {editing ? (
                  <select
                    value={form.businessType || ''}
                    onChange={handleChange('businessType')}
                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  >
                    <option value="" className="bg-white text-black">Select business type</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-white text-black">{t}</option>
                    ))}
                  </select>
                ) : (
                  <p className="px-4 py-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] text-sm text-gray-900 dark:text-white truncate">
                    {user.businessType || <span className="text-gray-400 dark:text-gray-600">Not set</span>}
                  </p>
                )}
              </div>
            </div>

            {editing && (
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200/70 dark:border-white/10">
                <Button type="submit" size="sm" className="gap-2">
                  <Check className="w-4 h-4" /> Save Changes
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={cancelEditing} className="gap-2">
                  <X className="w-4 h-4" /> Cancel
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
