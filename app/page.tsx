// app/page.tsx
import CategoryList from '@/components/CategoryList';
import GameCard from '@/components/GameCard';
import BackToTop from '@/components/BackToTop';
import categories from '@/data/categories.json';
import { getGamesBasicByCategory } from '@/lib/data';

// Featured categories
const featuredCategories = [
  'action',      // Action Games
  'puzzles',      // Puzzle Games
  'racing',     // Driving Games
  'adventure',      // Casual Games
];

export default async function Home() {
  // Get top 6 games for each category
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
      {/* Featured Games */}
      {featuredGames.map(({ category, games }) => (
        <section key={category} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              {categories.find(c => c.slug === category)?.fullname || category}
              <a
                href={`/category/${category}`}
                className="text-blue-500 hover:text-blue-600 text-lg font-normal ml-2"
              >
                View More →
              </a>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>
      ))}

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}