import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SiteChrome } from '@/components/layout/SiteChrome.jsx';
import { AuthProvider } from '@/lib/auth-context.jsx';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://xpertlink.com'), // Add this line
  title: 'Xpert Link - Enterprise Digital Transformation Solutions',
  description: 'Transform your business with cutting-edge AI-powered solutions...',
  keywords: 'digital transformation, AI solutions, enterprise technology, business innovation',
  authors: [{ name: 'Xpert Link' }],
  openGraph: {
    title: 'Xpert Link - Enterprise Digital Transformation',
    description: 'Transform your business with cutting-edge AI-powered solutions.',
    url: 'https://xpertlink.com',
    siteName: 'Xpert Link',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white antialiased overflow-x-hidden">
        <AuthProvider>
          <SiteChrome>{children}</SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}