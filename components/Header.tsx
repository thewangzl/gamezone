// components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Category } from '@/types';
import Image from 'next/image';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            游戏聚合平台
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`flex items-center text-gray-600 hover:text-gray-900 ${
                  pathname === `/category/${category.slug}` ? 'text-blue-600' : ''
                }`}
              >
                <Image
                  src={category.img}
                  alt={category.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索游戏..."
                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                搜索
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className={`flex items-center text-gray-600 hover:text-gray-900 ${
                    pathname === `/category/${category.slug}` ? 'text-blue-600' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    src={category.img}
                    alt={category.name}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  {category.name}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center mt-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索游戏..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  搜索
                </button>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}