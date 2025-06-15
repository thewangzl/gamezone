// components/CategoryList.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="group"
        >
          <div className="relative aspect-video rounded-lg overflow-hidden">
            {/* 分类图片 */}
            <Image
              src={category.img}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* 分类名称遮罩 */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">
                {category.name}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}