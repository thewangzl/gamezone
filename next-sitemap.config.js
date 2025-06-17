/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');

// 读取分类数据
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/categories.json'), 'utf8'));
// 读取游戏数据
const games = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/games-basic.json'), 'utf8'));

// 生成分类页面的URL
const categoryUrls = categories.map(category => ({
  loc: `https://relaxgamezone.com/category/${category.slug}`,
  lastmod: new Date().toISOString(),
  changefreq: 'daily',
  priority: 0.8,
}));

// 生成游戏详情页面的URL
const gameUrls = games.map(game => ({
  loc: `https://relaxgamezone.com/game/${game.slug}`,
  lastmod: new Date().toISOString(),
  changefreq: 'weekly',
  priority: 0.6,
}));

module.exports = {
  siteUrl: 'https://relaxgamezone.com', // 替换为你的网站域名
  generateRobotsTxt: true, // 生成 robots.txt
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*'], // 排除不需要被索引的页面
  additionalPaths: async (config) => {
    return [...categoryUrls, ...gameUrls];
  },
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/*', '/api/*'],
      },
    ],
  },
} 