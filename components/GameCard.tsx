// components/GameCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { GameBasic } from '@/types';

interface GameCardProps {
  game: GameBasic;
}

export default function GameCard({ game }: GameCardProps) {
    // 构建完整的图片URL
    const fullImageUrl = `https://imgs.crazygames.com/${game.img}?metadata=none&quality=40&width=273&fit=crop&dpr=2`;

  return (
    <Link href={`/game/${game.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* 游戏图片 */}
        <div className="relative aspect-video">
        <Image
            src={fullImageUrl}
            alt={game.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* 游戏信息 */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {game.name}
          </h3>
          <p className="text-sm text-gray-600">
            {game.category}
          </p>
        </div>
      </div>
    </Link>
  );
}