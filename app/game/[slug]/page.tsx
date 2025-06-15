// app/game/[slug]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { getGameDetail, getGamesBasicByCategory, getCategoryBySlug } from '@/lib/data';
import type { GameBasic, GameDetail } from '@/types';
import GameCard from '@/components/GameCard';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const game = await getGameDetail(params.slug);
  const category = game ? await getCategoryBySlug(game.category) : null;

  if (!game) {
    return {
      title: 'Game Not Found - Relex Game Zone',
    };
  }

  return {
    title: `${game.name} - Play Free Online Game | Relex Game Zone`,
    description: game.description?.slice(0, 160) || `Play ${game.name} online for free. ${game.developer ? `Developed by ${game.developer}.` : ''} ${game.platform ? `Available on ${game.platform}.` : ''}`,
    openGraph: {
      title: `${game.name} - Play Free Online Game | Relex Game Zone`,
      description: game.description?.slice(0, 160) || `Play ${game.name} online for free. ${game.developer ? `Developed by ${game.developer}.` : ''} ${game.platform ? `Available on ${game.platform}.` : ''}`,
      type: 'website',
    },
  };
}

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getGameDetail(params.slug);
  const similarGames = await getGamesBasicByCategory(game?.category || '');
  const category = game ? await getCategoryBySlug(game.category) : null;

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left content */}
        <div className="lg:col-span-2">
          {/* Game iframe */}
          <div 
            className="aspect-video mb-8 bg-gray-100 rounded-lg overflow-hidden relative"
          >
            <div 
              className="absolute inset-0 w-full h-full"
              dangerouslySetInnerHTML={{ __html: game.embed_url }}
            />
          </div>

          {/* Game information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex mb-6 text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Games
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link 
                    href={`/category/${game.category}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {category?.name || game.category}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">
                  {game.name}
                </li>
              </ol>
            </nav>
            
            {/* Basic game information */}
            <div className="space-y-4 mb-8">
              {game.developer && (
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">Developer:</span>
                  <span className="font-medium">{game.developer}</span>
                </div>
              )}
              {game.released && (
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">Released:</span>
                  <span className="font-medium">{game.released}</span>
                </div>
              )}
              {game.last_updated && (
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">Updated:</span>
                  <span className="font-medium">{game.last_updated}</span>
                </div>
              )}
              {game.technology && (
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">Technology:</span>
                  <span className="font-medium">{game.technology}</span>
                </div>
              )}
              {game.platform && (
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">Platform:</span>
                  <span className="font-medium">{game.platform}</span>
                </div>
              )}
              <div className="flex gap-2">
                <span className="text-gray-600 w-24">Rating:</span>
                <span className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 font-medium">{game.rating}</span>
                  <span className="text-gray-500 ml-1">({game.votes} votes)</span>
                </span>
              </div>
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

              {/* How to play - only shown if content exists */}
              {game.how_to_play && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">How to Play</h2>
                  <div 
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: game.how_to_play }}
                  />
                </div>
              )}

              {/* Controls - only shown if content exists */}
              {game.controls && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Controls</h2>
                  <div 
                    className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded"
                    dangerouslySetInnerHTML={{ __html: game.controls }}
                  />
                </div>
              )}

              {/* FAQ section - only shown if content exists */}
              {game.faq && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">FAQ</h2>
                  <div 
                    className="prose max-w-none text-gray-700 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 "
                    dangerouslySetInnerHTML={{ __html: game.faq }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="space-y-8">
          {/* Google Ad */}
          <div className="bg-white rounded-lg shadow-md p-4 hidden">
            <div className="aspect-[4/3] bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Google Ad</p>
            </div>
          </div>

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