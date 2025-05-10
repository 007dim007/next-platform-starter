// app/products/[article]/page.jsx
import { getProducts } from '../../../utils/api';

export async function getStaticPaths() {
  const products = await getProducts();
  const paths = products.map((product) => ({
    params: { article: product.attributes.article }, // Используем поле article
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const products = await getProducts();
  const product = products.find((p) => p.attributes.article === params.article);
  return {
    props: { product },
    revalidate: 60, // Перегенерация каждые 60 секунд
  };
}

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.attributes.name}</h1>
      <p>Артикул: {product.attributes.article}</p>
      <p>Цена: {product.attributes.price} руб.</p>
      <p>{product.attributes.description}</p>
    </div>
  );
}