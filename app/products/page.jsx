// app/products/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../../components/card';
import { getProducts } from '../../utils/api';

// Настройка ISR
export const revalidate = 60;

// Настройка метатегов для SEO
export const metadata = {
  title: 'Товары для ЧПУ - Магазин фрез',
  description: 'Купить фрезы, свёрла и оснастку для ЧПУ в России. Большой выбор инструментов с доставкой.',
  keywords: 'фрезы, свёрла, оснастка, ЧПУ, Россия',
};

export default async function ProductsPage({ searchParams }) {
  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (e) {
    error = e.message;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>Товары не найдены</div>;
  }

  // Фильтрация по категории из searchParams
  const categorySlug = searchParams.category;
  if (categorySlug) {
    products = products.filter((product) => product.category?.slug === categorySlug);
  }

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-900">
        {categorySlug ? `Товары в категории ${categorySlug}` : 'Все товары'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-100/50 p-6 rounded-lg">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.articul}`}
            className="block"
          >
            <Card
              title={product.title || product.name}
              className="shadow-md hover:shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 bg-white"
            >
              {product.image?.url && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={`${process.env.STRAPI_API_URL}${product.image.url}`}
                    alt={product.title || product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-sm"
                  />
                </div>
              )}
              <p className="text-neutral-600">Артикул: {product.articul}</p>
              <p className="text-neutral-600">Цена: {product.price} руб.</p>
              {product.category && (
                <p className="text-neutral-600">Категория: {product.category.name}</p>
              )}
              {product.description && <p className="text-neutral-600">{product.description}</p>}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}