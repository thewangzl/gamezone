// lib/seo.ts
import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | 游戏聚合平台',
  defaultTitle: '游戏聚合平台 - 免费在线游戏',
  description: '发现并玩最好的免费在线游戏。我们提供各种类别的游戏，包括动作、益智、策略等。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com/',
    siteName: '游戏聚合平台',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '游戏聚合平台',
      },
    ],
  },
  twitter: {
    handle: '@yourhandle',
    site: '@yoursite',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: '在线游戏,免费游戏,网页游戏,动作游戏,益智游戏,策略游戏',
    },
  ],
};