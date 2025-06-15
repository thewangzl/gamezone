// types/index.ts
export interface Category {
    slug: string;
    name: string;
    fullName: string;
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
    description: string | null;
    developer: string | null;
    released: string | null;
    last_updated: string | null;
    technology: string | null;
    platform: string | null;
    rating: string | number;
    votes: string |number;
    how_to_play: string | null;
    controls: string | null;
    faq: string | null;
  }
  
  export interface GamesDetail {
    [key: string]: GameDetail;
  }