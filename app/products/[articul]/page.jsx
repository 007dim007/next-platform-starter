// app/products/[articul]/page.jsx
import Image from 'next/image';
import { Card } from '../../../components/card';
import { getProducts } from '../../../utils/api';

// Настройка ISR
export const revalidate = 60;

// Генерация статических путей
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    articul: product.articul,
  }));
}

// Настройка метатегов для SEO
export async function generateMetadata({ params }) {
  const products = await getProducts();
  const product = products.find((p) => p.articul === params.articul);

  if (!product) {
    return {
      title: 'Товар не найден | Магазин фрез для ЧПУ',
      description: 'Товар не найден в каталоге.',
    };
  }

  return {
    title: `${product.title || product.name} | Магазин фрез для ЧПУ`,
    description: product.description || `Купить ${product.title || product.name} (арт. ${product.articul}) за ${product.price} руб. в России.`,
    keywords: `фреза, ЧПУ, ${product.title || product.name}, ${product.articul}, Россия`,
  };
}

export default async function ProductPage({ params }) {
  const products = await getProducts();
  const product = products.find((p) => p.articul === params.articul);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-900">{product.title || product.name}</h1>
      <div className="bg-gray-100/50 p-6 rounded-lg">
        <Card
          title={product.title || product.name}
          className="shadow-md bg-white"
        >
          {product.image?.url && (
            <div className="relative w-full h-64 mb-4">
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
      </div>
    </div>
  );
}