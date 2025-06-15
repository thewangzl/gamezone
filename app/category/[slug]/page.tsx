import { Metadata } from 'next';
import { getCategoryBySlug, getGamesBasicByCategory } from '@/lib/data';
import GameCard from '@/components/GameCard';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  return {
    title: category.name,
    description: `玩最好的${category.name}。我们提供各种${category.name}，包括最新和最受欢迎的游戏。`,
    openGraph: {
      title: `${category.name} - 游戏聚合平台`,
      description: `玩最好的${category.name}。我们提供各种${category.name}，包括最新和最受欢迎的游戏。`,
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);
  const games = await getGamesBasicByCategory(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </div>
  );
}