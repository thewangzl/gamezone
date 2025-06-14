// app/page.tsx
import CategoryList from '@/components/CategoryList';
import GameCard from '@/components/GameCard';

// 临时测试数据
const testCategories = [
  {
    slug: 'action-games',
    name: '动作游戏',
    img: 'https://via.placeholder.com/400x300?text=Action+Games'
  },
  {
    slug: 'puzzle-games',
    name: '益智游戏',
    img: 'https://via.placeholder.com/400x300?text=Puzzle+Games'
  }
];

const testGames = [
  {
    slug: 'game-1',
    name: '测试游戏1',
    img: 'https://via.placeholder.com/400x300?text=Game+1',
    category: '动作游戏'
  },
  {
    slug: 'game-2',
    name: '测试游戏2',
    img: 'https://via.placeholder.com/400x300?text=Game+2',
    category: '益智游戏'
  }
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">热门游戏分类</h1>
      <CategoryList categories={testCategories} />
      
      <h2 className="text-3xl font-bold mt-12 mb-6">精选游戏</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {testGames.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </div>
  );
}