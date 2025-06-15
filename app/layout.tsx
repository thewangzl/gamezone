// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RelaxGameZone - Free Online Games Platform',
  description: 'RelaxGameZone is a platform offering free online games, including action, adventure, puzzle, and many more game types.',
  metadataBase: new URL('https://relaxgamezone.com'),
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: ['/images/logo.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}