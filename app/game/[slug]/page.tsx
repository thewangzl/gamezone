// app/game/[slug]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { getGameDetail, getGamesBasicByCategory, getCategoryBySlug } from '@/lib/data';
import type { GameBasic, GameDetail } from '@/types';
import GameCard from '@/components/GameCard';
import { notFound } from 'next/navigation';

// Generate metadata for the page
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const game = getGameDetail(params.slug);
  
  if (!game) {
    return {
      title: 'Game Not Found | Relex Game Zone',
      description: 'The requested game could not be found.',
    };
  }

  return {
    title: `${game.title} - Play Free Online Game | Relex Game Zone`,
    description: game.description?.slice(0, 160) || `Play ${game.title} online for free.`,
    openGraph: {
      title: `${game.title} - Play Free Online Game | Relex Game Zone`,
      description: game.description?.slice(0, 160) || `Play ${game.title} online for free.`,
      type: 'website',
    },
  };
}

function wrapInIframe(url: string): string {
  if (url.includes('<iframe')) {
    return url;
  }
  return `<iframe src="${url}" frameborder="0" scrolling="no" allowfullscreen style="width: 100%; height: 100%;"></iframe>`;
}

export default async function GamePage({ params }: any) {
  const game = await getGameDetail(params.slug);
  const similarGames = await getGamesBasicByCategory(game?.category_slug || '');

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left content */}
        <div className="lg:col-span-2">
          {/* Game iframe */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0 w-full h-full">
              <div 
                className="absolute inset-0 w-full h-full"
                dangerouslySetInnerHTML={{ __html: wrapInIframe(game.url) }}
              />
            </div>
          </div>

          {/* Game information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <span>/</span>
              <Link href={`/category/${game.category_slug}`} className="hover:text-gray-700">
                {game.category}
              </Link>
              <span>/</span>
              <span className="text-gray-900">{game.title}</span>
            </div>
            
            {/* Basic game information */}
            <div className="space-y-4 mb-8">
              {game.tags && game.tags.length > 0 && (
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Game details */}
            <div className="space-y-6">
              {/* Game description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <div className="prose max-w-none text-gray-700">
                  {game.description}
                </div>
              </div>

              {/* Game instructions */}
              <div>
                <h2 className="text-xl font-semibold mb-3">How to Play</h2>
                <div className="prose max-w-none text-gray-700">
                  {game.instructions}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="space-y-8">
          {/* Similar games */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Similar Games</h2>
            <div className="grid grid-cols-2 gap-3">
              {similarGames
                .filter(g => g.slug !== game.slug)
                .slice(0, 10)
                .map((similarGame) => (
                  <GameCard key={similarGame.slug} game={similarGame} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}