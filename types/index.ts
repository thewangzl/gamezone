// types/index.ts
export interface Category {
    slug: string;
    name: string;
    img: string;
  }
  
  export interface GameBasic {
    slug: string;
    name: string;
    img: string;
    category: string;
  }
  
  export interface GameDetail {
    embed_url: string;
    name: string;
    category: string;
    description: string;
    developer: string;
    released: string;
    last_updated: string;
    technology: string;
    platform: string;
    rating: number;
    votes: number;
    how_to_play: string;
    controls: string;
    faq: string;
  }
  
  export interface GamesDetail {
    [key: string]: GameDetail;
  }