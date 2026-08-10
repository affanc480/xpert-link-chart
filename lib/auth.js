'use client';

const AUTH_KEY = 'xpertlink_auth';
const USER_KEY = 'xpertlink_user';
const AUTH_EVENT = 'xpertlink:auth-change';

/**
 * Lightweight front-end "session" so the marketing site and the User Panel
 * can share one authenticated state without a backend yet. It mirrors the
 * flag into a cookie (readable by both surfaces, and ready to be replaced
 * by a real `Set-Cookie` from an API route) alongside localStorage, which
 * holds the richer profile payload.
 *
 * Swap the internals of these functions for real API calls / an httpOnly
 * JWT cookie set by the server once auth is wired up on the backend -
 * every call site in the app goes through this module, so the surface
 * area to change later is small.
 */

function notify() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;

  return document.cookie.includes("token=");
}

function defaultProfile(user) {
  const now = new Date().toISOString();
  return {
    fullName: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    country: '',
    avatar: null,
    memberSince: now,
    status: 'Active',
    ...user,
  };
}

export function startSession(user) {
  if (typeof window === "undefined") return;

  const merged = defaultProfile(user);

  window.localStorage.setItem(
    USER_KEY,
    JSON.stringify(merged)
  );

  notify();
}

export async function endSession() {

  await fetch("/api/auth/logout", {
    method: "POST",
  });

  window.localStorage.removeItem(USER_KEY);

  notify();
}

export function getSessionUser() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(window.localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

/** Merge-update the signed-in user's profile without ending the session. */
export function updateSessionUser(partial) {
  if (typeof window === 'undefined') return null;
  const current = getSessionUser() || {};
  const merged = defaultProfile({ ...current, ...partial });
  window.localStorage.setItem(USER_KEY, JSON.stringify(merged));
  notify();
  return merged;
}

export { AUTH_EVENT, AUTH_KEY };
