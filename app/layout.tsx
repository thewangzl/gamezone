// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: {
    template: '%s | Relex Game Zone',
    default: 'Relex Game Zone - Play Free Online Games',
  },
  description: 'Play the best free online games at Relex Game Zone. We offer a wide selection of games including action, adventure, puzzle, and more. No download required, play instantly in your browser!',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header categories={categories} />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}