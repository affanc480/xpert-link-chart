import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const metadata = {
  title: 'User Panel · Xpert Link',
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
