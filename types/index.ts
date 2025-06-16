// types/index.ts
export interface Category {
    slug: string;
    name: string;
    fullname: string;
}

export interface GameBasic {
    slug: string;
    title: string;
    thumb: string;
    category: string;
    category_slug: string;
}

export interface GameDetail {
    title: string;
    description: string;
    instructions: string;
    url: string;
    category: string;
    tags: string[];
    thumb: string;
    width: number;
    height: number;
    category_slug: string;
}

export interface GamesDetail {
    [key: string]: GameDetail;
}