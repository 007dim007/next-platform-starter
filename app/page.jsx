// app/page.jsx
import Link from 'next/link';
import { getCategories } from '../utils/api';

export const metadata = {
  title: 'Магазин инструментов для ЧПУ',
  description: 'Купить фрезы, свёрла и оснастку для ЧПУ в России.',
  keywords: 'фрезы, свёрла, оснастка, ЧПУ, Россия',
};

export default async function HomePage() {
  let categories = [];
  let error = null;

  try {
    categories = await getCategories();
  } catch (e) {
    error = e.message;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div>Категории не найдены</div>;
  }

  return (
    <div className="container mx-auto px-4 min-h-screen py-6">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900">Добро пожаловать в магазин ЧПУ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="text-neutral-600">{category.description || 'Описание отсутствует'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}