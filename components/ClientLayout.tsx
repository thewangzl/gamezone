// components/ClientLayout.tsx
'use client';

import Header from './Header';
import Footer from './Footer';
import categories from '@/data/categories.json';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header categories={categories.categories} />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  );
}