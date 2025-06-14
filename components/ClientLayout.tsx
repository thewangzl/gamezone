// components/ClientLayout.tsx
'use client';

import Header from './Header';
import Footer from './Footer';

// 临时测试数据
const testCategories = [
  {
    slug: 'action-games',
    name: '动作游戏',
    img: '/images/categories/action.jpg'
  },
  {
    slug: 'puzzle-games',
    name: '益智游戏',
    img: '/images/categories/puzzle.jpg'
  }
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header categories={testCategories} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}