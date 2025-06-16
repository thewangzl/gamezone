// lib/data.ts
import { Category, GameBasic, GameDetail, GamesDetail } from '@/types';
import categories from '@/data/categories.json';
import gamesBasic from '@/data/games-basic.json';
import gamesDetail from '@/data/games-detail.json';

export function getCategories(): Category[] {
  return categories as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categories as Category[]).find(cat => cat.slug === slug);
}

export function getGamesBasic(): GameBasic[] {
  return gamesBasic as GameBasic[];
}

export function getGamesBasicByCategory(categorySlug: string): GameBasic[] {
  return (gamesBasic as GameBasic[]).filter(game => game.category_slug === categorySlug);
}

export function getGameDetail(slug: string): (GameBasic & GameDetail) | null {
  const basic = (gamesBasic as GameBasic[]).find(game => game.slug === slug);
  const detail = (gamesDetail as GamesDetail)[slug];
  
  if (!basic || !detail) return null;
  
  return {
    ...basic,
    ...detail,
    category: basic.category, // Ensure category is always from basic data
    category_slug: basic.category_slug // Ensure category_slug is always from basic data
  };
}

export async function getAllGamesBasic(): Promise<GameBasic[]> {
  const gamesBasic = await import('@/data/games-basic.json');
  return gamesBasic.default as GameBasic[];
}