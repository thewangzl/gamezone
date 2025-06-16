// components/CategoryList.tsx
import Link from 'next/link';
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
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {category.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}