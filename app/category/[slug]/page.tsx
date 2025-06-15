import { Metadata } from 'next';
import { getCategoryBySlug, getGamesBasicByCategory } from '@/lib/data';
import GameCard from '@/components/GameCard';
import Pagination from '@/components/Pagination';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return {
      title: '分类未找到',
      description: '请求的分类不存在。',
    };
  }
  
  return {
    title: category.name,
    description: `玩最好的${category.name}。我们提供各种${category.name}，包括最新和最受欢迎的游戏。`,
    openGraph: {
      title: `${category.name} - 游戏聚合平台`,
      description: `玩最好的${category.name}。我们提供各种${category.name}，包括最新和最受欢迎的游戏。`,
    },
  };
}

export default async function CategoryPage({ 
  params,
  searchParams,
}: { 
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return <div>分类未找到</div>;
  }

  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 30;
  const games = await getGamesBasicByCategory(params.slug);
  const totalPages = Math.ceil(games.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentGames = games.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{category.name} Games</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {currentGames.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
      
      {/* 分页组件 */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/category/${params.slug}`}
          />
        </div>
      )}
    </div>
  );
}