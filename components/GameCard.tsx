// components/GameCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { GameBasic } from '@/types';

interface GameCardProps {
  game: GameBasic;
}

export default function GameCard({ game }: GameCardProps) {
    // 构建完整的图片URL

  return (
    <Link href={`/game/${game.slug}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* 游戏图片 */}
        <div className="relative aspect-[4/3]">
          <Image
            src={game.thumb}
            alt={game.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* 游戏信息 */}
        <div className="p-1.5">
          <h3 className="text-xs font-medium text-gray-800 mb-0.5 line-clamp-1">
            {game.title}
          </h3>
          <p className="text-[10px] text-gray-600 hidden">
            {game.category}
          </p>
        </div>
      </div>
    </Link>
  );
}