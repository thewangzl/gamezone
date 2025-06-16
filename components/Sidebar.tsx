 // components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '@/types';

interface SidebarProps {
  categories: Category[];
}

export default function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <nav className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              pathname === `/category/${category.slug}`
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}