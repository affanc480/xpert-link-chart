'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/navigation/Navigation.jsx';
import { Footer } from '@/components/footer/Footer.jsx';

const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/verify-otp', '/reset-password'];

export function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  if (isAuthRoute || isDashboardRoute) {
    return <main className="w-full overflow-x-hidden">{children}</main>;
  }

  return (
    <>
      <Navigation />
      <main className="w-full overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
}
