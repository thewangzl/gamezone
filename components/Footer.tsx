// components/Footer.tsx
import Link from 'next/link';
import { getCategories } from '@/lib/data';

export default function Footer() {
  const categories = getCategories();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-gray-300">
              游戏聚合平台致力于为玩家提供最好的免费在线游戏体验。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">游戏分类</h3>
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
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">邮箱：thewangzl@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} 游戏聚合平台. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}