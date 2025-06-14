// app/game/[slug]/page.tsx
import { Metadata } from 'next';
import { getGameDetail, getGamesBasicByCategory } from '@/lib/data';
import type { GameBasic, GameDetail } from '@/types';
import GameCard from '@/components/GameCard';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const game = await getGameDetail(params.slug);
  
  if (!game) {
    return {
      title: '游戏未找到',
      description: '抱歉，未找到该游戏。',
    };
  }
  
  return {
    title: game.name,
    description: game.description,
    openGraph: {
      title: `${game.name} - 游戏聚合平台`,
      description: game.description,
      images: [
        {
          url: game.img,
          width: 1200,
          height: 630,
          alt: game.name,
        },
      ],
    },
  };
}

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getGameDetail(params.slug);
  const similarGames = await getGamesBasicByCategory(game?.category || '');

  if (!game) {
    return <div>游戏未找到</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧内容 */}
        <div className="lg:col-span-2">
          {/* 游戏iframe */}
          <div className="aspect-video mb-8 bg-gray-100 rounded-lg overflow-hidden">
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ 
                __html: game.embed_url.replace(
                  '<iframe',
                  '<iframe style="width: 100%; height: 100%; border: none;"'
                )
              }}
            />
          </div>

          {/* 游戏信息 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
            
            {/* 游戏元信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">游戏信息</h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-gray-600">开发者</dt>
                    <dd className="font-medium">{game.developer}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">发布日期</dt>
                    <dd className="font-medium">{game.released}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">最后更新</dt>
                    <dd className="font-medium">{game.last_updated}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">技术</dt>
                    <dd className="font-medium">{game.technology.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">评分</dt>
                    <dd className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 font-medium">{game.rating}</span>
                      <span className="text-gray-500 ml-1">({game.votes} 票)</span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">游戏说明</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">{game.description}</p>
                  <h3 className="text-lg font-semibold mb-2">如何玩</h3>
                  <p className="text-gray-700 mb-4">{game.how_to_play}</p>
                  <h3 className="text-lg font-semibold mb-2">操作说明</h3>
                  <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
                    {game.controls}
                  </pre>
                </div>
              </div>
            </div>

            {/* FAQ部分 */}
            <div>
              <h2 className="text-xl font-semibold mb-4">常见问题</h2>
              <div className="space-y-4">
                {game.faq.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="space-y-8">
          {/* Google Ad */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="aspect-[4/3] bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Google Ad</p>
            </div>
          </div>

          {/* 相似游戏推荐 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">相似游戏</h2>
            <div className="space-y-4">
              {similarGames
                .filter(g => g.slug !== game.slug)
                .slice(0, 3)
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