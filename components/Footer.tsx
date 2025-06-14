// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-gray-300">
              游戏聚合平台致力于为玩家提供最好的免费在线游戏体验。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-300 hover:text-white">
                  搜索游戏
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">游戏分类</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/action-games" className="text-gray-300 hover:text-white">
                  动作游戏
                </Link>
              </li>
              <li>
                <Link href="/category/puzzle-games" className="text-gray-300 hover:text-white">
                  益智游戏
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">邮箱：contact@example.com</li>
              <li className="text-gray-300">QQ：123456789</li>
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