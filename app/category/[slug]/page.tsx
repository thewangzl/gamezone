import { Metadata } from 'next';
import { getCategoryBySlug, getGamesBasicByCategory } from '@/lib/data';
import GameCard from '@/components/GameCard';
import Pagination from '@/components/Pagination';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return {
      title: 'Category Not Found - Relex Game Zone',
      description: 'The requested category does not exist.',
    };
  }
  
  return {
    title: `${category.name} Games - Play Free Online ${category.name} | Relex Game Zone`,
    description: `Play the best ${category.name} games online for free. We offer a wide selection of ${category.name} games, including the latest and most popular titles.`,
    openGraph: {
      title: `${category.name} Games - Play Free Online ${category.name} | Relex Game Zone`,
      description: `Play the best ${category.name} games online for free. We offer a wide selection of ${category.name} games, including the latest and most popular titles.`,
      type: 'website',
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
    return <div>Category not found</div>;
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
      
      {/* Pagination */}
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