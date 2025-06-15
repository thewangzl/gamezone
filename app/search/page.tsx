'use client';

import { useState, useEffect, Suspense } from 'react';
import Fuse from 'fuse.js';
import { useSearchParams } from 'next/navigation';
import GameCard from '@/components/GameCard';
import { GameBasic } from '@/types';
import { getAllGamesBasic } from '@/lib/data';

function SearchContent() {
  const [games, setGames] = useState<GameBasic[]>([]);
  const [searchResults, setSearchResults] = useState<GameBasic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const loadGames = async () => {
      const allGames = await getAllGamesBasic();
      setGames(allGames);
    };
    loadGames();
  }, []);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      const fuse = new Fuse(games, {
        keys: ['name'],
        threshold: 0.3,
        includeScore: true,
      });

      const results = fuse.search(query);
      setSearchResults(results.map(result => result.item));
    } else {
      setSearchResults([]);
    }
  }, [query, games]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 搜索结果 */}
      {searchQuery && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Search results for {query} ({searchResults.length})
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {searchResults.map((game) => (
                <GameCard key={game.slug} game={game} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No Games Found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
