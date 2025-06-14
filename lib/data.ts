// lib/data.ts
import { Category, GameBasic, GameDetail, GamesDetail } from '@/types';
import categories from '@/data/categories.json';
import gamesBasic from '@/data/games-basic.json';
import gamesDetail from '@/data/games-detail.json';

export function getCategories(): Category[] {
  return categories.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.categories.find(cat => cat.slug === slug);
}

export function getGamesBasic(): GameBasic[] {
  return gamesBasic.games;
}

export function getGamesBasicByCategory(categorySlug: string): GameBasic[] {
  return gamesBasic.games.filter(game => game.category === categorySlug);
}

export function getGameDetail(slug: string): (GameBasic & GameDetail) | null {
  const basic = gamesBasic.games.find(game => game.slug === slug);
  const detail = (gamesDetail as GamesDetail)[slug];
  
  if (!basic || !detail) return null;
  
  return {
    ...basic,
    ...detail
  };
}