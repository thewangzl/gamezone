// components/Footer.tsx
import Link from 'next/link';
import { getCategories } from '@/lib/data';

export default function Footer() {
  const categories = getCategories();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categories */}
          <div>
            <ul className="grid grid-cols-3 gap-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="text-gray-300 hover:text-white text-sm">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-gray-300 text-sm">
            <p>Email: thewangzl@gmail.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} RelaxGameZone</p>
        </div>
      </div>
    </footer>
  );
}