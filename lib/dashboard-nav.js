import {
  Settings2,
  UserPlus,
  Boxes,
  FileBarChart2,
  LayoutDashboard,
  User,
  Settings,
  Layers,
  ListTree,
} from 'lucide-react';

export const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Account Entry', href: '/dashboard/account-entry', icon: UserPlus },
  { name: 'Chart of Account Main', href: '/dashboard/chart-of-account-main', icon: Layers },
  { name: 'Chart of Account General', href: '/dashboard/chart-of-account-general', icon: ListTree },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Boxes },
  { name: 'Reports', href: '/dashboard/reports', icon: FileBarChart2 },
  { name: 'Setup', href: '/dashboard/setup', icon: Settings2 },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function getPageTitle(pathname) {
  const match = NAV_ITEMS.find((item) => item.href === pathname);
  if (match) return match.name;
  if (pathname?.startsWith('/dashboard/')) {
    const slug = pathname.split('/').filter(Boolean).pop();
    return slug
      ?.split('-')
      .map((w) => w[0]?.toUpperCase() + w.slice(1))
      .join(' ');
  }
  return 'Dashboard';
}
