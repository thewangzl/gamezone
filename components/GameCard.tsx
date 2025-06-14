// components/GameCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { GameBasic } from '@/types';

interface GameCardProps {
  game: GameBasic;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* 游戏图片 */}
        <div className="relative aspect-video">
          
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