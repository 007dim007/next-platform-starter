// app/categories/page.jsx
import { Card } from '../../components/card';
import { getCategories } from '../../utils/api';

// Настройка ISR
export const revalidate = 60;

// Настройка метатегов для SEO
export const metadata = {
  title: 'Категории фрез для ЧПУ - Магазин',
  description: 'Выберите категорию фрез для ЧПУ. Широкий ассортимент инструментов для станков с доставкой по России.',
  keywords: 'фрезы, ЧПУ, категории, Россия',
};

export default async function CategoriesPage() {
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
    <div className="container mx-auto px-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-900">Категории</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-100/50 p-6 rounded-lg">
        {categories.map((category) => (
          <Card
            key={category.id}
            title={category.name}
            className="shadow-md hover:shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 bg-white"
          >
            {category.description && <p className="text-neutral-600">{category.description}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}