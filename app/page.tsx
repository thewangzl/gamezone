// app/page.tsx
import CategoryList from '@/components/CategoryList';
import GameCard from '@/components/GameCard';
import categories from '@/data/categories.json';
import { getGamesBasicByCategory } from '@/lib/data';

// 精选分类
const featuredCategories = [
  'action',      // 动作游戏
  'puzzle',      // 益智游戏
  'driving',     // 驾驶游戏
  'casual',      // 休闲游戏
];

export default async function Home() {
  // 获取每个分类的前6个游戏
  const featuredGames = await Promise.all(
    featuredCategories.map(async (category) => {
      const games = await getGamesBasicByCategory(category);
      return {
        category,
        games: games.slice(0, 6),
      };
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">

      {/* 精选游戏 */}
      {featuredGames.map(({ category, games }) => (
        <section key={category} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              {categories.categories.find(c => c.slug === category)?.name || category}
            </h2>
            <a
              href={`/category/${category}`}
              className="text-blue-500 hover:text-blue-600"
            >
              查看更多 →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}