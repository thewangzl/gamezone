// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GameZone - 免费在线游戏平台',
  description: 'GameZone是一个提供免费在线游戏的平台，包含动作、冒险、益智等多种类型的游戏。',
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
    <html lang="zh">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}