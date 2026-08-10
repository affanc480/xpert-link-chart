'use client';

const PREFS_KEY = 'xpertlink_prefs';

function defaultTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

export function getPreferences() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = JSON.parse(window.localStorage.getItem(PREFS_KEY) || '{}');
    return {
      emailNotifications: true,
      systemNotifications: true,
      theme: 'system',
      language: 'English',
      timezone: defaultTimezone(),
      privacyAnalytics: true,
      twoFactorEnabled: false,
      ...saved,
    };
  } catch {
    return {
      emailNotifications: true,
      systemNotifications: true,
      theme: 'system',
      language: 'English',
      timezone: defaultTimezone(),
      privacyAnalytics: true,
      twoFactorEnabled: false,
    };
  }
}

export function savePreferences(partial) {
  if (typeof window === 'undefined') return null;
  const merged = { ...getPreferences(), ...partial };
  window.localStorage.setItem(PREFS_KEY, JSON.stringify(merged));
  return merged;
}

/** Applies a theme preference ('light' | 'dark' | 'system') to <html> and localStorage. */
export function applyTheme(pref) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('theme', pref);
  const root = document.documentElement;
  const shouldDark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dark', shouldDark);
}

export const LANGUAGES = ['English', 'Urdu', 'Arabic', 'French', 'Spanish', 'German'];

export const TIMEZONES = [
  'UTC',
  'Asia/Karachi',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Europe/London',
  'Europe/Berlin',
  'America/New_York',
  'America/Los_Angeles',
  'Australia/Sydney',
];
